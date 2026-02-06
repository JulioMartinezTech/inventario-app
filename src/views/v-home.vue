<template>
  <header class="v-home__header">
    <img
      src="../assets/img/Colombiapan-el-sabor-de-lo-nuestro.webp"
      alt="logo"
      class="v-home__logo"
    />
  </header>
  <main class="v-home__item-list">
    <CItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :unit-types="units"
      v-model:type="item.selection.unit"
      v-model:quantity="item.selection.quantity"
    />
    <div class="v-home__actions">
      <button
        @click="handleExportAndReset"
        :disabled="!isInventoryComplete"
        class="v-home__btn-export"
      >
        {{ isInventoryComplete ? 'Generar y Limpiar Lista' : 'Faltan items por contar' }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import CItemCard from '../components/c-item-card.vue'
import rawData from '../data/items.json'

import { useInventoryExport } from '@/composables/useInventoryExport'

import type { Item, UnitType } from '@/types/inventoryTypes'

const { generatePDF } = useInventoryExport()

const units: UnitType[] = [
  { id: 1, label: 'Unidad', value: 'und' },
  { id: 2, label: 'Caja', value: 'cj' },
]

const createInitialItems = (): Item[] => {
  return rawData.map((item) => ({
    ...item,
    selection: { unit: 'und', quantity: null },
  }))
}

const items = ref<Item[]>(createInitialItems())

// Computed para validar si hay algo que exportar
const isInventoryComplete = computed(() => {
  return items.value.length > 0 && items.value.every((i) => i.selection.quantity !== null)
})

const handleExportAndReset = (): void => {
  // 1. Exportamos
  generatePDF(items.value)

  // 2. REGLA 2: Resetear la lista después de exportar
  // Usamos un timeout pequeño o confirmación opcional si quieres estar seguro
  const confirmed = confirm('¿Deseas limpiar la lista para un nuevo inventario?')
  if (confirmed) {
    items.value = createInitialItems()
  }
}
</script>

<style scoped>
.v-home__header {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.v-home__logo {
  width: 130px;
}
.v-home__item-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
.v-home__actions {
  margin-top: 30px;
  position: sticky;
  bottom: 20px;
  padding: 10px;
}

.v-home__btn-export {
  padding: 15px 30px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.v-home__btn-export:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.v-home__btn-export:active:not(:disabled) {
  transform: scale(0.95);
}
</style>
