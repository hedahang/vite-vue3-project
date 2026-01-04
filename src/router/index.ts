import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

// import { createRouter, createWebHashHistory } from "./grouter";
// interface RouteRecordRaw {
//   path: string;
//   name?: string;
//   component?: any;
// }

const Layout = () => import("../layout/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    name: "Index",
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
      {
        path: "test",
        name: "Test",
        component: () => import("../views/Test.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      hidden: true,
    },
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
