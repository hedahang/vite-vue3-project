import { createApp } from "vue";
import type { App as AppType } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/styles/index.scss";
import App from "./App.vue";
import pinia from "./stores";
import router from "./router";

const app: AppType<Element> = createApp(App);

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
