import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchFishes } from '../config/api.js'
import { TIME_SPEEDS } from '@/constants/enum'
import moment from 'moment'

export const useFishPondStore = defineStore('fishPond', () => {
  const fishes = ref([])
  const isLoading = ref(false)
  const currentTime = ref(moment())
  const speed = ref(TIME_SPEEDS.REAL_TIME)
  
  // getters
  const imageAddedFishes = computed(() => {
    const currentDate = new Date().toISOString().split('T')[0].split('-').reverse().join('.')

    return fishes.value.map((fish) => ({
      ...fish,
      feedingSchedule: {
        ...fish.feedingSchedule,
        lastFeed: `${currentDate} ${fish.feedingSchedule.lastFeed}`,
      },
      image: `/src/assets/pixi/fish${fish.id}.png`,
    }))
  })

  const formattedTime = computed(() => moment(currentTime.value).format('DD.MM.YYYY HH:mm'))

  const currentSpeed = computed(() => speed.value)

  // setters
  const fetchPondFishes = async () => {
    try {
      isLoading.value = true
      const { data: data } = await fetchFishes()
      fishes.value = data
    } catch (error) {
      console.error('Error fetching fishes:', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateTime = (newTime) => {
    currentTime.value = newTime
  }

  const setSpeed = (newSpeed) => {
    speed.value = newSpeed
  }

  return {
    fishes,
    imageAddedFishes,
    fetchPondFishes,
    isLoading,
    currentTime,
    formattedTime,
    updateTime,
    currentSpeed,
    setSpeed,
  }
})
