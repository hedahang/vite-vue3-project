import type { App } from "vue";

import CustomNotification from "./Notification.vue";

export default {
  install(app: App) {
    app.component(
      CustomNotification.name || "CustomNotification",
      CustomNotification
    );
  },
};
