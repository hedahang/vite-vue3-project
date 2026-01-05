<script setup lang="ts">
// import { ref } from "vue";
// function fib(n: number): number {
//   if (n <= 1) return 1;
//   return fib(n - 1) + fib(n - 2);
// }
// function fib(n: number): number {
//   let arr = [1, 1];
//   let i = 2;
//   while (i <= n) {
//     arr[i] = (arr[i - 1] || 0) + (arr[i - 2] || 0);
//     i++;
//   }
//   return arr[n] || 0;
// }
// let count = ref(fib(38));
// console.log(count.value);
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped></style>
