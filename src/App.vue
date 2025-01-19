<script setup>
import { onMounted, computed } from 'vue'
import { useFishPondStore } from '@/stores/fishPondStore'
import { fishPond } from './utils/pixi/fishPond.js'

// components
import FishPondTable from './components/FishPondTable.vue'
import SpeedTimer from './components/SpeedTimer.vue'

const store = useFishPondStore()

const showTable = computed(() => 
  !store.isLoading && store.imageAddedFishes.length > 0
)

onMounted(async () => {
  await store.fetchPondFishes()
  fishPond(store)
})
</script>

<template>
  <SpeedTimer />
  <div class="pond-wrapper">
    <img class="akvaryum" src="/images/fish-pond-background.png" alt="fish pond background">
    <div class="pond-scene" />
  </div>
  <div v-if="showTable" class="fish-pond-table-wrapper">
    <FishPondTable />
  </div>
</template>

<style scoped>
.pond-wrapper {
  position: relative;
  width: 1200px;
}

.akvaryum {
  width: 100%;
}

.pond-scene {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 169px;
  left: 35px;
  width: 1130px;
  height: 388px;
  border-radius: 18px;
}
</style>
