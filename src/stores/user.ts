import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  // 状态
  const username = ref<string>("");
  const isLoggedIn = ref<boolean>(false);

  // 计算属性
  const displayName = computed(() => {
    return username.value || "游客";
  });

  // 方法
  function login(name: string) {
    username.value = name;
    isLoggedIn.value = true;
  }

  function logout() {
    username.value = "";
    isLoggedIn.value = false;
  }

  return {
    username,
    isLoggedIn,
    displayName,
    login,
    logout,
  };
});
