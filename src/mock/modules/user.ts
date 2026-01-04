import type { MockMethod } from "vite-plugin-mock";

import type { MockResponse, UserInfo } from "../types";
import { createMockResponse } from "../utils";

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
] as MockMethod[];
