<template>
  <div class="c-item-card">
    <p class="c-item-card__title">item</p>
    <div class="c-item-card__iputs">
      <div><select name="" id=""></select></div>
      <div><input type="number" /></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.c-item-card {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-radius: 10px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 10px;
}
.c-item-card__iputs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
