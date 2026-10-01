export function CheckList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`checklist ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
