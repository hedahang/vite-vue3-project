<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import { useMouse } from "@vueuse/core";
import Heading from "../components/Heading.tsx";

const userStore = useUserStore();
const router = useRouter();

const goToHome = () => {
  router.push("/");
};

const { x, y } = useMouse();
</script>

<template>
  <div class="about">
    <h1>关于页面</h1>
    <div class="info">
      <p>这是一个使用 Vue 3 + TypeScript + Vite 构建的项目</p>
      <p>已集成 Vue Router（Hash 模式）和 Pinia 状态管理</p>
    </div>
    <div class="user-status">
      <p v-if="userStore.isLoggedIn">欢迎，{{ userStore.displayName }}！</p>
      <p v-else>您当前未登录</p>
    </div>
    <div class="mouse-position">
      <p>鼠标位置：{{ x }}, {{ y }}</p>
    </div>
    <button @click="goToHome">返回首页</button>
    <Heading :level="2">这是一个二级标题</Heading>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  text-align: center;
}

.info {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #e3f2fd;
  border-radius: 8px;
}

.user-status {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #fff3e0;
  border-radius: 8px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #35a372;
}
</style>
