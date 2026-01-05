<template>
  <div class="demo4">
    <h1>指令的封装</h1>
    <input v-focus type="text" />

    <button v-permission="'add'">新增</button>
    <button v-debounce.immediate="3000" @click="submit">提交</button>
  </div>
</template>
<script setup lang="ts">
function submit() {
  console.log("提交");
}
</script>
<style scoped lang="scss">
.demo4 {
  padding: 2rem;
  text-align: center;
}
</style>
