import { format, formatISO, parseISO } from 'date-fns'
import englishLocale from 'date-fns/locale/en-CA'
import frenchLocale from 'date-fns/locale/fr-CA'

export default function Date({ dateString, locale }) {
  const dateISO = parseISO(dateString)
  let localeObject = locale === 'en' ? englishLocale : frenchLocale
  return <time dateTime={formatISO(dateISO)}>
    <span>{format(dateISO, 'LLLL d, yyyy', { locale: localeObject })}</span>
  </time>
}