<template>
  <div class="animate-demo">
    <h2>前端过渡和动效</h2>
    <div class="box" :style="{ width: width + 'px' }"></div>
    <button @click="changeWidth">click</button>
    <transition name="fade">
      <h1 v-if="showTitle">你好 Vue 3</h1>
    </transition>
    <button @click="toggleTitle">显隐切换</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let width = ref(100);
function changeWidth() {
  width.value += 100;
}
let showTitle = ref(true);
function toggleTitle() {
  showTitle.value = !showTitle.value;
}
</script>
<style scoped lang="scss">
.animate-demo {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  .box {
    background: red;
    height: 100px;
    transition: width 1s ease-in-out;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease-in-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
