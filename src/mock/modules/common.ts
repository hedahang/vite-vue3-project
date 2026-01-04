import type { MockMethod } from "vite-plugin-mock";

import type { MockResponse } from "../types";
import { createMockResponse } from "../utils";

export default [
  // 健康检查
  {
    url: "/api/health",
    method: "get",
    response: (): MockResponse<{ status: string }> => {
      return createMockResponse<{ status: string }>({
        status: "ok",
      });
    },
  },
] as MockMethod[];
