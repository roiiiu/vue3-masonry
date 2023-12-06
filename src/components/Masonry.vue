<script setup lang="ts" generic="T extends {width: number,height:number}">
import { ref, watch } from 'vue';
import useMasonry from '../composables/useMasonry'

const props = defineProps<{
  items: T[]
  columnsNum: number
  columnWidth: number
}>()
const masonryRef = ref<HTMLDivElement | null>(null)

const { columns, redraw } = useMasonry<T>({
  items: props.items,
  masonryRef: masonryRef,
  columnsNum: props.columnsNum,
  columnWidth: props.columnWidth,
})

watch(() => props.columnsNum, (newValue) => {
  redraw(newValue)
})
</script>

<template>
  <div ref="masonryRef" class="container">
    <div v-for="column, columnIndex in columns" :key="columnIndex" :data-index="columnIndex" class="column" :style="{ width: `${columnWidth}px` }">
      <div
        v-for="item, row in column.items"
        :key="row"
      >
        <slot
          :item="item"
          :column="columnIndex"
          :row="row"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  gap: 0.5rem;
}
.column{
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
