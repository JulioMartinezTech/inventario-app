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
      :name="item.name"
      :unite-types="unites"
      v-model:type="item.selection.type"
      v-model:quantity="item.selection.quantity"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CItemCard from '../components/c-item-card.vue'
import rawData from '../data/items.json'

interface Selection {
  type: string
  quantity: number | null
}

interface Item {
  id: number
  name: string
  location: string
  selection: Selection
}
const unites = [
  { id: 1, label: 'Unidad', value: 'und' },
  { id: 2, label: 'Caja', value: 'cj' },
]

const items = ref<Item[]>(
  rawData.map((item) => ({
    ...item,
    selection: { type: '', quantity: null },
  })),
)
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
</style>
