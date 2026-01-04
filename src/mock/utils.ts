import type { MockResponse } from "./types";

export function createMockResponse<T>(
  data: T,
  code = 200,
  message = "success"
): MockResponse<T> {
  return {
    code,
    message,
    data,
  };
}
