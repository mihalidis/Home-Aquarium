<script setup>
import { useFishStore } from '@/stores/modules/fishStore'
import { useTimeStore } from '@/stores/modules/timeStore'

defineProps({
  fish: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])
const fishStore = useFishStore()
const timeStore = useTimeStore()

const handleFeedFish = (fishId) => {
  fishStore.feedFish(fishId, timeStore.currentTime)
}
</script>

<template>
  <div class="fish-card">
    <div class="close-icon" @click="emit('close')">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z" fill="#818898"/>
      </svg>
    </div>
    <div class="fish-header">
      <img class="fish-avatar" :src="fish.image" alt="fish" />
      <div class="fish-info">
        <div class="tooltip-text"><span>İsim:</span> {{ fish.name }}</div>
        <div class="tooltip-text"><span>Ağırlık:</span> {{ fish.weight }}gr</div>
        <div class="tooltip-text"><span>Sağlık:</span> {{ fish.healthStatus }}</div>
      </div>
    </div>
    <div class="fish-details">
      <div class="tooltip-text"><span>Son Beslenme:</span> {{ fish.feedingSchedule.lastFeed }}</div>
      <div class="tooltip-text"><span>Gelecek Beslenme:</span> {{ fish.feedingSchedule.nextFeed }}</div>
      <div class="tooltip-text"><span>Beslenme Aralığı:</span> {{ fish.feedingSchedule.intervalInHours }} saat</div>
    </div>
    <div class="tooltip-footer">
      <el-button class="tooltip-footer-btn" type="primary" size="mini" @click="handleFeedFish(fish.id)">Besle</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fish-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 2;

  .close-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }

  .fish-header {
    display: flex;
    gap: 16px;

    .fish-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .tooltip-text {
    color: var(--charcoal);
    font-size: 14px;
    font-style: normal;
    line-height: 20px;

    span {
      color: var(--color-text);
      font-weight: 600;
    }
  }

  .tooltip-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;

    .tooltip-footer-btn {
      align-self: stretch;
      margin: 0;

      &.close {
        color: var(--white);
        background-color: var(--cinnabar);
        border: 1px solid var(--cinnabar);
      }
    }
  }
}
</style>