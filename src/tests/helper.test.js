import { describe, it, expect } from 'vitest'
import { calculateTimeDifference, decreaseHealthStatus } from '../utils/helper'
import { HEALTH_STATUS } from '@/constants/enum'
import dayjs from 'dayjs'

describe('Helper Functions', () => {
  describe('calculateTimeDifference', () => {
    it('should calculate the correct time difference in hours and days', () => {
      const date1 = dayjs('2023-10-01 12:00', 'YYYY-MM-DD HH:mm')
      const date2 = dayjs('2023-10-02 12:00', 'YYYY-MM-DD HH:mm')
      const result = calculateTimeDifference(date1, date2)
      expect(result.hours).toBe(24)
      expect(result.days).toBe(1)
    })

    it('should return zero for the same date', () => {
      const date1 = dayjs('2023-10-01 12:00', 'YYYY-MM-DD HH:mm')
      const date2 = dayjs('2023-10-01 12:00', 'YYYY-MM-DD HH:mm')
      const result = calculateTimeDifference(date1, date2)
      expect(result.hours).toBe(0)
      expect(result.days).toBe(0)
    })
  })

  describe('decreaseHealthStatus', () => {
    it('should decrease health status correctly', () => {
      expect(decreaseHealthStatus(HEALTH_STATUS.GOOD)).toBe(HEALTH_STATUS.STANDART)
      expect(decreaseHealthStatus(HEALTH_STATUS.STANDART)).toBe(HEALTH_STATUS.BAD)
      expect(decreaseHealthStatus(HEALTH_STATUS.BAD)).toBe(HEALTH_STATUS.DEAD)
      expect(decreaseHealthStatus(HEALTH_STATUS.DEAD)).toBe(HEALTH_STATUS.DEAD)
    })
  })
})
