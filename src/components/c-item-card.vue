<template>
  <div class="c-item-card">
    <p class="c-item-card__title">item</p>
    <div class="c-item-card__separator"></div>
    <div class="c-item-card__iputs">
      <div class="c-item-card__select__container">
        <label for="">Tipo de unidad</label>
        <select v-model="selectedUniteType" name="" id="type" class="c-item-card__select">
          <option disabled value="">Seleccione una</option>
          <option v-for="type in uniteTypes" :key="type.id" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>
      <div class="c-item-card__input__container">
        <label for="">Cantidad</label>
        <input type="number" class="c-item-card__input" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedUniteType = ref('')

const uniteTypes = ref([
  { id: 1, label: 'unidad', value: 'und' },
  { id: 2, label: 'caja', value: 'cj' },
])
</script>

<style scoped>
* {
  background-color: #fff;
}
.c-item-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 15px 10px;
}
.c-item-card__separator {
  width: 70%;
  border-bottom: solid 1px gray;
}
.c-item-card__iputs {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.c-item-card__select__container {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.c-item-card__input__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.c-item-card__select {
  width: 90%;
  height: 30px;
  border: solid 1px grey;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3px;
}
.c-item-card__input {
  width: 90%;
  height: 30px;
  border: solid 1px grey;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
