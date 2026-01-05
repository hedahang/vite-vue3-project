<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import request from "../utils/request";
import { removeToken } from "../utils/auth";

const route = useRoute();
const router = useRouter();
const activeMenu = computed(() => route.path);

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm("确定要退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    // 调用退出登录 API
    try {
      await request.post("/api/auth/logout");
    } catch (error) {
      // 即使 API 调用失败，也继续执行退出流程
      console.error("Logout API error:", error);
    }

    // 清除 token
    removeToken();
    ElMessage.success("退出登录成功");
    // 跳转到登录页
    router.push("/login");
  } catch (error) {
    // 用户取消操作
    if (error !== "cancel") {
      console.error("Logout error:", error);
    }
  }
};
</script>

<template>
  <el-container class="app-container" direction="vertical">
    <el-header class="app-header">
      <h2 class="header-title">Vue 3 + Router + Pinia</h2>
      <div class="header-right">
        <el-button type="danger" plain size="default" @click="handleLogout">
          退出登录
        </el-button>
      </div>
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
          <el-sub-menu index="/system">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/system/test">
              <span>测试管理</span>
            </el-menu-item>
          </el-sub-menu>
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
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
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
