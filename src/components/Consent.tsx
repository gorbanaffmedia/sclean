import { PRIVACY_URL } from '../config'

export function Consent({ id, checked, onChange }: { id: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="consent">
      <input id={id} type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <label htmlFor={id}>Даю согласие на обработку моего телефона и сведений о заказе для расчёта стоимости и связи по заявке.</label>
      <a href={PRIVACY_URL}>Политика обработки персональных данных</a>
    </div>
  )
}

