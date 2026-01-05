// directives/permission.js
import type { Directive, DirectiveBinding } from "vue";

import { useUserStore } from "../../stores/user";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding; // ['add', 'edit']
    const userStore = useUserStore();
    const permissions = userStore.userInfo?.permissions || [];
    if (!permissions.includes(value)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
} as Directive<HTMLElement>;
