import type { ReactNode } from 'react'
import { SITE } from '../config'
import type { LeadResult } from '../lib/lead'

export type FormStatus = LeadResult | 'sending' | 'invalid' | null

/** Honest submission feedback: success is shown only when the endpoint confirmed it. */
export function LeadStatus({ id, status }: { id: string; status: FormStatus }) {
  let text: ReactNode = null
  if (status === 'invalid') text = 'Укажите телефон или мессенджер.'
  if (status === 'sent') text = 'Заявка отправлена. Свяжемся с вами, чтобы уточнить детали.'
  if (status === 'error' || status === 'not-configured')
    text = (
      <>
        {status === 'error'
          ? 'Не удалось отправить заявку. Попробуйте ещё раз.'
          : 'Онлайн-заявки пока не подключены — заявка не отправлена.'}
        {SITE.phoneHref && (
          <>
            {' '}
            Позвоните нам: <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
          </>
        )}
      </>
    )
  return (
    <p id={id} className={`lead-status${status ? ` lead-status--${status}` : ''}`} role="status" aria-live="polite">
      {text}
    </p>
  )
}
