import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import type { App as AppType } from "vue";

import Container from "./components/Container";

import "element-plus/dist/index.css";

import "./assets/styles/index.scss";
import App from "./App.vue";
import directives from "./directives";
import router from "./router";
import pinia from "./stores";
import "./permission";

const app: AppType<Element> = createApp(App);

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(directives);
app.use(Container);
app.mount("#app");
