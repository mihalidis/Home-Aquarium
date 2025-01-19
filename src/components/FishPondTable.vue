<script setup>
import { computed } from 'vue'
import { useFishPondStore } from '@/stores/fishPondStore'
import { calculateTimeDifference } from '@/utils/helper'

const store = useFishPondStore()
const { imageAddedFishes } = store

const handleFeedFish = (index, row) => {
  console.log(index, row)
}

const currentTime = computed(() => store.formattedTime)

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
  <el-table class="fish-pond-table"
            row-class-name="fish-rows"
            :data="tableData"
            style="width: 100%"
  >
    <el-table-column label="Adı" sortable  prop="name" />
    <el-table-column label="Türü" sortable  prop="type" />
    <el-table-column label="Ağırlığı" sortable  prop="weight" />
    <el-table-column label="Beslenme" sortable  prop="lastFeed" />
    <el-table-column label="Sağlık" sortable  prop="health" />
    <el-table-column label="İşlem">
      <template #default="scope">
        <el-button size="small" @click="handleFeedFish(scope.$index, scope.row)" style="width: 100%">
          Besle
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss">
.el-table {
  border: 2px solid var(--smoky-black);
  border-radius: 12px;
  background-color: var(--color-table-background);

  .el-table__inner-wrapper {
    border-radius: 12px;
    background-color: var(--color-table-background);

    .el-table__header-wrapper {
      .el-table__header {
        thead {
          tr {
            th {
              background-color: var(--color-table-background);
              color: var(--smoky-black);
              font-weight: 600;
              border-bottom:  1px solid var(--smoky-black);

              .cell {
                color: var(--smoky-black);
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }

  tr {
    &.fish-rows {
      td {
        background-color: var(--color-table-background);
        color: var(--smoky-black);
        font-weight: 600;
        border-bottom:  1px solid var(--smoky-black);
      }
    }
  }
}

.el-button {
  width: 100%;
  border-radius: 8px;
  padding: 8px 10px;
  height: auto;
  background-color: var(--button-normal);
  border: 1px solid var(--button-normal);

  span {
    font-size: 12px;
    color: var(--white);
    font-weight: 600;
  }

  &:hover {
    background-color: var(--button-hover);
    border: 1px solid var(--button-hover);
  }
}
</style>
