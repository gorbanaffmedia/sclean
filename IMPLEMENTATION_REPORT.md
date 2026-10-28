# IMPLEMENTATION REPORT — Cleaning Omsk landing page (V2, corrective rebuild)

- **Sources:** `02_CLEANING_OMSK_PROTOTYPE_APPROVED.html` (meaning, only source of truth), `03_CLEANING_OMSK_DESIGN_SPEC_V2.md` (visual and responsive contract), `01_DONOR_CODE_AUDIT.md` + donor export (visual grammar).
- **Donor export:** already unpacked read-only in the workspace root (`index.html`, `services/`, `pricing/`, `assets/`). No ZIP was present.
- **Source files:** none were modified.
- **Previous version:** built from the outdated `02_CLEANING_OMSK_PROTOTYPE_FINAL.html` (12 sections). Its content and section map were discarded. Only the technical base was kept.

## 1. Semantic diff repaired

| Area | Before (wrong prototype) | Now (approved) |
|---|---|---|
| Section count | 12 | **13**, adding «Difficult Situations» |
| Brand / phone | «чисто по делу» / 29-44-83 | `ЧИСТО • ОМСК` / `+7 (3812) 00-00-00` |
| Nav | Услуги · Что входит · Цены · Работы · Отзывы | Услуги · Что входит · Работы · Цены · Отзывы; header CTA «Рассчитать» |
| H1 | long «Приведём квартиру…» sentence | «Генеральная уборка и уборка после ремонта»; that sentence (extended) is now the lead |
| Hero | 4 perks, 4-item ratings strip, CTAs «…уборки» / «Посмотреть цены» | 4 approved benefits, 3 proofs (от 4 часов / до 4 клинеров / по чек-листу), CTAs «Рассчитать стоимость» / «Что входит» |
| Products | 8 cards with real prices and old copy | 8 approved cards in approved order; `Основная услуга` on the first two; placeholder prices; CTA «Проверить дату» |
| Calculator | 5 service options incl. «Другое», auto-advance | 4 approved options; selecting doesn't advance, «Далее» / «Назад» do; new H2, lead and placeholder |
| Included | 2 feature cards + 4 room cards + add-on prices | **4 tabs** (Генеральная / После ремонта / Кухня / Санузел) + «Дополнительные работы» strip |
| Approach | «Отмыть квартиру — мало…», card «Можно без вашего присутствия» | «Чисто — и без риска для квартиры», card «Ответственность», plus an image |
| Team | 3 people with real experience | 4 people incl. Алексей (Менеджер), `опыт [X лет]` |
| Cases | real numbers | approved titles, texts and placeholders; CTA «Рассчитать мою квартиру» |
| Process | old texts | approved texts, 01–04 |
| Pricing | 9 real rows + lime summary panel | **8** approved rows with placeholders + «Узнать точную стоимость» |
| Difficult Situations | missing | **added**: 2 cards, CTAs «Рассчитать уборку» / «Обсудить заказ» |
| Reviews + trust | 3 reviews with avatars, ratings 4.9/4.8 | 4 reviews, **no avatars**, ratings `[X.X]`, 4 approved trust cards |
| FAQ | 10 questions, split layout | 6 approved questions, single column |
| Final CTA | photo + chips incl. «Другая» | form panel, chips incl. «Не знаю», approved copy |
| Footer | brand + note + phone | brand only (nothing invented) |
| Mobile bar | Рассчитать / Позвонить | **Рассчитать / Цены** |

## 2. Section manifest (13 main sections)

Header (85 px, lime, sticky, drawer below 1200) →

| # | Section | id | Band | Donor pattern |
|---|---|---|---|---|
| 1 | Hero | – | lime | Home hero: 2 columns, 535 px portrait (0.833), proof row with thin dividers |
| 2 | Product Matrix | `services` | grey | Services cards: 4:3 image, `25px 30px 30px` body, hover scale 1.03 + light overlay |
| 3 | Calculator | `calc` | navy | Why Cleaning dark surface; framed 38/62 split, 2 px lime progress |
| 4 | What We Do / Tabs | `scope` | white | `/services` Checklist By Room: grey 30/5 card + media (2×2 mosaic on «Генеральная») |
| 5 | Professional Approach | `approach` | navy | Why Cleaning: image + 2×2 navy-2 cards, lime 50 px badges |
| 6 | Team | `team` | white | portrait cards 1:1.12, 4 columns |
| 7 | Cases | `works` | grey | image-first white cards, before/after halves, 3-stat row |
| 8 | Process | `process` | grey (joined) | How It Works: white cards, large 01–04 numerals with divider |
| 9 | Pricing | `prices` | white | home pricing split: H2 left, grey table panel right with lime CTA footer |
| 10 | Difficult Situations | `situations` | grey | two 50/50 cards, one white and one lime |
| 11 | Reviews + Trust | `reviews` | white | lime rating pills, 2×2 grey review cards, navy 4-cell trust strip |
| 12 | FAQ | `faq` | grey | single-column accordion with row dividers, rotating plus |
| 13 | Final CTA | `final` | navy | H2 left, navy-2 form panel right, lime selected chip, lime submit |

→ Footer → Mobile sticky bar (≤ 809.98).

## 3. Removed old or wrong content

- The whole old copy set: old H1, perks, ratings strip, product texts, real prices, add-on price list, old approach heading, 3-person team, real case numbers, 10 FAQs, «Другое» / «Другая», «Позвонить».
- The «Временное фото» badges and the `MARK_TEMPORARY_EVIDENCE` flag (`TempMark` component deleted).
- Review avatars (`SHOW_REVIEW_AVATARS`), their image files, and the final-CTA photo.
- The `Included` section (replaced by `Scope` tabs).
- The `/assets/donor/` path, renamed to `/assets/img/`, so no template reference appears in the rendered site or its URLs.
- The `tel:` link on a placeholder number: the phone is plain text until `SITE.phoneHref` is set.
- Never present: photo calculation or upload, messenger mockup, separate equipment / remote / gallery / general-vs-repair blocks, donor blog, service areas or routes, checklist lead magnet.

## 4. Donor visual patterns used

- **Tokens:** exactly `#FFFFFF #F5F5F5 #1C1A2E #2A2740 #99F7BC #6A6878 #FFFFFFA8`, plus alpha lines derived from navy and white. No gradients, no other hues.
- **Radii:** `30px 5px 30px 5px` on cards and media; `20px 5px 20px 5px` on buttons, options, inputs and badges; `15px 5px 15px 5px` on tabs, chips, tags, pills and nav hover.
- **Geometry:** container 1200 / 850 / 400; page X 30 / 30 / 18; section Y 120 / 80 / 76; grid gap 25; group gap 65 / 65 / 40; header 85; buttons 50 high.
- **Breakpoints:** hand-set at ≥ 1200, 810–1199.98, ≤ 809.98.
- **Motion:**
  - reveal: opacity + 14 px rise, 450 ms;
  - H1 word rise, 500 ms;
  - hover 180 ms; image scale 1.03;
  - FAQ 220 ms; drawer 200 ms;
  - `prefers-reduced-motion` turns all of it off.
- No Framer runtime, DOM or classes.

## 5. Fonts

- **Onest** for H1–H3, buttons, numerals, prices, tabs and chips.
- **Golos Text** for body, nav, forms and FAQ.
- Both load from Google Fonts CSS, with Cyrillic coverage. There is no per-character font mixing (Outfit and Instrument Sans were removed), and no donor font files are in the project.

Type scale:
- H1 80 / 56 / 44 (line-height 1.0, −0.035em)
- H2 48 / 36 / 30 (1.05, −0.03em)
- H3 22 (1.18, −0.02em)
- lead 18 / 1.5, body 16 / 1.6, small 14 / 1.55, button 15 / 600

## 6. Interactions

- **Product CTA → calculator:**
  - Where the approved calculator has a matching option (Генеральная, После ремонта, Перед заселением, После арендаторов), it selects it.
  - «К конкретной дате» presets step 3 «К конкретной дате».
  - Other products select no option, since there is no matching approved one and the options were not changed. The product name is kept in the answer summary and in the lead payload.
  - The page scrolls to `#calc`.
- **Calculator:** 4 steps; progress 25 / 50 / 75 / 100 (`role=progressbar`); «Шаг N из 4» announced; focus moves to the question after Next or Back; answers persist.
- **Tabs:** WAI-ARIA tabs with arrow keys, Home / End and roving tabindex. All 4 panels are in the prerendered HTML; the inactive ones use `hidden`.
- **FAQ:** native buttons, `aria-expanded`, `aria-controls`, region; one item open at a time.
- **Final chips:** real `aria-pressed` buttons. They follow the calculator's service until the visitor picks a chip, and include «Не знаю».
- **Menu:** `aria-expanded`, focus moves to the first link, Tab is trapped, Escape closes it and returns focus, body scroll locks.
- **Sticky bar:** «Рассчитать / Цены». It hides while the calculator, final CTA or footer sits mid-viewport, so it never covers form controls; the body keeps 72 px bottom padding.

## 7. Temporary assets still present (silent, no UI labels)

17 template images, WebP q80, 2 widths each, 1.7 MB in total. Full slot list in `ASSET_REQUIREMENTS.md`.

- **Evidence slots, blocking:** team × 4 and case before/after × 3.
- **Other photography, to replace:** hero, 8 products, tab media, approach image.
- The same face is never used as both staff and client (there are no client faces at all).

## 8. Real data still required

- Everything marked `[X]`, `[X ₽]`, `[X лет]` and `[X.X]`, plus the phone number.
- Real review texts: the four cards currently repeat the prototype's placeholder quote.
- Confirmation that the hero proofs («от 4 часов», «до 4 клинеров») and the trust and approach claims are true.

Details are in `ASSET_REQUIREMENTS.md` §C.

## 9. Endpoint / domain status

- `VITE_LEAD_ENDPOINT`: **not set.** Both forms show «Онлайн-заявки пока не подключены — заявка не отправлена.». There is no fake success. Once set, success is shown only on HTTP 2xx. Payload: `{ source, service, product?, area?, when?, contact, page, sentAt }`.
- `VITE_SITE_URL`: **not set.** No canonical or `og:url` is emitted and no domain was invented. Setting it injects both at build time.
- Other SEO:
  - `lang="ru"`, title «Генеральная уборка и уборка после ремонта в Омске», Russian description;
  - no `noindex`, no donor metadata, no US geography;
  - exactly one `<h1>` and all 13 sections present in the prerendered `dist/index.html`.

## 10. Build / typecheck / lint

| Command | Result |
|---|---|
| `npm run build` (tsc + vite + SSR prerender) | ✅ success, no warnings |
| `npm run typecheck` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| Browser console (errors and warnings, all viewports, incl. hydration) | ✅ none |
| Forbidden strings in `dist` («расчёт по фото», «отправить фото», «Временное фото», «прототип», «donor») | ✅ 0 |
| «prototype» in `dist` | only React's internal `Object.prototype` in the JS bundle, not rendered |

## 11. Viewports tested

Headless Chrome (Playwright), measured at **1440, 1200, 1024, 810, 809, 390, 320**:

| | 1440 | 1200 | 1024 | 810 | 809 | 390 | 320 |
|---|---|---|---|---|---|---|---|
| horizontal overflow | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| sections / H1 | 13 / 1 | 13 / 1 | 13 / 1 | 13 / 1 | 13 / 1 | 13 / 1 | 13 / 1 |
| H1 size, clipped? | 80, no | 80, no | 56, no | 56, no | 44, no | 44, no | 44, no |
| products / team / cases / situations | 3/4/3/2 | 3/4/3/2 | 2/2/1/2 | 2/2/1/2 | 1/1/1/1 | 1/1/1/1 | 1/1/1/1 |
| hero image / sticky bar | yes / – | yes / – | – / – | – / – | – / yes | – / yes | – / yes |

Interaction checks (390 px) all passed:
- product preselect;
- no auto-advance;
- Enter on «Далее» with focus moving to the question;
- Back keeps answers;
- date preset;
- tabs with arrows and End;
- FAQ with Enter;
- «Не знаю» chip;
- honest submit message;
- menu open and Escape;
- sticky bar visible mid-page and hidden at the form;
- 0 broken anchors, 0 images without alt.

A real Tab walk through the first 40 stops at 1440 showed a visible focus ring on every stop.

Visual review: every section at 1440, plus phone and tablet spot checks.
QA repair: the tab mosaic's height is now driven by the grid (images out of flow), so the «Генеральная» panel no longer grows tall on tablet or desktop.

## 12. Open holds

1. Real evidence and data, per `ASSET_REQUIREMENTS.md`: blocking for publication.
2. `VITE_LEAD_ENDPOINT` and `VITE_SITE_URL` to configure at deployment.
3. **«Генеральная» mosaic captions:** the prototype's «Кухня • до/после» slot labels are rendered as «Кухня», «Санузел», «Плинтусы», «Фасады», because the temporary images are not before/after photos. Restore «до/после» when real pairs arrive.
4. **Typo fix in Process step 4:** the prototype text «оплачиваете работу .» had a stray space before the period, which I removed. No wording changed.
5. Google Fonts is loaded from Google's CDN. If third-party requests are not allowed, self-host Onest and Golos Text from their official sources.

---

## Финальная доработка — 12 октября 2026

Этот раздел описывает текущие изменения и проверки. Предыдущие сведения о браузерной проверке относятся к более ранней версии.

### Выполненные изменения

- Установлены телефоны 8 (3812) 29-44-83 и 8 923 047-39-28 с корректными `tel:` в шапке, мобильном меню и футере.
- Единый каталог содержит восемь направлений во всех карточках, прайсе, квизе и финальной форме. Первые две карточки выделены существующими средствами и увеличены на десктопе.
- Подробный состав работ включает восемь услуг; сохранены полезные вкладки кухни и санузла. Добавлены потолки с учётом покрытия и люстры без демонтажа. Сложные строительные загрязнения согласуются отдельно; это отражено и в FAQ.
- Указаны бригада до 4 клинеров и возможность привлечь до 20 специалистов. Ольга и Зульфия перечислены в команде без выдуманных должностей или случайных фотографий; существующие карточки Анны, Марии и Екатерины сохранены.
- Обновлены данные Алексея. Неподтверждённые цены удалены из карточек, таблицы и кейсов; вместо них предложен индивидуальный расчёт. Добавлены способы оплаты и закрывающие документы.
- Удалены четыре одинаковых демонстрационных отзыва и неподтверждённые рейтинги. Подготовлено подключение проверенных ссылок Яндекс Карт и 2ГИС; пустые ссылки не показываются.
- Ответственность и рассмотрение замечаний описаны без неподтверждённых условий страхования или срока 24 часа.
- В обеих формах добавлены обязательное согласие и ссылка на политику. Дополнительные окна, химчистка и кондиционеры необязательны, отдельного шага нет. Основная услуга исключается из дополнительных.
- PHP-обработчик проверяет согласие, включает дополнительные услуги и согласие в письмо. Получатели и интеграция сохранены. Успех на клиенте фиксируется только после успешного HTTP-ответа с JSON `ok: true`.
- Обновлены description и Open Graph description. Схема `/new-site/`, canonical и конфигурация окружения не менялись. Код Яндекс Метрики и её события в доступных исходниках не обнаружены; идентификаторы не придуманы.

### Изменённые файлы

- `src/config.ts`, `src/data/services.ts`, `src/data/content.ts`: контакты, источники услуг, тексты и настройки будущих реквизитов/ссылок.
- `src/booking.tsx`, `src/sections/Calculator.tsx`, `src/sections/FinalCta.tsx`, `src/components/Consent.tsx`, `src/components/AdditionalServices.tsx`: выбор услуг и согласие.
- `src/lib/lead.ts`, `public/api/send.php`: передача и проверка полей заявки и достоверный статус отправки.
- `src/components/Header.tsx`, `src/components/Footer.tsx`: контакты, реквизиты и политика.
- `src/data/images.ts`, `src/components/Picture.tsx`, `src/sections/Team.tsx`: оригинальная фотография и сведения о команде.
- `src/sections/Products.tsx`, `src/sections/Scope.tsx`, `src/sections/Pricing.tsx`, `src/sections/Reviews.tsx`, `src/styles.css`, `index.html`: отображение обновлённого контента и адаптивные стили.
- `scripts/check-final.mjs`: проверки собранного HTML и клиента отправки с подменённым ответом сервера.

### Проверки

- `npm run typecheck` — успешно.
- `npm run lint` — без ошибок, одно предупреждение в стороннем `tools/gfpgan/venv/.../mpl.js`; сторонний файл не изменялся.
- `npm run build` — успешно, клиентская сборка, SSR и пререндер в `dist/`. После блокировки esbuild песочницей выполнен разрешённый повтор.
- `node scripts/check-final.mjs` — успешно: восемь карточек, услуги, один H1, контактные ссылки, якоря, файлы изображений, отсутствие демонстрационных отзывов/цен. Проверены состав JSON-заявки и ответы: успех, отказ, неправильный JSON и ошибка сети. Без согласия запрос не отправляется.
- Браузерная проверка на десктопе, планшете и телефоне не выполнена: инвентарь браузеров пуст. Интерактивные переходы квиза, клавиатурная навигация и адаптивность требуют ручной проверки. Статические проверки не заменяют её.
- PHP не установлен в доступном окружении: исполнение обработчика и реальная доставка почты не проверены. Реальные заявки не отправлялись.

### Что требует согласования с клиентом

- Актуальные цены всех восьми услуг и достоверность прежних сумм кейсов.
- Юридическое наименование, ИНН, ОГРН/ОГРНИП, юридический адрес и контакт оператора персональных данных. Политику необходимо дополнить подтверждёнными сведениями об операторе, сроках хранения и остальных условиях обработки до публикации.
- Условия договора и ответственности, наличие страхования и подтверждённый срок/условия бесплатного исправления замечаний.
- Настоящие ссылки на отзывы Яндекс Карт и 2ГИС и подтверждённые рейтинги.
- Официальное русское написание бренда: «СКЛИН» в материалах не подтверждено, сохранено существующее `S-CLEAN ОМСК`. Домен, почта и технические идентификаторы сохранены. Предоставленные телефоны установлены без противоречий.
- Фото и должности Ольги и Зульфии, подтверждение соответствия прежних портретов именам. Подтверждение аналитики, если счётчик должен присутствовать.

### Фотография Алексея

Использован существующий оригинал `public/assets/img/alexey-real.webp` (1440×1920): мужчина в красной футболке выполняет химчистку экстрактором. URL учитывает `/new-site/`. Фото не редактировалось, отображается целиком через `object-fit: contain`. Должность — «Мастер химчистки», опыт — «более 3 лет». Визуальная проверка именно карточки в браузере ещё требуется.

### Формы и квиз

Квиз сохраняет четыре шага, предлагает восемь основных услуг и три необязательных дополнения. Переход требует ответа на текущий вопрос; площадь допускает «не знаю / не применимо». CTA карточек и состава работ передают основную услугу в общее состояние. Проверки отправки выполнены с mock-ответами, а блокировки согласия в интерфейсе — статически по коду. Реальная отправка и полный интерактивный проход не тестировались.

### Готовность

Проект готов к ручной проверке. Публикация требует заполнения и подтверждения перечисленных данных, проверки интерфейса на разных экранах и тестовой доставки заявки в целевом PHP-окружении. Ничего не публиковалось, git push и изменения сервера не выполнялись. Существующий `dist.tgz` не пересобирался и может содержать прежнюю версию; актуальная сборка находится в `dist/`.

## Финальный технический аудит перед деплоем — 12 октября 2026

Этот раздел дополняет предыдущий отчёт: локальный PHP найден в `C:\php\php.exe` (8.5.5). Прежнее утверждение о недоступности PHP больше не относится к текущей проверке.

### Исправления

- React-поля телефона теперь имеют `required`. Обе формы сохраняют обязательное согласие и проверку телефона перед отправкой.
- `src/lib/lead.ts` повторно проверяет контакт, непустую услугу и согласие. Валидатор принимает российский номер с 7/8 или десятью национальными цифрами, отклоняет буквы, неполные номера, посторонние коды страны, неверное положение плюса и повторяющиеся цифры. Это проверка формата, а не существования или принадлежности номера.
- PHP независимо проверяет телефон, строгое булево согласие, источник заявки, основную услугу, обязательные ответы квиза и допустимые дополнения. Пустой/повреждённый JSON и тело более 16 КБ отклоняются до вызова почты.
- Убрана зависимость обработчика от `mbstring`; строки ограничиваются с сохранением UTF-8. Предупреждения не выводятся в JSON. Исключение или отказ `mail()` дают HTTP 500 и `{"ok":false}`; успешный приём почтовой функцией даёт HTTP 200 и `{"ok":true}`. Получатели не менялись. OPTIONS возвращает стандартный HTTP 204 без тела, GET — HTTP 405 с JSON.

### Проверки и результаты

- TypeScript, production build (включая SSR/пререндер), проверка синтаксиса исходного и собранного PHP — успешно.
- Полный линтер — без ошибок, прежнее предупреждение в стороннем `tools/gfpgan/.../mpl.js`.
- `scripts/check-final.mjs` — успешно; расширены проверки некорректных контактов.
- `scripts/audit-deploy.mjs` — успешно: 46 локальных HTTP-запросов с настоящим PHP и отключённой встроенной функцией `mail`. Только локальная тестовая замена имитировала успех, отказ и исключение транспорта. Никакие письма не отправлялись.
- Проверен фактический клиентский `submitLead` → собранный `dist/api/send.php`: состав основной услуги, дополнений, площади, даты и согласия в тестовом письме, успешный и ошибочный ответы. Без согласия/с корректно отклонённым контактом клиент не выполняет запрос.
- Все 77 файлов `public/` побайтово совпадают с копиями в `dist/`, включая `api/send.php`, favicon и `assets/img/alexey-real.webp`. HTML содержит актуальный пререндер, ссылки на имеющиеся JS/CSS и код гидратации. Проверены 29 уникальных URL ресурсов HTML, пути CSS и отсутствие абсолютных Windows-путей/`file://` в текстовых файлах сборки.
- В production JS фактический API — `/new-site/api/send.php`, то есть `https://go-sclean.ru/new-site/api/send.php`. Запрос идёт на тот же origin, что и сайт.
- Локальная имитация размещения проверила HTTP 200 для `/new-site/`, `/new-site/index.html` и повторного открытия страниц с якорями. Сайт использует якоря, а не отдельные клиентские маршруты; специальных SPA rewrite для этих адресов не требуется. Реальные DirectoryIndex/редирект `/new-site` и гидратация в браузере на хостинге не проверялись.
- Тестовый сервер остановлен. Файлы тестовой замены находятся в `scripts/fixtures/`, за пределами `public/` и `dist/`.

### Передача файлов

Текущая структура — статический Vite-сайт плюс исполняемый PHP. Существующий `dist.tgz` содержит `index.html`, `api/`, `assets/` и favicon от корня архива, что соответствует передаче содержимого `dist/` в папку сайта. Автоматического deploy-скрипта и подтверждённого абсолютного пути document root в проекте не найдено.

На сервер должны попасть **все содержимое актуального `dist/`**: `index.html`, `favicon.svg`, весь `assets/` (включая новый JS, CSS и все изображения), `api/send.php`. Целевая директория — `<document root домена go-sclean.ru>/new-site/`; не создавать дополнительный уровень `new-site/dist/`. Абсолютный путь и используемый способ загрузки необходимо подтвердить. Исходники, `.env`, `node_modules`, `scripts/fixtures`, инструменты обработки фото и старый `dist.tgz` для этой публикации не нужны. Новый архив не создавался, старый не обновлялся.

### Оставшиеся проверки и данные

- На целевом хостинге должен исполняться PHP и работать почтовый транспорт. `mail() === true` означает приём сообщения транспортом, а не доказанную доставку получателю. Реальную доставку нужно проверить отдельной разрешённой тестовой заявкой после деплоя.
- Подтвердить document root, способ загрузки, версии/наличие PHP, доступность `mail()` и текущих получателей `MAIL_TO`/Bcc. Секреты и доступы для проведённого аудита не требовались.
- После деплоя проверить загрузку JS/CSS/фото без 404, обновление страницы и гидратацию, полный проход квиза/финальной формы, отсутствие отправки без согласия и правильный статус ошибки. GET API должен вернуть JSON/405, а не исходный PHP или HTML. Проверить обработку запросов к `/new-site/` и `/new-site`.
- Защиты от автоматического спама/ограничения частоты в коде нет; текущие проверки гарантируют валидность полей, но не подтверждают личность отправителя.
- В текущем HTML нет canonical; решение об основном индексируемом URL остаётся отдельным вопросом. Неподтверждённые бизнес- и юридические сведения из предыдущего раздела также остаются открытыми.

**Вывод:** `dist/` технически подготовлен для передачи на PHP-хостинг. Готовность фактической серверной среды и доставка почты требуют проверки после согласованной публикации. Деплой, изменения сервера, git push и отправка реальных заявок не выполнялись.

## Точечные правки по уточнённому заданию клиента — 12 октября 2026

Этот раздел описывает итог новой задачи и заменяет прежние решения об удалении цен/отзывов, расширении квиза и увеличении карточек. Изучены Git-история, рабочее дерево, резервная папка изображений и прежний `dist.tgz`. Исходный код до предыдущей доработки найден в коммите `59a301c`. Полного сброса рабочего дерева не было: восстановлены только известные изменения предыдущей доработки в затронутых файлах. Перед редактированием создана копия текущих исходников в `C:\Users\Xslav\AppData\Local\Temp\sclean-before-client-fixes-7MARmy`.

| № | Правка | Статус | Что сделано |
|---|---|---|---|
| 1 | Телефоны | Выполнено | Оба предоставленных номера кликабельны в контактных местах. Сохранён исходный размер текста телефонов. |
| 2 | Реквизиты | Нужны данные клиента | Достоверных реквизитов нет. Пустые значения в настройках не показываются посетителям. |
| 3 | Количество клинеров | Выполнено | Изменено существующее упоминание в hero: обычная бригада до 4, при необходимости до 20 человек. |
| 4 | Каталог услуг | Выполнено | Только каталог содержит новые восемь услуг в заданном порядке. Обычная сетка, размеры и фотографии карточек сохранены; первые две выделяются исходными плашками и кнопками. |
| 5 | Стоимость по услугам | Частично выполнено | Исходный прайс полностью восстановлен. Известные суммы сохранены; новые суммы для услуг без цены не придуманы. |
| 6 | Состав работ | Выполнено | В существующий список генеральной уборки добавлены потолок и люстра без снятия. Добавлено уточнение о подробном составе по обращению, без новых вкладок. |
| 7 | Строительные загрязнения | Выполнено | Добавлено только короткое уточнение об отдельном согласовании в описании генеральной уборки. |
| 8 | Сотрудники | Частично выполнено | Алексей — мастер химчистки, опыт более 3 лет. Использован существующий оригинал `alexey-real.webp` с исходным `object-fit: cover`. Остальные карточки и фото сохранены; данных для достоверного сопоставления Ольги/Зульфии портретам нет. |
| 9 | Проверка цен | Частично выполнено | Все исходные суммы, включая цены кейсов, сохранены до подтверждения клиентом. Они не объявлены новым утверждённым прайсом. |
| 10 | Отзывы | Нужны данные клиента | Восстановлены четыре прежних отзыва и оба рейтинга. Проверенных URL нет; вымышленные кнопки не показаны. Возможность подключить две компактные ссылки сохранена. |
| 11 | Фотографии | Выполнено | Все файлы изображений сохранены без изменений, порядок фото в каталоге совпадает с исходным. Единственная замена источника — ранее установленная фотография Алексея. |
| 12 | Согласие | Выполнено | В обеих существующих формах сохранено обязательное согласие со ссылкой на имеющуюся политику. Исходные четыре варианта и четыре шага квиза восстановлены, дополнительные шаги/услуги убраны. |
| 13 | Русское название | Нужны данные клиента | Подтверждённого русского написания нет. Сохранено исходное `S-CLEAN ОМСК`; домен, почта и идентификаторы не менялись. |

### Существующие цены

Сохранены: генеральная уборка — от 5 000 ₽; после ремонта — от 250 ₽/м²; перед заселением, после арендаторов и перед продажей — от 5 000 ₽; регулярная/поддерживающая уборка — от 80 ₽/м²; окна — от 300 ₽; химчистка — по договорённости. Кейс 64 м²: 16 500 ₽; 78 м²: 12 400 ₽; 45 м²: 7 800 ₽. Суммы кейсов не используются как тарифы остальных услуг.

Нужны актуальные суммы для химчистки мебели, чистки кондиционеров, уборки после ЧП и коммерческих объектов, а также подтверждение всех существующих ставок и цен кейсов.

### Недостающая информация

1. Карточка предприятия: наименование, ИНН, ОГРН/ОГРНИП и остальные реквизиты; подтверждённые сведения об операторе для имеющейся политики.
2. Актуальный прайс и подтверждение перечисленных существующих сумм.
3. Реальные ссылки на отзывы Яндекс Карт и 2ГИС.
4. Фотографии/должности Ольги и Зульфии либо достоверное сопоставление с имеющимися портретами. Карточки Марии и Екатерины не переименованы наугад.
5. Утверждённое русское написание бренда. Сейчас название встречается в `src/config.ts`, шапке/футере и имени отправителя PHP-письма; последний не изменялся этой задачей.

### Сравнение и проверки

- Автоматически сравнен исходный код коммита `59a301c` с итоговыми файлами. Исходная часть CSS полностью совпадает; новых правил для сеток карточек, команды или вкладок нет.
- Без изменений относительно исходного контента: FAQ, Approach, Process, Situations, Final, CALC, PRICING, CASES и REVIEWS. Сохранены компоненты, порядок секций, исходные четыре вкладки состава работ и четыре варианта квиза. Контент восьми новых услуг не распространялся на другие секции.
- Все изображения побайтово совпадают с файлами до этой задачи, а восемь фото в каталоге остаются на исходных позициях. Несвязанные пользовательские файлы не изменялись; старый архив не затронут.
- TypeScript — успешно. Проверка ESLint изменённых исходников и постоянных проверочных скриптов — без ошибок. Production build с SSR и пререндером — успешно.
- `scripts/check-final.mjs`: успешно — восемь карточек в нужном порядке, четыре исходных варианта квиза, сохранённые цены/отзывы/рейтинги, контакты, изображения, якоря, согласие и статусы отправки.
- `scripts/audit-deploy.mjs`: успешно — 49 запросов к локальному PHP с отключённой настоящей функцией почты, включая совместимость четырёх прежних вариантов формы и новых карточек. При переходе из карточки без соответствующего варианта квиза название сохраняется как `product` и передаётся в заявку. PHP изменён минимально для совместимости восстановленных вариантов; защита телефона/согласия и получатели писем сохранены.
- Визуальное сравнение не выполнено: список доступных браузеров пуст. Реальные письма не отправлялись. Ничего не публиковалось, git push не выполнялся.

### Изменённые файлы этой задачи

`src/data/content.ts`, `src/data/services.ts`, `src/booking.tsx`, `src/styles.css`, `src/components/Footer.tsx`, `src/sections/Calculator.tsx`, `src/sections/FinalCta.tsx`, `src/sections/Products.tsx`, `src/sections/Scope.tsx`, `src/sections/Team.tsx`, `src/sections/Pricing.tsx`, `src/sections/Reviews.tsx`, `public/api/send.php`, `index.html`, `scripts/check-final.mjs`, `scripts/audit-deploy.mjs`, этот отчёт. Удалён только созданный предыдущей доработкой и больше не используемый `src/components/AdditionalServices.tsx`; фотографии и пользовательские файлы не удалялись. Контакты, конфигурация и источник фото Алексея уже были установлены, в этой задаче их данные не менялись.
