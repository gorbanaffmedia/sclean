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
