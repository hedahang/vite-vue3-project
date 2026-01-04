import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import type { App as AppType } from "vue";

import "element-plus/dist/index.css";

import "./assets/styles/index.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";

const app: AppType<Element> = createApp(App);

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
