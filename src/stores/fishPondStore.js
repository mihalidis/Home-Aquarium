import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchFishes } from '../config/api.js'
import moment from 'moment'

import Fish1 from '/public/images/Fish1.png'
import Fish2 from '/public/images/Fish2.png'
import Fish3 from '/public/images/Fish3.png'
import Fish4 from '/public/images/Fish4.png'
import Fish5 from '/public/images/Fish5.png'

export const useFishPondStore = defineStore('fishPond', () => {
  const fishes = ref([])
  const isLoading = ref(false)
  const currentTime = ref(moment())
  const fishImages = [Fish1, Fish2, Fish3, Fish4, Fish5]

  const imageAddedFishes = computed(() => {
    const currentDate = new Date().toISOString().split('T')[0].split('-').reverse().join('.')

    return fishes.value.map((fish) => ({
      ...fish,
      feedingSchedule: {
        ...fish.feedingSchedule,
        lastFeed: `${currentDate} ${fish.feedingSchedule.lastFeed}`,
      },
      image: fishImages[fish.id - 1],
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
