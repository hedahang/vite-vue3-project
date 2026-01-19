import type { MockMethod } from "vite-plugin-mock";

import type { MockResponse, UserInfo } from "../types";
import { createMockResponse } from "../utils";

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

export default [
  // 获取用户信息
  {
    url: "/api/user/info",
    method: "get",
    response: (): MockResponse<UserInfo> => {
      return createMockResponse<UserInfo>({
        id: 1,
        username: "admin",
        email: "admin@example.com",
        avatar: "https://via.placeholder.com/100",
        permissions: ["add", "edit", "delete"],
      });
    },
  },
  // 获取用户权限
  {
    url: "/api/user/permissions",
    method: "get",
    response: (): MockResponse<string[]> => {
      return createMockResponse<string[]>(["admin"]);
    },
  },
  // 获取用户路由
  {
    url: "/api/user/routes",
    method: "get",
    response: (): MockResponse<BackendRoute[]> => {
      return createMockResponse<BackendRoute[]>([
        {
          name: "System",
          path: "/system",
          component: "Layout",
          redirect: "/system/test",
          meta: {
            title: "系统管理",
            icon: "Histogram",
            noCache: false,
            link: null,
          },
          children: [
            {
              name: "Test",
              path: "test",
              component: "Test",
              meta: {
                title: "测试管理",
                icon: "system",
                noCache: false,
                link: null,
              },
            },
            {
              name: "User",
              path: "user",
              component: "System/User/index",
              meta: {
                title: "用户管理",
                icon: "system",
                noCache: false,
                link: null,
              },
            },
          ],
        },
        {
          name: "Demo",
          path: "/demo",
          component: "Layout",
          redirect: "/demo/chart",
          meta: {
            title: "示例管理",
            icon: "MessageBox",
            noCache: false,
            link: null,
          },
          children: [
            {
              name: "ChartDemo",
              path: "/demo/chart",
              component: "Demo/demo3",
              meta: {
                title: "图表展示",
                icon: "DataAnalysis",
                noCache: false,
                link: null,
              },
            },
            {
              name: "FocusDemo",
              path: "/demo/focus",
              component: "Demo/Demo4",
              meta: {
                title: "指令封装",
                icon: "system",
                noCache: false,
                link: null,
              },
            },
            {
              name: "ComponentDemo",
              path: "/demo/component",
              component: "Demo/Demo5",
              meta: {
                title: "组件封装",
                icon: "system",
                noCache: false,
                link: null,
              },
            },
            {
              name: "FormDemo",
              path: "/demo/form",
              component: "Demo/Demo6",
              meta: {
                title: "表单验证",
                icon: "system",
                noCache: false,
                link: null,
              },
            },
          ],
        },
      ]);
    },
  },
] as MockMethod[];
