import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { fetchFishes } from '../config/api.js'
import { TIME_SPEEDS, HEALTH_STATUS } from '@/constants/enum'
import { decreaseHealthStatus, increaseHealthStatus } from '@/utils/helper.js'
import moment from 'moment'

export const useFishPondStore = defineStore('fishPond', () => {
  const fishes = ref([])
  const isLoading = ref(false)
  const currentTime = ref(moment())
  const speed = ref(TIME_SPEEDS.REAL_TIME)
  const tooltipData = ref(null)

  // getters
  const formattedFishes = computed(() => fishes.value)
  const formattedTime = computed(() => moment(currentTime.value).format('DD.MM.YYYY HH:mm'))
  const currentSpeed = computed(() => speed.value)
  const currentTooltipData = computed(() => tooltipData.value)

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
          nextFeed: moment(currentTime.value)
            .add(fish.feedingSchedule.intervalInHours, 'hours')
            .format('DD.MM.YYYY HH:mm'),
          feedCount: 1,
          dailyFeedAmount: fish.weight / 100,
          dailyFeedCount: 24 / fish.feedingSchedule.intervalInHours,
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
    const lastFedTime = moment(fish.feedingSchedule.lastFeed, 'DD.MM.YYYY HH:mm')
    const nextFeedTime = lastFedTime.add(fish.feedingSchedule.intervalInHours, 'hours')

    if (fish.feedingSchedule.feedCount > fish.feedingSchedule.dailyFeedCount) {
      updateFishFeedingSchedule(fish)
      fish.feedingSchedule.healthStatus = decreaseHealthStatus(fish.healthStatus)
      return
    }

    const feedIsWithinRange = now.isBetween(
      moment(nextFeedTime).subtract(10, 'minutes'),
      moment(nextFeedTime).add(10, 'minutes'),
      null,
      '[]',
    )

    if (feedIsWithinRange) {
      updateFishFeedingSchedule(fish)
      fish.healthStatus = increaseHealthStatus(fish.healthStatus)
      return
    } else {
      updateFishFeedingSchedule(fish)
      fish.healthStatus = decreaseHealthStatus(fish.healthStatus)
      return
    }
  }

  const updateFishFeedingSchedule = (fish) => {
    fish.feedingSchedule.lastFeed = String(formattedTime.value)
    fish.feedingSchedule.feedCount++
  }

  const setTooltipData = (data) => {
    tooltipData.value = data
  }

  watch(currentTime, (newTime) => {
    fishes.value = fishes.value.map((fish) => {
      const now = moment(newTime)
      const lastFedTime = moment(fish.feedingSchedule.lastFeed, 'DD.MM.YYYY HH:mm')
      const nextFeedTime = lastFedTime.add(fish.feedingSchedule.intervalInHours, 'hours')

      if (now.isAfter(moment(nextFeedTime).add(10, 'minutes')) && fish.healthStatus !== HEALTH_STATUS.DEAD) {
        return {
          ...fish,
          healthStatus: decreaseHealthStatus(fish.healthStatus),
        }
      }

      return fish
    })
  })

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
    currentTooltipData,
    setTooltipData,
  }
})
