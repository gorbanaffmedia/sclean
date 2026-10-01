/** Calculator step-1 options (approved prototype). */
export const SERVICES = [
  { id: 'general', label: 'Генеральная' },
  { id: 'renovation', label: 'После ремонта' },
  { id: 'move-in', label: 'Перед заселением' },
  { id: 'tenants', label: 'После арендаторов' },
] as const

export type ServiceId = (typeof SERVICES)[number]['id']

export const serviceLabel = (id: ServiceId) => SERVICES.find((s) => s.id === id)!.label

export const AREA_OPTIONS = ['до 40 м²', '40–60 м²', '60–90 м²', '90+ м²'] as const
export const WHEN_OPTIONS = ['Сегодня / завтра', 'На этой неделе', 'К конкретной дате', 'Пока узнаю стоимость'] as const

/** Final CTA choices: the four services + «Не знаю». */
export const FINAL_CHOICES = [...SERVICES.map((s) => s.label), 'Не знаю'] as const
