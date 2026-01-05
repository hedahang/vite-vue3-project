<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import request from "../utils/request";
import { removeToken } from "../utils/auth";
import { usePermissionStore } from "../stores/permission";

const route = useRoute();
const router = useRouter();
const permissionStore = usePermissionStore();
const activeMenu = computed(() => route.path);

// 菜单项类型
interface MenuItem {
  path: string;
  name?: string;
  title: string;
  icon?: string;
  children?: MenuItem[];
}

// 静态菜单项（固定显示的路由）
const staticMenuItems: MenuItem[] = [
  {
    path: "/home",
    name: "Home",
    title: "首页",
    icon: "HomeFilled",
  },
  {
    path: "/about",
    name: "About",
    title: "关于",
    icon: "InfoFilled",
  },
];

// 过滤并转换路由为菜单项
function filterRoutesToMenu(
  routes: RouteRecordRaw[],
  parentPath = ""
): MenuItem[] {
  return routes
    .filter((route) => {
      // 过滤掉 hidden 路由
      return !route.meta?.hidden;
    })
    .map((route) => {
      const routeName = typeof route.name === "string" ? route.name : undefined;
      // 处理路径：如果是相对路径，则拼接父路径
      const fullPath = route.path.startsWith("/")
        ? route.path
        : parentPath
          ? `${parentPath}/${route.path}`
          : route.path;

      const menuItem: MenuItem = {
        path: fullPath,
        name: routeName,
        title: (route.meta?.title as string) || routeName || route.path,
        icon: route.meta?.icon as string | undefined,
      };

      // 递归处理 children
      if (route.children && route.children.length > 0) {
        menuItem.children = filterRoutesToMenu(route.children, fullPath);
      }

      return menuItem;
    });
}

// 合并静态菜单和动态菜单
const menuItems = computed(() => {
  const dynamicMenus = filterRoutesToMenu(permissionStore.routes);
  return [...staticMenuItems, ...dynamicMenus];
});

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
          <template v-for="item in menuItems" :key="item.path">
            <!-- 有子菜单的情况 -->
            <el-sub-menu
              v-if="item.children && item.children.length > 0"
              :index="item.path"
            >
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.path"
                :index="child.path"
              >
                <el-icon v-if="child.icon">
                  <component :is="child.icon" />
                </el-icon>
                <span>{{ child.title }}</span>
              </el-menu-item>
            </el-sub-menu>
            <!-- 没有子菜单的情况 -->
            <el-menu-item v-else :index="item.path">
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
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
