// directives/debounce.ts
import type { DirectiveBinding } from "vue";

interface DebounceEl extends HTMLElement {
  __debounceHandler__?: EventListener;
  __debounceTimer__?: number | null;
  __debounceFromInner__?: boolean;
}

export default {
  mounted(el: DebounceEl, binding: DirectiveBinding) {
    const delay = Number(binding.value) || 300;
    const eventType = binding.arg || "click";
    const immediate = binding.modifiers.immediate;

    const handler = (e: Event) => {
      // 内部派发的事件直接放行
      if (el.__debounceFromInner__) return;

      // 拦截用户真实事件
      e.preventDefault();
      e.stopImmediatePropagation();

      // immediate：第一次立即执行
      if (immediate && !el.__debounceTimer__) {
        el.__debounceFromInner__ = true;
        el.dispatchEvent(new Event(eventType, { bubbles: true }));
        el.__debounceFromInner__ = false;
      }

      // 重置定时器
      if (el.__debounceTimer__) {
        clearTimeout(el.__debounceTimer__);
      }

      el.__debounceTimer__ = window.setTimeout(() => {
        if (!immediate) {
          el.__debounceFromInner__ = true;
          el.dispatchEvent(new Event(eventType, { bubbles: true }));
          el.__debounceFromInner__ = false;
        }
        el.__debounceTimer__ = null;
      }, delay);
    };

    el.__debounceHandler__ = handler;
    el.addEventListener(eventType, handler, true);
  },

  beforeUnmount(el: DebounceEl, binding: DirectiveBinding) {
    const eventType = binding.arg || "click";

    // ✅ 1. 移除事件监听
    if (el.__debounceHandler__) {
      el.removeEventListener(eventType, el.__debounceHandler__, true);
    }

    // ✅ 2. 清理定时器（关键）
    if (el.__debounceTimer__) {
      clearTimeout(el.__debounceTimer__);
      el.__debounceTimer__ = null;
    }

    // ✅ 3. 清空引用（防止闭包残留）
    delete el.__debounceHandler__;
    delete el.__debounceFromInner__;
  },
};
