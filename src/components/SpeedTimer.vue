<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { TIME_SPEEDS } from '@/constants/enum'
import { useFishPondStore } from '@/stores/fishPondStore'
import moment from 'moment'

const store = useFishPondStore()
const pondSpeedInterval = ref(null)
const speedLabel = ref(`${store.currentSpeed}x`)

const updateSpeed = (newSpeed) => {
  speedLabel.value = `${newSpeed}x`

  store.setSpeed(newSpeed)

  resetPondSpeedInterval()
}

const resetPondSpeedInterval = () => {
  if (pondSpeedInterval.value) clearInterval(pondSpeedInterval.value)

  pondSpeedInterval.value = setInterval(() => {
    const secondsToAdd = store.currentSpeed / 10
    store.updateTime(moment(store.currentTime).add(secondsToAdd, 'seconds'))
  }, 100)
}

onMounted(() => {
  resetPondSpeedInterval()
})

onUnmounted(() => {
  if (pondSpeedInterval.value) clearInterval(pondSpeedInterval.value)
})
</script>

<template>
  <div class="timer">
    <div class="digital-clock">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2.75514 10.1637L4.14433 18.0422L10.0936 16.9931M2.75514 10.1637L2.06055 6.22447L14.863 3.96704L15.5576 7.90627L2.75514 10.1637ZM16.2792 12.0195L16.0009 14L17.4194 15.8824M21.9425 14.8351C21.4813 18.1165 18.4473 20.4028 15.1658 19.9417C11.8844 19.4805 9.59809 16.4465 10.0593 13.165C10.5205 9.88354 13.5545 7.59726 16.8359 8.05843C20.1174 8.51961 22.4037 11.5536 21.9425 14.8351Z" stroke="black" stroke-width="2" stroke-linecap="square"/>
      </svg>
      {{ store.formattedTime }}
    </div>

    <el-dropdown @command="updateSpeed" trigger="click">
      <div class="el-dropdown-link">
        <span class="speed-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 16L18 12L14 8M7 16L11 12L7 8" stroke="black" stroke-width="2" stroke-linecap="square"/>
          </svg>
          {{ speedLabel }}
        </span>
        <el-icon class="el-icon--right">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.29289 8.29289C3.68342 7.90237 4.31658 7.90237 4.70711 8.29289L12 15.5858L19.2929 8.29289C19.6834 7.90237 20.3166 7.90237 20.7071 8.29289C21.0976 8.68342 21.0976 9.31658 20.7071 9.70711L13.4142 17C12.6332 17.781 11.3669 17.781 10.5858 17L3.29289 9.70711C2.90237 9.31658 2.90237 8.68342 3.29289 8.29289Z" fill="black"/>
          </svg>
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :command="TIME_SPEEDS.REAL_TIME">{{ TIME_SPEEDS.REAL_TIME }}x</el-dropdown-item>
          <el-dropdown-item :command="TIME_SPEEDS.MINUTE_SPEED">{{ TIME_SPEEDS.MINUTE_SPEED }}x</el-dropdown-item>
          <el-dropdown-item :command="TIME_SPEEDS.TWO_MINUTE_SPEED">{{ TIME_SPEEDS.TWO_MINUTE_SPEED }}x</el-dropdown-item>
          <el-dropdown-item :command="TIME_SPEEDS.HOUR_SPEED">{{ TIME_SPEEDS.HOUR_SPEED }}x</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.timer {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 2rem;
  background-color: var(--color-background);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .digital-clock {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 180px;
    padding: 6px 8px;
    border: 2px solid var(--smoky-black);
    border-radius: 12px;
    background-color: var(--color-base-background);
    color: var(--smoky-black);
    font-weight: 600;
  }

  .el-dropdown {
    width: 110px;
    padding: 6px 8px;
    border: 2px solid var(--smoky-black);
    border-radius: 12px;
    background-color: var(--color-base-background);
    color: var(--smoky-black);
    font-weight: 600;
    cursor: pointer;

    .el-dropdown-link {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: none;
      outline: none;

      .speed-label {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    &:hover {
      border-color: var(--smoky-black);
    }

    &:focus {
      border-color: transparent;
    }
  }
}
</style>