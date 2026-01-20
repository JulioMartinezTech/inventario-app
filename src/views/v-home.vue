<template>
  <header class="v-home__header">
    <img
      src="../assets/img/Colombiapan-el-sabor-de-lo-nuestro.webp"
      alt="logo"
      class="v-home__logo"
    />
  </header>
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
