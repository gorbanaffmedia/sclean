// Injects the server-rendered page into dist/index.html, then removes the temporary SSR bundle.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const ssrDir = path.join(root, 'dist-ssr')
const { render, renderPrivacy } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const file = path.join(root, 'dist', 'index.html')
const html = fs.readFileSync(file, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found')
fs.writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))

// A real directory index, independent of React routing and Bitrix rewrites.
// Reuse Vite's actual CSS/font/icon links; no main-app JS is loaded on this page.
const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map((match) => match[0]).join('\n')
const icon = html.match(/<link\b[^>]*rel="icon"[^>]*>/)?.[0] ?? ''
// Same Yandex Metrika counter as the main page (single source: index.html).
const metrika = html.match(/<!-- Yandex\.Metrika counter -->[\s\S]*?<!-- \/Yandex\.Metrika counter -->/)?.[0]
const metrikaNoscript = html.match(/<noscript>(?:(?!<\/noscript>)[\s\S])*mc\.yandex\.ru\/watch[\s\S]*?<\/noscript>/)?.[0]
if (!metrika || !metrikaNoscript) throw new Error('prerender: Yandex Metrika counter not found in index.html')
const privacyDir = path.join(root, 'dist', 'privacy')
fs.mkdirSync(privacyDir, { recursive: true })
fs.writeFileSync(path.join(privacyDir, 'index.html'), `<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Политика обработки персональных данных — С-КЛИН</title>
<meta name="description" content="Политика обработки персональных данных ООО «С-Клин»: сведения об операторе, обработка заявок и обращения по вопросам персональных данных." />
<link rel="canonical" href="https://go-sclean.ru/new-site/privacy/" />
${icon}
${styles}
${metrika}
</head>
<body>${renderPrivacy()}
${metrikaNoscript}
</body>
</html>`)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('prerender: dist/index.html')
console.log('prerender: dist/privacy/index.html')
