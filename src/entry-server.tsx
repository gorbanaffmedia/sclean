import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

/** Build-time prerender (scripts/prerender.mjs): the page ships as static HTML, then hydrates. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
