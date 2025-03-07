import { HEALTH_STATUS } from '@/constants/enum'

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

export function calculateDailyFeedAmount(weight) {
  return weight / 100
}

export function calculateDailyFeedCount(intervalInHours) {
  return 24 / intervalInHours
} 