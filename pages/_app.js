import '../styles/global.css'
import { LanguageProvider } from "../i18n/LanguageProvider"

export default function App({ Component, pageProps, router }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} key={router.route} />
    </LanguageProvider>
  )
}