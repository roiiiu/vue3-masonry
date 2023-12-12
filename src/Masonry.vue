<script setup lang="ts" generic="T extends {width: number,height:number}">
import { ref, watch } from 'vue';
import useMasonry from './useMasonry'

const props = withDefaults(defineProps<{
  items: T[]
  columnsNum: number
  columnWidth: number
  gap: number
}>(), {
  columnsNum: 3,
  columnWidth: 200,
  gap: 20,
})
const masonryRef = ref<HTMLDivElement | null>(null)

const { columns, redraw } = useMasonry({
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
  <div 
  ref="masonryRef" 
  class="container" 
  :style="{
    gap: `${gap}px`,
  }">
    <div 
    v-for="column, columnIndex in columns" 
    :key="columnIndex" 
    :data-index="columnIndex" 
    class="column" 
    :style="{
      gap: `${gap}px`,
      width: `${columnWidth}px`}">
      <div
        class="item" 
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
}

.column{
  display: flex;
  flex-direction: column;
}

.item{
  display: flex;
}
</style>
