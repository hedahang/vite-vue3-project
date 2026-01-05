import { getUserRoutes } from "./api/login";
import router from "./router";
import { usePermissionStore } from "./stores/permission";
import { useUserStore } from "./stores/user";
import { getToken } from "./utils/auth";

const whiteList = ["/login", "/register", "/404", "401"];

router.beforeEach(async (to, _from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      next("/");
    } else {
      const userStore = useUserStore();
      const permissionStore = usePermissionStore();

      // 如果用户信息不存在，则获取用户信息和路由
      if (!userStore.userInfo) {
        try {
          const response = await userStore.getUser();
          if (response.id) {
            // 如果路由未添加，则获取并添加路由
            if (!permissionStore.isRoutesAdded) {
              const routesResponse = await getUserRoutes();
              const routesData = routesResponse.data.data;
              permissionStore.registerRoutes(routesData);
              // 路由添加完成后，重新导航到目标路由
              next({ ...to, replace: true });
              return;
            }
          }
        } catch (error) {
          console.error("获取用户信息失败:", error);
        }
      } else {
        // 用户信息存在但路由未添加，则添加路由
        if (!permissionStore.isRoutesAdded) {
          try {
            const routesResponse = await getUserRoutes();
            const routesData = routesResponse.data.data;
            permissionStore.registerRoutes(routesData);
            next({ ...to, replace: true });
            return;
          } catch (error) {
            console.error("获取路由失败:", error);
          }
        }
      }
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
