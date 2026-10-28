import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const read = (file) => fs.readFileSync(file, 'utf8')
const main = read('dist/index.html')
const policy = read('dist/privacy/index.html')
const footer = main.match(/<footer\b[\s\S]*?<\/footer>/)?.[0]
assert.ok(footer)
assert.ok(!footer.includes('<details') && !main.includes('href="#privacy"'))
for (const value of ['ООО «С-Клин»', '5501191429', '550101001', '1185543024787', '644033, г. Омск, ул. 3-я Дачная, д. 1']) assert.ok(footer.includes(value), value)
assert.ok(!/БИК|расчётный счёт|корреспондентский счёт/.test(footer))
assert.equal((main.match(/href="\/new-site\/privacy\/"/g) ?? []).length, 2, 'Final form and footer must link to the policy')
assert.ok(read('src/components/Consent.tsx').includes('href={PRIVACY_URL}'))
for (const file of ['Calculator', 'FinalCta']) {
  const form = read(`src/sections/${file}.tsx`)
  assert.ok(form.includes('<Consent') && form.includes('if (!consent') && form.includes('consent: true'))
}
assert.equal((policy.match(/<h1[ >]/g) ?? []).length, 1)
assert.equal((policy.match(/<h2[ >]/g) ?? []).length, 10)
for (const value of ['Общество с ограниченной ответственностью «С-Клин»', '5501191429', '550101001', '1185543024787', '644033, Россия, Омская область, г. Омск, ул. 3-я Дачная, д. 1', 'Федорченко Николай Сергеевич', 'scleanomsk@gmail.com']) assert.ok(policy.includes(value), value)
assert.ok(policy.includes('mailto:scleanomsk@gmail.com') && policy.includes('tel:+73812294483') && policy.includes('tel:+79230473928'))
assert.ok(policy.includes('https://go-sclean.ru/new-site/privacy/'))
assert.ok(!policy.includes('<script'), 'Policy must work as standalone static HTML')
for (const match of policy.matchAll(/href="(\/new-site\/[^"#]+)"/g)) assert.ok(fs.existsSync(path.join('dist', match[1].slice('/new-site/'.length))), `Missing local resource: ${match[1]}`)
console.log('PASS: compact legal footer, policy links, required consent unchanged, complete company details and standalone policy HTML/assets.')
