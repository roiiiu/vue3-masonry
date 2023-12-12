import { Ref, ref, watch } from "vue"

type ImageItemSize = {
  width: number
  height: number
}

interface Props<T> {
  items: T[]
  masonryRef: Ref<any>
  columnsNum: number
  columnWidth: number
}

interface Column<T> {
  height: number
  items: T[]
  index: number
}

export default function useMasonry<T extends ImageItemSize>({ items, masonryRef, columnsNum, columnWidth }: Props<T>) {
  const columns = ref<Column<T>[]>([])

  watch([items, masonryRef], () => {
    if (!masonryRef.value)
      return
    if (columns.value.length === 0)
      columns.value = createColumns(columnsNum)
    const last20Items = items.slice(items.length - 20, items.length)
    fillColumns(last20Items)
  }, { immediate: true })

  function redraw(columNum: number) {
    columns.value = createColumns(columNum)
    fillColumns(items)
  }

  function createColumns(count: number) {
    return Array.from({ length: count }).map((_, index) => ({
      items: [],
      height: 0,
      index,
    }
    ))
  }

  async function fillColumns(items: T[]) {
    items.forEach((item) => {
      const ratio = item.width / item.height
      const realHeight = columnWidth / ratio
      const targetIndex = columns.value.reduce((prev, curr) => curr.height < prev.height
        ? curr
        : prev,
      ).index

      columns.value[targetIndex].items.push(item as any)
      columns.value[targetIndex].height += realHeight
    })
  }

  return {
    columns,
    redraw,
  }
}
