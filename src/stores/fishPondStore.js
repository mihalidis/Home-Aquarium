import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchFishes } from '../config/api.js'
import moment from 'moment'

export const useFishPondStore = defineStore('fishPond', () => {
  const fishes = ref([])
  const isLoading = ref(false)
  const currentTime = ref(moment())
  
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

  const fetchPondFishes = async () => {
    try {
      isLoading.value = true
      const { data: data } = await fetchFishes()
      fishes.value = data
      console.log('fetched', data)
    } catch (error) {
      console.error('Error fetching fishes:', error)
    } finally {
      isLoading.value = false
    }
  }

  const formattedTime = computed(() => moment(currentTime.value).format('DD.MM.YYYY HH:mm'))

  const updateTime = (newTime) => {
    currentTime.value = newTime
  }

  return {
    fishes,
    imageAddedFishes,
    fetchPondFishes,
    isLoading,
    currentTime,
    formattedTime,
    updateTime
  }
})
