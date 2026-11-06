import { MONTHS, SHORT_MONTHS } from "../constants/date";

function toDate(dateText) {
  return new Date(dateText + 'T00:00:00')
}

export function formatDayMonth(dateText) {
  const date = toDate(dateText)
  return date.getDate() + ' ' + MONTHS[date.getMonth()]
}

export function formatLongDate(dateText) {
  const date = toDate(dateText)
  return formatDayMonth(dateText) + ' ' + date.getFullYear()
}

export function formatDateButton(dateText) {
  const date = toDate(dateText)
  return date.getDate() + ' ' + MONTHS[date.getMonth()].slice(0, 4) + ' ' + date.getFullYear()
}

export function getDayMonth(dateText) {
  const date = toDate(dateText)
  let day = String(date.getDate())
  if (day.length === 1) {
    day = '0' + day
  }
  return { day, month: SHORT_MONTHS[date.getMonth()] }
}

export function formatTime(time) {
  const parts = time.split(':')
  if (parts[1] === '00') {
    return parseInt(parts[0]) + 'h'
  }
  return parseInt(parts[0]) + 'h' + parts[1]
}

export function firstSentence(text) {
  const position = text.indexOf('. ')
  if (position === -1) {
    return text
  }
  return text.slice(0, position + 1)
}

export function formatEndTime(startTime, duration) {
  const parts = startTime.split(':')
  const total = parseInt(parts[0]) * 60 + parseInt(parts[1]) + duration
  const hours = Math.floor(total / 60) % 24
  const minutes = total % 60
  if (minutes === 0) {
    return hours + 'h'
  }
  return hours + 'h' + (minutes < 10 ? '0' + minutes : minutes)
}
