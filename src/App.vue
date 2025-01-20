<script setup>
import { onMounted, computed, useTemplateRef, ref } from 'vue'
import { useFishPondStore } from '@/stores/fishPondStore'
// Utils
import { createFishPond } from '@/utils/pixi/fishPond.js'
import eventBus from '@/utils/eventBus';
// Components
import FishPondTable from './components/FishPondTable.vue'
import SpeedTimer from './components/SpeedTimer.vue'
import FishCard from './components/FishCard.vue'

const store = useFishPondStore()

const show_tooltip = ref(false)
const tooltipElement = useTemplateRef('tooltipElement')

const showTable = computed(() => !store.isLoading && store.formattedFishes.length > 0)

const handleCloseTooltipModal = () => {
  show_tooltip.value = false
  store.setTooltipData(null)
}

onMounted(async () => {
  await store.fetchPondFishes()
  createFishPond(store)

  eventBus.on('SHOW_TOOL_TIP', (data) => {
    const shouldShowTooltip = (!store.currentTooltipData && tooltipElement.value) || (store.currentTooltipData?.id !== data.fish.id);

    if (shouldShowTooltip) {
      store.setTooltipData(data.fish);
      tooltipElement.value.style.top = `${data.fishPosition.top}px`;
      tooltipElement.value.style.left = `${data.fishPosition.left}px`;
      show_tooltip.value = true;
    }
  });
})
</script>

<template>
  <SpeedTimer />
  <div class="pond-wrapper">
    <img
      class="akvaryum"
      src="/src/assets/pixi/fish-pond-background.png"
      alt="fish pond background"
    />
    <div class="pond-scene">
      <div ref="tooltipElement" v-show="show_tooltip" class="tooltip">
        <FishCard v-if="store.currentTooltipData" :fish="store.currentTooltipData" @close="handleCloseTooltipModal" />
      </div>
    </div>
  </div>
  <FishPondTable v-if="showTable" />
</template>

<style lang="scss" scoped>
.pond-wrapper {
  position: relative;
  width: 1200px;

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

    canvas {
      border-radius: 18px;
    }
  }

  .tooltip {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
  }
}
</style>
