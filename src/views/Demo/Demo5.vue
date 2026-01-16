<template>
  <div
    class="custom-container"
    :class="{ 'is-vertical': isVertical }"
    @click="handleClick"
  >
    <div v-for="index in 8" :key="index" class="item">{{ index }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const isVertical = ref(false);
function handleClick() {
  isVertical.value = !isVertical.value;
}
</script>
<style lang="scss">
@use "../../assets/styles/mixin.scss" as *;
@include b(container) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  @include when(vertical) {
    flex-direction: column;
  }
  .item {
    width: 100px;
    height: 100px;
    margin: 20px;
    background-color: aqua;
  }
}
</style>
