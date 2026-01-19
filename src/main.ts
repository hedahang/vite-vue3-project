import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import type { App as AppType } from "vue";

import App from "./App.vue";
import CustomButton from "./components/Button";
import CustomContainer from "./components/Container";
import CustomForm from "./components/Form";
import CustomNotification from "./components/Notification";

import "element-plus/dist/index.css";

import "./assets/styles/index.scss";
import directives from "./directives";
import router from "./router";
import pinia from "./stores";
import "./permission";

const app: AppType<Element> = createApp(App);

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局配置
app.config.globalProperties.$AILEMENTE = {
  size: "large",
};
// 全局注册组件
app.use(CustomContainer);
app.use(CustomButton);
app.use(CustomForm);
app.use(CustomNotification);
// 全局注册插件
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(directives);
app.mount("#app");
