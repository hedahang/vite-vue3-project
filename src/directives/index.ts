// directives/index.js
import type { App } from "vue";

import debounce from "./debounce/index.ts";
import focus from "./focus/index.ts";
import permission from "./permission/index.ts";

export default {
  install(app: App) {
    app.directive("focus", focus);
    app.directive("permission", permission);
    app.directive("debounce", debounce);
  },
};
