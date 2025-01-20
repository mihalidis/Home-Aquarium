<script setup>
import { computed } from 'vue'
import { useFishPondStore } from '@/stores/fishPondStore'
import { calculateTimeDifference } from '@/utils/helper'
import { HEALTH_STATUS } from '@/constants/enum'

const store = useFishPondStore()

const healthStatusColor = (status) => {
  switch (status) {
    case HEALTH_STATUS.GOOD:
      return 'success'
    case HEALTH_STATUS.STANDART:
      return 'warning'
    case HEALTH_STATUS.BAD:
      return 'danger'
    case HEALTH_STATUS.DEAD:
      return 'info'
    default:
      return 'info'
  }
}

const handleFeedFish = (index, row) => {
  store.feedFish(row.id)
}

const feedTimeText = (time) => {
  if (time === 0) return 'Yeni beslendi'

  return `${time} saat önce`
}

const currentTime = computed(() => store.formattedTime)

const tableData = computed(() =>
  store.formattedFishes.map((fish) => ({
    id: fish.id,
    name: fish.name,
    type: fish.type,
    weight: fish.weight,
    image: fish.image,
    lastFeed: feedTimeText(Math.round(calculateTimeDifference(currentTime.value, fish.feedingSchedule.lastFeed).hours)),
    healthStatus: fish.healthStatus,
  })),
)
</script>

<template>
  <el-table
    class="fish-pond-table"
    row-class-name="fish-rows"
    :data="tableData"
    style="width: 100%"
  >
  <el-table-column class-name="image-cell"
                  fixed
                  :width="43">
      <template #default="{ row }">
        <img :src="row.image" :alt="row.name" class="fish-image" />
      </template>
    </el-table-column>
    <el-table-column fixed label="Adı" sortable prop="name" />
    <el-table-column label="Türü" sortable prop="type" />
    <el-table-column label="Ağırlığı (gr)" sortable prop="weight" />
    <el-table-column label="Beslenme" sortable prop="lastFeed" />
    <el-table-column
      prop="healthStatus"
      label="Sağlık"
      sortable
    >
      <template #default="scope">
        <el-tag :type="healthStatusColor(scope.row.healthStatus)" disable-transitions>{{
          scope.row.healthStatus
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="İşlem">
      <template #default="scope">
        <el-button size="small" :disabled="scope.row.healthStatus === HEALTH_STATUS.DEAD" @click="handleFeedFish(scope.$index, scope.row)"> Besle </el-button>
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
              border-bottom: 1px solid var(--smoky-black);

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
      .fish-image {
        width: 30px;
        object-fit: cover;
      }

      td {
        background-color: var(--color-table-background);
        color: var(--smoky-black);
        font-weight: 600;
        border-bottom: 1px solid var(--smoky-black);
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

  &.is-disabled {
    background-color: var(--button-normal);
    background-image: none;
    border-color: var(--button-normal);
    color: var(--whiter);
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: var(--button-normal);
      border: 1px solid var(--button-normal);
    }
  }

  &:hover {
    background-color: var(--button-hover);
    border: 1px solid var(--button-hover);
  }
}
</style>
