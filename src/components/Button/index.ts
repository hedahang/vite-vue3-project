import type { App } from "vue";

import CustomButton from "./Button.vue";

export default {
  install(app: App) {
    app.component(CustomButton.name || "CustomButton", CustomButton);
  },
};
