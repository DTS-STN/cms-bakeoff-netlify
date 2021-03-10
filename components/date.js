import { format, formatISO, parseISO } from 'date-fns'

export default function Date({ dateString }) {
  const dateISO = parseISO(dateString)
  return <time dateTime={formatISO(dateISO)}>{format(dateISO, 'LLLL d, yyyy')}</time>
}