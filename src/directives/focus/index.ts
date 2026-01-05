/**
 * 自定义指令：实现输入框自动聚焦
 */
import type { Directive } from "vue";
export default {
  mounted(el: HTMLElement) {
    el.focus();
  },
} as Directive<HTMLElement>;
