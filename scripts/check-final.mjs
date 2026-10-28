import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import ts from 'typescript'

const html = fs.readFileSync('dist/index.html', 'utf8')
const catalog = fs.readFileSync('src/data/services.ts', 'utf8')
const labels = [...catalog.matchAll(/id: '[^']+', label: '([^']+)'/g)].map((match) => match[1])
assert.equal(labels.length, 4, 'Original quiz choices must remain unchanged')
const content = fs.readFileSync('src/data/content.ts', 'utf8')
const products = content.slice(content.indexOf('export const PRODUCTS:'), content.indexOf('export const CALC'))
const productNames = [...products.matchAll(/title: '([^']+)'/g)].map((match) => match[1])
assert.deepEqual(productNames, ['Генеральная уборка', 'Уборка после ремонта', 'Поддерживающая уборка', 'Химчистка мебели', 'Чистка кондиционеров', 'Уборка после ЧП (смерть, потоп)', 'Уборка коммерческих объектов', 'Мойка окон'])
for (const label of productNames) assert.ok(html.includes(label), `Missing product: ${label}`)
assert.equal((html.match(/<article\b[^>]*class="[^"]*\bproduct-card\b[^"]*"/g) ?? []).length, 8)
assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1)
assert.ok(html.includes('tel:+73812294483') && html.includes('tel:+79230473928'))
assert.ok(!html.includes('00-00-00'))
assert.ok(html.includes('Спасибо за аккуратную работу'))
assert.ok(html.includes('★ 5.0') && html.includes('★ 4.9'))
assert.ok(html.includes('alexey-real.webp'))
for (const price of ['5 000 ₽', '250 ₽/м²', '80 ₽/м²', '300 ₽', '16 500 ₽', '12 400 ₽', '7 800 ₽']) {
  assert.ok(html.replaceAll('\u00a0', ' ').includes(price), `Existing price lost: ${price}`)
}
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]))
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), `Broken anchor: ${match[1]}`)
for (const match of html.matchAll(/(?:src|href)="(\/new-site\/assets\/img\/[^"?#]+)"/g)) {
  assert.ok(fs.existsSync(path.join('public', match[1].replace('/new-site/', ''))), `Missing image: ${match[1]}`)
}
for (const source of ['Calculator', 'FinalCta']) {
  const code = fs.readFileSync(`src/sections/${source}.tsx`, 'utf8')
  assert.ok(code.includes('<Consent') && code.includes('if (!consent'))
  assert.ok(!code.includes('<AdditionalServices') && code.includes('consent: true'))
}

// Exercise the real client receiver logic with an isolated mock; no external requests.
const source = fs.readFileSync('src/lib/lead.ts', 'utf8').replace("import { LEAD_ENDPOINT } from '../config'", "const LEAD_ENDPOINT = 'https://test.invalid/lead'")
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
const { submitLead, isContactValid } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)
const originalFetch = globalThis.fetch
const originalWindow = globalThis.window
globalThis.window = { location: { href: 'https://test.invalid/new-site/' } }
const payload = { source: 'calculator', service: labels[0], area: '40–60 м²', when: 'На этой неделе', contact: '+7 (923) 000-00-00', consent: true }
try {
  let calls = 0
  globalThis.fetch = async (_url, options) => {
    calls++
    const sent = JSON.parse(options.body)
    assert.deepEqual(sent.additionalServices, payload.additionalServices)
    assert.equal(sent.consent, true)
    assert.equal(sent.service, payload.service)
    assert.equal(sent.area, payload.area)
    assert.ok(sent.sentAt && sent.page)
    return { ok: true, json: async () => ({ ok: true }) }
  }
  assert.equal(await submitLead({ ...payload, consent: false }), 'error')
  assert.equal(calls, 0)
  assert.equal(await submitLead(payload), 'sent')
  for (const response of [
    { ok: false, json: async () => ({ ok: true }) },
    { ok: true, json: async () => ({ ok: false }) },
    { ok: true, json: async () => ({}) },
    { ok: true, json: async () => { throw new Error('Not JSON') } },
  ]) {
    globalThis.fetch = async () => response
    assert.equal(await submitLead(payload), 'error')
  }
  globalThis.fetch = async () => { throw new Error('Offline') }
  assert.equal(await submitLead(payload), 'error')
  assert.ok(isContactValid('+7 (923) 047-39-28'))
  assert.ok(!isContactValid('+7 (923) 047'))
  for (const contact of ['', 'text9230473928', '1234567890', '+44 923 047 39 28', '9999999999', '923+0473928']) {
    assert.ok(!isContactValid(contact), `Invalid phone accepted: ${contact}`)
    assert.equal(await submitLead({ ...payload, contact }), 'error')
  }
} finally {
  globalThis.fetch = originalFetch
  if (originalWindow === undefined) delete globalThis.window
  else globalThis.window = originalWindow
}
console.log('PASS: 8 product cards, 4 original quiz choices, preserved prices/reviews, assets/anchors, consent, and client success/failure responses. No real leads sent.')
