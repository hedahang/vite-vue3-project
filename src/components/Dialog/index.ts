import type { App } from "vue";

import CustomDialog from "./Dialog.vue";

export default {
  install(app: App) {
    app.component(CustomDialog.name || "CustomDialog", CustomDialog);
  },
};
