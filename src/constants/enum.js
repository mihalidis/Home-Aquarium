import { readonly } from 'vue'

export const TIME_SPEEDS = readonly({
  REAL_TIME: 1,
  MINUTE_SPEED: 60,
  TWO_MINUTE_SPEED: 120,
  HOUR_SPEED: 3600,
})

export const HEALTH_STATUS = readonly({
  GOOD: 'iyi',
  STANDART: 'standart',
  POOR: 'kötü',
  DEAD: 'ölü',
})
