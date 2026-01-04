import type { MockMethod, Recordable } from "vite-plugin-mock";

import type { MockResponse, LoginResponse } from "../types";
import { createMockResponse } from "../utils";

export default [
  // 用户登录
  {
    url: "/api/auth/login",
    method: "post",
    response: (config: {
      url: Recordable;
      body: Recordable;
      query: Recordable;
      headers: Recordable;
    }): MockResponse<LoginResponse | null> => {
      console.log(config.body);
      const { username } = config.body;
      if (username === "admin") {
        return createMockResponse<LoginResponse>({
          token: "mock-jwt-token-123456",
          userInfo: {
            id: 1,
            username: username,
            email: "admin@example.com",
            avatar: "https://via.placeholder.com/100",
          },
        });
      } else {
        return createMockResponse<LoginResponse | null>(
          null,
          401,
          "用户名或密码错误"
        );
      }
    },
  },
  // 用户登出
  {
    url: "/api/auth/logout",
    method: "post",
    response: (): MockResponse<null> => {
      return createMockResponse<null>(null);
    },
  },
] as MockMethod[];
