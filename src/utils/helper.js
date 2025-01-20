import moment from 'moment'
import { HEALTH_STATUS } from '@/constants/enum'

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

export function decreaseHealthStatus(healthStatus) {
  switch (healthStatus) {
    case HEALTH_STATUS.GOOD:
      return HEALTH_STATUS.STANDART
    case HEALTH_STATUS.STANDART:
      return HEALTH_STATUS.BAD
    case HEALTH_STATUS.BAD:
      return HEALTH_STATUS.DEAD
    default:
      return HEALTH_STATUS.DEAD
  }
}

export function increaseHealthStatus(healthStatus) {
  switch (healthStatus) {
    case HEALTH_STATUS.STANDART:
      return HEALTH_STATUS.GOOD
    case HEALTH_STATUS.BAD:
      return HEALTH_STATUS.STANDART
    case HEALTH_STATUS.DEAD:
      return HEALTH_STATUS.DEAD
    default:
      return HEALTH_STATUS.GOOD
  }
}