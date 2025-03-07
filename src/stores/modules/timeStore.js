import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { TIME_SPEEDS } from '@/constants/enum'
import dayjs from 'dayjs'

export const useTimeStore = defineStore('time', () => {
  // state
  const currentTime = ref(dayjs())
  const speed = ref(TIME_SPEEDS.REAL_TIME)

  // getters
  const formattedTime = computed(() => dayjs(currentTime.value).format('DD.MM.YYYY HH:mm'))
  const currentSpeed = computed(() => speed.value)

  // actions
  const updateTime = (newTime) => {
    currentTime.value = newTime
  }

  const setSpeed = (newSpeed) => {
    speed.value = newSpeed
  }

  return {
    // state
    currentTime,
    speed,
    
    // getters
    formattedTime,
    currentSpeed,
    
    // actions
    updateTime,
    setSpeed
  }
}) 