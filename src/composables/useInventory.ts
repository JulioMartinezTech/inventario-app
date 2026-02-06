import { ref, computed, watch, onMounted } from 'vue'
import rawData from '../data/items.json'
import type { Item } from '@/types/inventoryTypes'

const STORAGE_KEY = 'inventory_data_v1'

export function useInventory() {
  const items = ref<Item[]>([])

  const createCleanList = (): Item[] =>
    rawData.map((item) => ({
      ...item,
      selection: { unit: 'und', quantity: null },
    }))

  const loadInitialData = () => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        items.value = JSON.parse(savedData)
        return
      } catch (e) {
        console.error('Error en localStorage', e)
      }
    }
    items.value = createCleanList()
  }

  onMounted(loadInitialData)

  watch(
    items,
    (newItems) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
    },
    { deep: true },
  )

  // Estadísticas para la UI
  const totalItems = computed(() => items.value.length)
  const countedItems = computed(
    () => items.value.filter((i) => i.selection.quantity !== null).length,
  )
  const progressPercentage = computed(() =>
    totalItems.value ? Math.round((countedItems.value / totalItems.value) * 100) : 0,
  )
  const isInventoryComplete = computed(
    () => countedItems.value === totalItems.value && totalItems.value > 0,
  )

  const resetInventory = () => {
    items.value = createCleanList()
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    items,
    totalItems,
    countedItems,
    progressPercentage,
    isInventoryComplete,
    resetInventory,
  }
}
