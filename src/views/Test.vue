<template>
  <div class="test">
    <h1>测试页面</h1>
    <Demo1 />
    <Demo2 />
  </div>
</template>

<script setup lang="ts">
import Demo1 from "./Demo/demo1.vue";
import Demo2 from "./Demo/Demo2.vue";
</script>

<style scoped lang="scss">
.test {
  padding: 2rem;
  text-align: center;
}
</style>
