import { BookingProvider } from './booking'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { MobileSticky } from './components/MobileSticky'
import { Hero } from './sections/Hero'
import { Products } from './sections/Products'
import { Calculator } from './sections/Calculator'
import { Scope } from './sections/Scope'
import { Approach } from './sections/Approach'
import { Team } from './sections/Team'
import { Cases } from './sections/Cases'
import { Process } from './sections/Process'
import { Pricing } from './sections/Pricing'
import { Reviews } from './sections/Reviews'
import { Situations } from './sections/Situations'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'

export default function App() {
  return (
    <BookingProvider>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        {/* 13 main sections — order fixed by the approved prototype */}
        <Hero />
        <Products />
        <Calculator />
        <Scope />
        <Approach />
        <Team />
        <Cases />
        <Process />
        <Pricing />
        <Situations />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileSticky />
    </BookingProvider>
  )
}
