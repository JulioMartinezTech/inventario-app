<template>
  <div class="c-item-card" :class="{ 'is-completed': quantityInput !== null }">
    <p class="c-item-card__title">{{ props.item.name }}</p>

    <div class="c-item-card__form-row">
      <div class="c-item-card__field -flex">
        <select
          v-model="selectedUnitType"
          :id="`type-${props.item.id}`"
          class="c-item-card__select"
          aria-label="Seleccionar unidad"
        >
          <option v-for="type in props.unitTypes" :key="type.id" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>

      <div class="c-item-card__field -fixed">
        <input
          v-model.number="quantityInput"
          type="number"
          :id="`qty-${props.item.id}`"
          class="c-item-card__input"
          placeholder=""
          inputmode="numeric"
          aria-label="Cantidad"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemCardProps } from '@/types/inventoryTypes'

const props = defineProps<ItemCardProps>()

const selectedUnitType = defineModel<ItemCardProps['item']['selection']['unit']>('type', {
  required: true,
})
const quantityInput = defineModel<number | null>('quantity', { default: null })
</script>

<style scoped>
.c-item-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.c-item-card.is-completed {
  background-color: #f0fff4;
  border-color: #68d391;
  opacity: 0.9;
}

.c-item-card.is-completed .c-item-card__title {
  color: #2f855a;
}

.c-item-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.c-item-card__form-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Clases de utilidad para el layout horizontal */
.c-item-card__field.-flex {
  flex: 1;
}

.c-item-card__field.-fixed {
  flex: 0 0 90px;
}

.c-item-card__select,
.c-item-card__input {
  width: 100%;
  height: 44px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f7fafc;
  transition: all 0.2s ease-in-out;
  text-align: center;
}

.c-item-card__select:focus,
.c-item-card__input:focus {
  border-color: #e67e22;
  background-color: #ffffff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
}

/* Mejoramos la apariencia del select en iOS/Android */
.c-item-card__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234A5568'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  padding-right: 30px;
}
</style>
