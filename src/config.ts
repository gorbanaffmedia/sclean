/**
 * Site-level configuration. Everything that must be decided before publication
 * lives here or in .env (see .env.example).
 */
export const SITE = {
  // Russian spelling confirmed by the client.
  brand: 'С-КЛИН',
  phoneDisplay: '8 (3812) 29-44-83',
  phoneHref: 'tel:+73812294483',
  mobileDisplay: '8 923 047-39-28',
  mobileHref: 'tel:+79230473928',
} as const

/** Official enterprise card supplied by the client. No banking details are public. */
export const COMPANY = {
  name: 'Общество с ограниченной ответственностью «С-Клин»',
  shortName: 'ООО «С-Клин»',
  inn: '5501191429',
  kpp: '550101001',
  registration: '1185543024787',
  address: '644033, Россия, Омская область, г. Омск, ул. 3-я Дачная, д. 1',
  footerAddress: '644033, г. Омск, ул. 3-я Дачная, д. 1',
  director: 'Федорченко Николай Сергеевич',
  email: 'scleanomsk@gmail.com',
} as const

export const PRIVACY_URL = `${import.meta.env.BASE_URL}privacy/`
export const REVIEW_LINKS: { label: string; url: string }[] = [
  { label: 'Отзывы на Яндекс Картах', url: 'https://yandex.ru/maps/org/s_klin/215780250405/?ll=73.346478%2C55.011080&z=13' },
  { label: 'Отзывы в 2ГИС', url: 'https://2gis.ru/omsk/firm/70000001033753521?m=73.346428%2C55.011017%2F16' },
]


/**
 * Lead endpoint. Receives `POST` with a JSON `LeadPayload` (see lib/lead.ts).
 * Defaults to the bundled receiver (public/api/send.php → /new-site/api/send.php),
 * so a build without .env still has a working form; VITE_LEAD_ENDPOINT overrides it.
 */
export const LEAD_ENDPOINT: string = import.meta.env.VITE_LEAD_ENDPOINT || `${import.meta.env.BASE_URL}api/send.php`
