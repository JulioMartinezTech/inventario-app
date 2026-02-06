<template>
  <header class="v-home__header">
    <img
      src="../assets/img/Colombiapan-el-sabor-de-lo-nuestro.webp"
      alt="logo"
      class="v-home__logo"
    />
  </header>
  <section class="v-home__progress-container">
    <div class="v-home__progress-info">
      <span>Progreso de inventario</span>
      <span class="v-home__count">{{ countedItems }} / {{ totalItems }}</span>
    </div>
    <div class="v-home__progress-bar-bg">
      <div
        class="v-home__progress-bar-fill"
        :style="{ width: `${progressPercentage}%` }"
        :class="{ 'is-complete': isInventoryComplete }"
      ></div>
    </div>
    <p v-if="!isInventoryComplete" class="v-home__pending-msg">
      Quedan {{ totalItems - countedItems }} productos pendientes
    </p>
  </section>
  <nav class="v-home__filters">
    <button
      v-for="loc in locations"
      :key="loc"
      @click="filterLocation = loc"
      :class="['v-home__filter-btn', { 'is-active': filterLocation === loc }]"
    >
      {{ loc === 'all' ? 'Todos' : loc }}
    </button>
  </nav>
  <main class="v-home__item-list">
    <CItemCard
      v-for="item in filteredItems"
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
import CItemCard from '../components/c-item-card.vue'
import { useInventory } from '@/composables/useInventory'
import { useInventoryExport } from '@/composables/useInventoryExport'
import type { UnitType } from '@/types/inventoryTypes'

// 1. Hook de Datos
const {
  filteredItems,
  filterLocation,
  locations,
  items,
  totalItems,
  countedItems,
  progressPercentage,
  isInventoryComplete,
  resetInventory,
} = useInventory()

// 2. Hook de Exportación
const { generatePDF } = useInventoryExport()

const units: UnitType[] = [
  { id: 1, label: 'Unidad', value: 'und' },
  { id: 2, label: 'Caja', value: 'cj' },
]

const handleExportAndReset = (): void => {
  // Usamos el servicio de exportación pasándole los datos del servicio de inventario
  generatePDF(items.value)

  if (confirm('¿Deseas limpiar la lista para un nuevo inventario?')) {
    resetInventory()
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

.v-home__progress-container {
  position: sticky;
  top: 0;
  background-color: white;
  padding: 15px;
  z-index: 30; /* Subimos el nivel */
  margin: 0 auto; /* Eliminamos el margin-bottom para pegar los filtros */
  border-bottom: none;
}

.v-home__progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.9rem;
}

.v-home__count {
  color: #27ae60;
}

.v-home__progress-bar-bg {
  width: 100%;
  height: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  overflow: hidden;
}

.v-home__progress-bar-fill {
  height: 100%;
  background-color: #e67e22;
  transition: width 0.3s ease;
}

.v-home__progress-bar-fill.is-complete {
  background-color: #27ae60;
}

.v-home__pending-msg {
  font-size: 0.8rem;
  color: #e67e22;
  margin-top: 5px;
  text-align: center;
}
.v-home__filters {
  position: sticky;
  top: 80px;
  background: white;
  display: flex;
  justify-content: flex-start; /* Alineado a la izquierda */
  overflow-x: auto; /* Permite scroll horizontal si hay muchos filtros */
  gap: 8px;
  padding: 12px;
  z-index: 20;
  scrollbar-width: none; /* Oculta scrollbar en Firefox */
}

.v-home__filters::-webkit-scrollbar {
  display: none; /* Oculta scrollbar en Chrome/Safari */
}

.v-home__filter-btn {
  padding: 8px 16px;
  border: 1px solid #e67e22;
  background: transparent;
  color: #e67e22;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s;
}

.v-home__filter-btn.is-active {
  background: #e67e22;
  color: white;
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
