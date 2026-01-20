import type { App } from "vue";

import Notification from "./Notification";
import CustomNotification from "./Notification.vue";

export default {
  install(app: App) {
    app.component(
      CustomNotification.name || "CustomNotification",
      CustomNotification
    );
    // 将动态方法挂载到全局属性
    app.config.globalProperties.$notification = Notification;
  },
};

// 导出组件
export { default as CustomNotification } from "./Notification.vue";

// 导出动态方法和类型
export { default as Notification } from "./Notification";
export type { NotificationOptions, NotificationInstance } from "./Notification";
