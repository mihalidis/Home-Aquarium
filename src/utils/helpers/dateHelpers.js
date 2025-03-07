import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(duration)
dayjs.extend(isBetween)

export function calculateTimeDifference(date1, date2, format = 'DD.MM.YYYY HH:mm') {
  const time1 = dayjs(date1, format)
  const time2 = dayjs(date2, format)

  if (!time1.isValid() || !time2.isValid()) {
    throw new Error('Geçersiz tarih formatı')
  }

  const diff = time1.diff(time2)
  const durationObj = dayjs.duration(diff)

  const hoursPassed = Math.abs(parseInt(durationObj.asHours()))
  const daysPassed = Math.abs(parseInt(durationObj.asDays()))

  return {
    hours: hoursPassed,
    days: daysPassed,
  }
}

export function formatDate(date, format = 'DD.MM.YYYY HH:mm') {
  return dayjs(date).format(format)
}

export function addHoursToDate(date, hours, format = 'DD.MM.YYYY HH:mm') {
  return dayjs(date).add(hours, 'hour').format(format)
} 