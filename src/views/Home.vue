<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Todolist from "../components/Todolist.vue";

const userStore = useUserStore();
const router = useRouter();

const handleLogin = () => {
  const username = prompt("请输入用户名：");
  if (username) {
    userStore.login(username);
  }
};

const handleLogout = () => {
  userStore.logout();
};

const goToAbout = () => {
  router.push("/about");
};
</script>

<template>
  <div class="home">
    <h1>首页</h1>
    <div class="user-info">
      <p>当前用户：{{ userStore.displayName }}</p>
      <p>登录状态：{{ userStore.isLoggedIn ? "已登录" : "未登录" }}</p>
    </div>
    <div class="actions">
      <button v-if="!userStore.isLoggedIn" @click="handleLogin">登录</button>
      <button v-else @click="handleLogout">退出登录</button>
      <button @click="goToAbout">前往关于页</button>
    </div>
    <Todolist />
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

.user-info {
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
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
