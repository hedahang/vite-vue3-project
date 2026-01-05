import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { getUserInfo } from "../api/login";

// 用户信息类型
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  permissions?: string[];
}

export const useUserStore = defineStore("user", () => {
  // 状态
  const username = ref<string>("");
  const isLoggedIn = ref<boolean>(false);
  const userInfo = ref<UserInfo | null>(null);

  // 计算属性
  const displayName = computed(() => {
    return userInfo.value?.username || username.value || "游客";
  });

  // 方法
  function login(name: string) {
    username.value = name;
    isLoggedIn.value = true;
  }

  function logout() {
    username.value = "";
    isLoggedIn.value = false;
    userInfo.value = null;
  }

  async function getUser() {
    const response = await getUserInfo();
    const { data } = response.data;

    userInfo.value = data;
    username.value = data.username;
    isLoggedIn.value = true;
    return data;
  }

  return {
    username,
    isLoggedIn,
    userInfo,
    displayName,
    login,
    logout,
    getUser,
  };
});
