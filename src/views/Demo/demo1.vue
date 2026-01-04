<template>
  <div class="rate-demo">
    <h2>评分组件示例</h2>
    <p>当前评分：{{ score }}</p>
    <Rate v-model="score"><span>课程评分：</span></Rate>
    <Rate v-model="score" theme="yellow"><span>德育评分：</span></Rate>
    <Rate v-model="score" theme="green"><span>体育评分：</span></Rate>
    <Rate v-model="score" theme="blue"><span>美育评分：</span></Rate>
    <Rate v-model="score" theme="purple"><span>劳育评分：</span></Rate>
    <Rate v-model="score" theme="gray"><span>心理评分：</span></Rate>
    <Rate v-model="score" theme="red"><span>创新评分：</span></Rate>
    <Rate v-model="score" theme="pink"><span>实践评分：</span></Rate>
    <Rate v-model="score" theme="brown"><span>劳动评分：</span></Rate>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Rate from "../../components/Rate.vue";
let score = ref(3.5);
</script>

<style scoped lang="scss">
.rate-demo {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.rate-demo h2 {
  margin-bottom: 1rem;
}
</style>
