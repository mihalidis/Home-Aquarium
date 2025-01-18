import moment from 'moment'

export function calculateTimeDifference(date1, date2, format = 'DD.MM.YYYY HH:mm') {
  const time1 = moment(date1, format)
  const time2 = moment(date2, format)

  const duration = moment.duration(time1.diff(time2))

  const hoursPassed = parseInt(duration.asHours())
  const daysPassed = parseInt(duration.asDays())

  return {
    hours: hoursPassed,
    days: daysPassed,
  }
}
