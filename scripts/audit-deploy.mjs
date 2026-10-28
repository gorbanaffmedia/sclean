import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import ts from 'typescript'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const read = (file) => fs.readFileSync(file, 'utf8')
const files = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
const html = read(path.join(dist, 'index.html'))
const publicFiles = files(path.join(root, 'public'))
for (const file of publicFiles) {
  const built = path.join(dist, path.relative(path.join(root, 'public'), file))
  assert.ok(fs.existsSync(built), `Missing public file: ${built}`)
  assert.ok(fs.readFileSync(file).equals(fs.readFileSync(built)), `Stale public file: ${built}`)
}
assert.ok(fs.existsSync(path.join(dist, 'assets/img/alexey-real.webp')))
const localURLs = new Set()
for (const match of html.matchAll(/(?:src|href|srcset|imagesrcset)="([^"]+)"/g)) {
  for (const value of match[1].split(',')) {
    const url = value.trim().split(/\s+/)[0]
    if (!url || /^(?:#|https?:|tel:|mailto:|data:)/.test(url)) continue
    assert.ok(url.startsWith('/new-site/'), `Incorrect base URL: ${url}`)
    assert.ok(fs.existsSync(path.join(dist, url.slice('/new-site/'.length))), `Missing built asset: ${url}`)
    localURLs.add(url)
  }
}
const jsFiles = files(dist).filter((file) => file.endsWith('.js'))
const js = jsFiles.map(read).join('\n')
assert.ok(js.includes('"/new-site/api/send.php"'), 'Production bundle has an incorrect API URL')
assert.ok(html.includes('type="module"') && html.includes('<div id="root"><'), 'Missing hydration or prerender')
for (const file of files(dist).filter((file) => /\.(?:html|js|css|php|svg|json|map)$/.test(file))) {
  assert.ok(!/(?:^|[^a-zA-Z0-9])[a-zA-Z]:[\\/]/m.test(read(file)), `Absolute Windows path: ${file}`)
  assert.ok(!read(file).includes('file://'), `Local file URL: ${file}`)
}
const php = process.env.SCLEAN_PHP ?? 'C:/php/php.exe'
const port = 18763
const origin = `http://127.0.0.1:${port}`
const server = spawn(php, ['-n', '-d', 'disable_functions=mail', '-S', `127.0.0.1:${port}`, path.join(root, 'scripts/fixtures/audit-router.php')], {
  cwd: root, env: { ...process.env, SCLEAN_AUDIT: '1', SCLEAN_AUDIT_DIST: dist }, windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'],
})
let error
let serverLog = ''
server.on('error', (value) => { error = value })
server.stderr.on('data', (data) => { serverLog += data.toString() })
const stopped = new Promise((resolve) => server.on('close', resolve))
let requests = 0
try {
  let ready = false
  for (let i = 0; i < 50; i++) {
    if (error) throw error
    if (server.exitCode !== null) throw new Error(`Local PHP exited: ${serverLog}`)
    try {
      const response = await fetch(`${origin}/new-site/`)
      if (response.ok) { ready = true; break }
    } catch { /* wait for the owned local server */ }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  assert.ok(ready, `Local PHP did not start: ${serverLog}`)
  for (const url of ['/', '/index.html', '/#calc', '/#privacy']) {
    const response = await fetch(`${origin}/new-site${url}`)
    assert.equal(response.status, 200)
    assert.equal(await response.text(), html)
  }
  for (const url of localURLs) assert.equal((await fetch(origin + url)).status, 200, url)
  if (fs.existsSync(path.join(dist, 'privacy/index.html'))) {
    const policy = read(path.join(dist, 'privacy/index.html'))
    for (const url of ['/new-site/privacy/', '/new-site/privacy/index.html']) {
      const response = await fetch(origin + url)
      assert.equal(response.status, 200)
      assert.equal(await response.text(), policy)
    }
  }
  for (const file of files(dist).filter((entry) => entry.endsWith('.css'))) {
    for (const match of read(file).matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      if (/^(?:data:|https?:|#)/.test(match[1])) continue
      const resolved = new URL(match[1], origin + '/new-site/' + path.relative(dist, file).replaceAll('\\', '/'))
      assert.ok(resolved.pathname.startsWith('/new-site/'), `Incorrect CSS URL: ${match[1]}`)
      assert.equal((await fetch(resolved)).status, 200)
    }
  }
  const api = `${origin}/new-site/api/send.php`
  const labels = [...read(path.join(root, 'src/data/services.ts')).matchAll(/id: '[^']+', label: '([^']+)'/g)].map((match) => match[1])
  const base = { source: 'calculator', service: labels[0], contact: '+7 (923) 047-39-28', consent: true, area: '40–60 м²', when: 'На этой неделе', additionalServices: ['Мойка окон', 'Химчистка мягкой мебели'], page: 'https://test.invalid/new-site/', sentAt: '2026-10-12T00:00:00Z' }
  const check = async (body, status, mail = '', method = 'POST') => {
    requests++
    const response = await fetch(api, { method, headers: { 'Content-Type': 'application/json', 'X-Audit-Mail': mail }, body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined })
    assert.equal(response.status, status)
    if (status === 204) { assert.equal(await response.text(), ''); return }
    assert.ok(response.headers.get('content-type')?.includes('application/json'))
    assert.deepEqual(await response.json(), { ok: status === 200 })
    assert.equal(response.headers.get('x-audit-mail-calls'), status >= 500 || status === 200 ? '1' : null)
  }
  await check(null, 405, '', 'GET')
  await check(null, 204, '', 'OPTIONS')
  for (const bad of ['', '{', 'null', '{}', 'x'.repeat(16385)]) await check(bad, 400)
  for (const contact of ['', '   ', 'abc9230473928', '1234567890', '+7 (923) 047', '9999999999', '+44 923 047 39 28', '923+0473928', 9230473928, ['9230473928']]) await check({ ...base, contact }, 400)
  for (const consent of [undefined, false, 'true', 1]) await check({ ...base, consent }, 400)
  for (const changes of [{ source: '' }, { service: '' }, { service: 'invalid' }, { additionalServices: 'windows' }, { additionalServices: ['Мойка окон', 'Мойка окон'] }, { additionalServices: [labels[0]] }, { additionalServices: ['invalid'] }, { additionalServices: ['Мойка окон', 'Химчистка мягкой мебели', 'Чистка кондиционеров', 'Мойка окон'] }]) await check({ ...base, ...changes }, 400)
  await check(base, 500, 'failure')
  await check(base, 500, 'throw')
  for (const service of labels) await check({ ...base, service, additionalServices: [] }, 200, 'success')
  const products = read(path.join(root, 'src/data/content.ts'))
  const productNames = [...products.slice(products.indexOf('export const PRODUCTS:'), products.indexOf('export const CALC')).matchAll(/title: '([^']+)'/g)].map((match) => match[1])
  for (const service of productNames) await check({ ...base, service, product: service, additionalServices: [] }, 200, 'success')
  await check({ source: 'calculator', service: 'не выбрано', contact: base.contact, consent: true }, 200, 'success')
  await check({ source: 'final-cta', service: 'не выбрано', contact: '83812294483', consent: true }, 200, 'success')
  await check({ ...base, contact: '9230473928' }, 200, 'success')
  // Exercise the actual client module against the actual built PHP receiver.
  const clientSource = read(path.join(root, 'src/lib/lead.ts')).replace("import { LEAD_ENDPOINT } from '../config'", "const LEAD_ENDPOINT = '/new-site/api/send.php'")
  const clientJS = ts.transpileModule(clientSource, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
  const { submitLead } = await import(`data:text/javascript;base64,${Buffer.from(clientJS).toString('base64')}`)
  const originalFetch = globalThis.fetch
  const originalWindow = globalThis.window
  let clientCalls = 0
  let mode = 'success'
  globalThis.window = { location: { href: `${origin}/new-site/#calc` } }
  globalThis.fetch = async (url, options) => {
    clientCalls++
    const response = await originalFetch(new URL(url, origin), { ...options, headers: { ...options.headers, 'X-Audit-Mail': mode } })
    const message = Buffer.from(response.headers.get('x-audit-message') ?? '', 'base64').toString('utf8')
    assert.ok(message.includes(base.contact) && message.includes(base.service))
    assert.ok(message.includes(base.additionalServices.join(', ')))
    assert.ok(message.includes(base.area) && message.includes(base.when))
    assert.ok(message.includes('Да — расчёт стоимости и связь по заявке'))
    return response
  }
  try {
    assert.equal(await submitLead({ ...base, consent: false }), 'error')
    assert.equal(await submitLead({ ...base, contact: 'bad' }), 'error')
    assert.equal(clientCalls, 0)
    assert.equal(await submitLead(base), 'sent')
    mode = 'failure'
    assert.equal(await submitLead(base), 'error')
    mode = 'throw'
    assert.equal(await submitLead(base), 'error')
    assert.equal(clientCalls, 3)
  } finally {
    globalThis.fetch = originalFetch
    if (originalWindow === undefined) delete globalThis.window
    else globalThis.window = originalWindow
  }
  console.log(`PASS: ${publicFiles.length} public files match dist; ${localURLs.size} asset URLs; Windows path scan; local refresh; ${requests + clientCalls} PHP requests including client-to-PHP integration with native mail DISABLED. API: /new-site/api/send.php`)
} finally {
  server.kill()
  await stopped
}
