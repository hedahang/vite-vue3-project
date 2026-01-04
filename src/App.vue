<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMenu = computed(() => route.path);
</script>

<template>
  <el-container class="app-container" direction="vertical">
    <el-header class="app-header">
      <h2 class="header-title">Vue 3 + Router + Pinia</h2>
    </el-header>
    <el-container direction="horizontal">
      <el-aside class="app-aside" width="200px">
        <el-menu
          :default-active="activeMenu"
          router
          mode="vertical"
          class="sidebar-menu"
        >
          <el-menu-item index="/">
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <span>关于</span>
          </el-menu-item>
          <el-menu-item index="/test">
            <span>测试</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.app-aside {
  background-color: #fff;
  border-right: 1px solid #e4e7ed;
}

.sidebar-menu {
  border-right: none;
  height: 100%;
}

.app-main {
  padding: 2rem;
  background-color: #f5f7fa;
}
</style>
