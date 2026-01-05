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
            icon: "system",
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
          ],
        },
      ]);
    },
  },
] as MockMethod[];
