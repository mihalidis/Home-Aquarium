<script setup>
import { computed } from 'vue'
import { useFishPondStore } from '@/stores/fishPondStore'
import { calculateTimeDifference } from '@/utils/helper'

const store = useFishPondStore()
const { imageAddedFishes } = store

const handleEdit = (index, row) => {
  console.log(index, row)
}

const currentTime = computed(() => store.formattedTime)

imageAddedFishes.forEach(fish => {
  console.log(calculateTimeDifference(currentTime.value, fish.feedingSchedule.lastFeed).hours)
})

const tableData = computed(() => 
  imageAddedFishes.map(fish => ({
    name: fish.name,
    type: fish.type,
    weight: fish.weight,
    lastFeed: `${Math.round(calculateTimeDifference(currentTime.value, fish.feedingSchedule.lastFeed).hours)} saat önce`,
    health: "iyi"
  }))
)

</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="Adı" sortable  prop="name" />
    <el-table-column label="Türü" sortable  prop="type" />
    <el-table-column label="Ağırlığı" sortable  prop="weight" />
    <el-table-column label="Beslenme" sortable  prop="lastFeed" />
    <el-table-column label="Sağlık" sortable  prop="health" />
    <el-table-column label="İşlem">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)" style="width: 100%">
          Besle
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
