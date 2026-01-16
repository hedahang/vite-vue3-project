import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { setActivePinia, createPinia } from "pinia";

// Mock request 模块以避免 import.meta 问题
jest.mock("../../../src/utils/request", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

// Mock API 模块
jest.mock("../../../src/api/login", () => ({
  getUserInfo: jest.fn(),
}));

import { useUserStore } from "../../../src/stores/user";

describe("useUserStore 测试", () => {
  beforeEach(() => {
    // 在每个测试前创建一个新的 pinia 实例
    setActivePinia(createPinia());
  });

  it("应该正确初始化状态", () => {
    const store = useUserStore();

    expect(store.username).toBe("");
    expect(store.isLoggedIn).toBe(false);
    expect(store.userInfo).toBe(null);
  });

  it("应该正确计算 displayName", () => {
    const store = useUserStore();

    // 初始状态应该显示"游客"
    expect(store.displayName).toBe("游客");

    // 设置 username 后应该显示 username
    store.username = "testuser";
    expect(store.displayName).toBe("testuser");

    // 设置 userInfo 后应该显示 userInfo.username
    store.userInfo = {
      id: 1,
      username: "admin",
      email: "admin@example.com",
    };
    expect(store.displayName).toBe("admin");
  });

  it("login 方法应该正确更新状态", () => {
    const store = useUserStore();

    store.login("testuser");

    expect(store.username).toBe("testuser");
    expect(store.isLoggedIn).toBe(true);
  });

  it("logout 方法应该正确重置状态", () => {
    const store = useUserStore();

    // 先登录
    store.login("testuser");
    store.userInfo = {
      id: 1,
      username: "testuser",
      email: "test@example.com",
    };

    // 然后登出
    store.logout();

    expect(store.username).toBe("");
    expect(store.isLoggedIn).toBe(false);
    expect(store.userInfo).toBe(null);
  });
});
