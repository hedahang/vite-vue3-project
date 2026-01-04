import { ref, inject, type Ref } from "vue";
import type { App } from "vue";

import RouterLink from "./RouterILink.vue";
import RouterView from "./RouterView.vue";

const ROUTER_KEY = "__router__";

interface RouteRecordRaw {
  path: string;
  name?: string;
  component?: unknown;
}

interface History {
  bingEvents: (_fn: () => void) => void;
  url: string;
}

interface RouterOptions {
  history: History;
  routes: RouteRecordRaw[];
}

function createRouter(options: RouterOptions) {
  return new Router(options);
}

function useRouter() {
  return inject<Router>(ROUTER_KEY);
}

function createWebHashHistory() {
  function bingEvents(_fn: () => void) {
    window.addEventListener("hashchange", _fn);
  }
  return {
    bingEvents,
    url: window.location.hash.slice(1) || "/",
  };
}

class Router {
  history: History;
  routes: RouteRecordRaw[];
  current: Ref<string>;

  constructor(options: RouterOptions) {
    console.log(options);
    this.history = options.history;
    this.routes = options.routes;
    this.current = ref(this.history.url);
    this.history.bingEvents(() => {
      this.current.value = window.location.hash.slice(1) || "/";
    });
  }

  install(app: App) {
    app.provide(ROUTER_KEY, this);
    app.component("RouterView", RouterView);
    app.component("RouterLink", RouterLink);
  }
}

export { createRouter, useRouter, createWebHashHistory };
