import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteRecordRaw } from "vue-router";

import router from "../router";

interface BackendRoute {
  name?: string;
  path: string;
  component: string | (() => Promise<unknown>);
  redirect?: string;
  meta?: {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: string | null;
  };
  children?: BackendRoute[];
}

export const usePermissionStore = defineStore("permission", () => {
  // 状态
  const routes = ref<RouteRecordRaw[]>([]);
  const isRoutesAdded = ref<boolean>(false);

  // 转换单个路由
  function transformRoute(backendRoute: BackendRoute): RouteRecordRaw {
    const routeRecord = {
      name: backendRoute.name,
      path: backendRoute.path,
    } as RouteRecordRaw;

    // 只在 redirect 存在时添加
    if (backendRoute.redirect) {
      routeRecord.redirect = backendRoute.redirect;
    }

    // 添加 meta
    if (backendRoute.meta) {
      routeRecord.meta = backendRoute.meta;
    }

    // 处理 component
    if (typeof backendRoute.component === "string") {
      // Layout 组件特殊处理
      if (backendRoute.component === "Layout") {
        routeRecord.component = () => import("../layout/index.vue");
      } else {
        // 其他组件从 views 目录导入
        routeRecord.component = () =>
          import(`../views/${backendRoute.component}.vue`);
      }
    } else {
      routeRecord.component = backendRoute.component;
    }

    // 递归处理 children
    if (backendRoute.children && backendRoute.children.length > 0) {
      routeRecord.children = backendRoute.children.map((child) =>
        transformRoute(child)
      );
    }

    return routeRecord;
  }

  // 转换路由数组
  function transformRoutes(backendRoutes: BackendRoute[]): RouteRecordRaw[] {
    return backendRoutes.map((route) => transformRoute(route));
  }

  // 添加路由到 Vue Router
  function registerRoutes(accessRoutes: BackendRoute[]) {
    if (isRoutesAdded.value) {
      console.warn("路由已添加，跳过重复添加");
      return;
    }

    const transformedRoutes = transformRoutes(accessRoutes);
    routes.value = transformedRoutes;

    // 将路由添加到 Vue Router
    transformedRoutes.forEach((route) => {
      router.addRoute(route);
    });

    isRoutesAdded.value = true;
    console.log("动态路由已添加:", transformedRoutes);
  }

  // 兼容旧方法
  function addRoutes(accessRoutes: BackendRoute[]) {
    registerRoutes(accessRoutes);
  }

  return {
    routes,
    isRoutesAdded,
    transformRoutes,
    registerRoutes,
    addRoutes,
  };
});
