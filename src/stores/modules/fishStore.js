import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchFishes } from '@/config/api.js'
import { HEALTH_STATUS } from '@/constants/enum'
import { 
  decreaseHealthStatus, 
  increaseHealthStatus, 
  calculateDailyFeedAmount, 
  calculateDailyFeedCount,
  formatDate,
  addHoursToDate
} from '@/utils/helpers/fishHelpers'
import dayjs from 'dayjs'

export const useFishStore = defineStore('fish', () => {
  // state
  const fishes = ref([])
  const isLoading = ref(false)
  const tooltipData = ref(null)

  // getters
  const formattedFishes = computed(() => fishes.value)
  const currentTooltipData = computed(() => tooltipData.value)

  // actions
  const fetchPondFishes = async (currentTime) => {
    try {
      isLoading.value = true
      const { data: data } = await fetchFishes()
      fishes.value = data.map((fish) => ({
        ...fish,
        feedingSchedule: {
          ...fish.feedingSchedule,
          lastFeed: formatDate(currentTime),
          nextFeed: addHoursToDate(currentTime, fish.feedingSchedule.intervalInHours),
          feedCount: 1,
          dailyFeedAmount: calculateDailyFeedAmount(fish.weight),
          dailyFeedCount: calculateDailyFeedCount(fish.feedingSchedule.intervalInHours),
        },
        image: `/assets/pixi/fish${fish.id}.png`,
        healthStatus: HEALTH_STATUS.STANDART,
      }))
    } catch (error) {
      console.error('Error fetching fishes:', error)
    } finally {
      isLoading.value = false
    }
  }

  const feedFish = (fishId, currentTime) => {
    const fishIndex = fishes.value.findIndex((fish) => fish.id === fishId)
    if (fishIndex === -1) return

    const fish = { ...fishes.value[fishIndex] }
    const currentTimeObj = dayjs(currentTime)
    const nextFeedObj = dayjs(fish.feedingSchedule.nextFeed, 'DD.MM.YYYY HH:mm')

    // Balık beslenme zamanı gelmediyse sağlık durumunu düşür
    if (currentTimeObj.isBefore(nextFeedObj)) {
      fish.healthStatus = decreaseHealthStatus(fish.healthStatus)
    } else {
      // Balık beslenme zamanı geldiyse sağlık durumunu yükselt
      fish.healthStatus = increaseHealthStatus(fish.healthStatus)
    }

    // Beslenme bilgilerini güncelle
    fish.feedingSchedule = {
      ...fish.feedingSchedule,
      lastFeed: formatDate(currentTime),
      nextFeed: addHoursToDate(currentTime, fish.feedingSchedule.intervalInHours),
      feedCount: fish.feedingSchedule.feedCount + 1,
    }

    // Balık listesini güncelle
    fishes.value[fishIndex] = fish
  }

  const setTooltipData = (data) => {
    tooltipData.value = data
  }

  return {
    // state
    fishes,
    isLoading,
    tooltipData,
    
    // getters
    formattedFishes,
    currentTooltipData,
    
    // actions
    fetchPondFishes,
    feedFish,
    setTooltipData
  }
}) 