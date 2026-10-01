// Injects the server-rendered page into dist/index.html, then removes the temporary SSR bundle.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const ssrDir = path.join(root, 'dist-ssr')
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const file = path.join(root, 'dist', 'index.html')
const html = fs.readFileSync(file, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found')
fs.writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('prerender: dist/index.html')
