import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { PrivacyPage } from './PrivacyPage'

/** Build-time prerender (scripts/prerender.mjs): the page ships as static HTML, then hydrates. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export function renderPrivacy() {
  return renderToString(<PrivacyPage />)
}
