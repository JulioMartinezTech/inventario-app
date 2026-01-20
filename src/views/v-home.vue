<template>
  <header class="v-home__header"></header>
  <div class="v-home__item-list">
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
    <CItemCard />
  </div>
</template>

<script setup lang="ts">
import CItemCard from '../components/c-item-card.vue'
</script>

<style scoped>
.v-home__header {
  width: 100%;
  height: 120px;
  background-color: #fff;
  margin-bottom: 20px;
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
