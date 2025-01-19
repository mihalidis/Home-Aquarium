import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchFishes } from '../config/api.js'
import { TIME_SPEEDS, HEALTH_STATUS } from '@/constants/enum'
import moment from 'moment'

export const useFishPondStore = defineStore('fishPond', () => {
  const fishes = ref([])
  const isLoading = ref(false)
  const currentTime = ref(moment())
  const speed = ref(TIME_SPEEDS.REAL_TIME)

  // getters
  const formattedFishes = computed(() => fishes.value)
  const formattedTime = computed(() => moment(currentTime.value).format('DD.MM.YYYY HH:mm'))
  const currentSpeed = computed(() => speed.value)

  // setters
  const fetchPondFishes = async () => {
    try {
      isLoading.value = true
      const { data: data } = await fetchFishes()
      fishes.value = data.map((fish) => ({
        ...fish,
        feedingSchedule: {
          ...fish.feedingSchedule,
          lastFeed: moment(currentTime.value).format('DD.MM.YYYY HH:mm'),
        },
        image: `/src/assets/pixi/fish${fish.id}.png`,
        healthStatus: HEALTH_STATUS.STANDART,
      }))
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

  const feedFish = (fishId) => {
    const fish = fishes.value.find((f) => f.id === fishId)
    if (!fish) return

    const now = moment(currentTime.value)
    const lastFeed = moment(fish.feedingSchedule.lastFeed, 'DD.MM.YYYY HH:mm')
    const nextFeedTime = lastFeed.add(fish.feedingSchedule.intervalInHours, 'hours')

    const timeDifference = now.diff(nextFeedTime, 'minutes')
    console.log(now.format('DD.MM.YYYY HH:mm'), nextFeedTime.format('DD.MM.YYYY HH:mm'), timeDifference)
    if (timeDifference >= -10 && timeDifference <= 10) {
      fish.healthStatus =
        fish.healthStatus === HEALTH_STATUS.POOR ? HEALTH_STATUS.STANDARD : HEALTH_STATUS.GOOD
      fish.feedingSchedule.lastFeed = now.format('DD.MM.YYYY HH:mm')
    } else if (timeDifference > 10) {
      fish.healthStatus =
        fish.healthStatus === HEALTH_STATUS.GOOD ? HEALTH_STATUS.STANDARD : HEALTH_STATUS.POOR
    } else if (timeDifference < -10) {
      fish.healthStatus =
        fish.healthStatus === HEALTH_STATUS.GOOD ? HEALTH_STATUS.STANDARD : HEALTH_STATUS.POOR
    }

    if (fish.healthStatus === HEALTH_STATUS.POOR && timeDifference > 10) {
      fish.healthStatus = 'dead'
    }

    console.log('Balık beslendi:', fish)
  }

  return {
    fishes,
    formattedFishes,
    fetchPondFishes,
    isLoading,
    currentTime,
    formattedTime,
    updateTime,
    currentSpeed,
    setSpeed,
    feedFish,
  }
})
