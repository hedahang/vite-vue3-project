import type { App as AppType } from "vue";

import CustomAside from "./Aside.vue";
import CustomContainer from "./Container.vue";
import CustomFooter from "./Footer.vue";
import CustomHeader from "./Header.vue";
import CustomMain from "./Main.vue";

// console.log(CustomHeader);
export default {
  install(app: AppType) {
    app.component("CustomContainer", CustomContainer);
    app.component("CustomHeader", CustomHeader);
    app.component("CustomFooter", CustomFooter);
    app.component("CustomAside", CustomAside);
    app.component("CustomMain", CustomMain);
  },
};
