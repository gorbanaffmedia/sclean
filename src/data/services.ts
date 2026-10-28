/** Calculator step-1 options (client-approved list). */
export const SERVICES = [
  { id: 'general', label: 'Генеральная' },
  { id: 'renovation', label: 'После ремонта' },
  { id: 'windows', label: 'Мойка окон' },
  { id: 'upholstery', label: 'Химчистка мягкой мебели' },
  { id: 'maintenance', label: 'Поддерживающая уборка' },
  { id: 'aircon', label: 'Чистка кондиционера' },
] as const

export type ServiceId = (typeof SERVICES)[number]['id']

export const serviceLabel = (id: ServiceId) => SERVICES.find((s) => s.id === id)!.label

export const AREA_OPTIONS = ['до 40 м²', '40–60 м²', '60–90 м²', '90+ м²'] as const
export const WHEN_OPTIONS = ['Сегодня / завтра', 'На этой неделе', 'К конкретной дате', 'Пока узнаю стоимость'] as const

/** Final CTA choices: the calculator services + «Не знаю». */
export const FINAL_CHOICES = [...SERVICES.map((s) => s.label), 'Не знаю'] as const
