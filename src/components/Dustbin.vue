<template>
  <div class="dustbin" ref="dustbinRef">
    <div class="dustbin-icon">🗑</div>
    <div class="dustbin-text">
      <span>垃圾桶</span>
    </div>
    <!-- 动画元素 -->
    <div class="animate-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div v-show="animate.show" class="animation-element">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M6 20h12v-2H6v2zm6-18l-4 4H7v2h3l4 4v1h2v-1l4-4h3V4h-3L16 0H8zM4 18h16v-2H4v2z"
              fill="currentColor"
            />
          </svg>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const emit = defineEmits<{
  deleteComplete: [];
}>();

const dustbinRef = ref<HTMLElement | null>(null);

// 动画控制状态
const animate = reactive({
  show: false,
  el: null as HTMLElement | null,
});

// 触发动画的方法
function triggerAnimation(clickedElement: HTMLElement) {
  animate.el = clickedElement;
  animate.show = true;
}

// beforeEnter 钩子：将动画元素移动到点击元素的位置
function beforeEnter(el: Element) {
  if (!animate.el || !dustbinRef.value) return;

  const element = el as HTMLElement;
  const clickedRect = animate.el.getBoundingClientRect();
  const dustbinRect = dustbinRef.value.getBoundingClientRect();

  // 设置动画元素的初始位置为垃圾桶位置
  element.style.left = `${dustbinRect.left + dustbinRect.width / 2}px`;
  element.style.top = `${dustbinRect.top + dustbinRect.height / 2}px`;

  // 计算从垃圾桶位置到点击位置的偏移量
  const x =
    clickedRect.left +
    clickedRect.width / 2 -
    (dustbinRect.left + dustbinRect.width / 2);
  const y =
    clickedRect.top +
    clickedRect.height / 2 -
    (dustbinRect.top + dustbinRect.height / 2);

  // 使用 translate 将元素移动到点击位置
  element.style.transform = `translate(${x}px, ${y}px)`;
  element.style.opacity = "1";
}

// enter 钩子：将动画元素移动到垃圾桶位置（初始位置）
function enter(el: Element, done: () => void) {
  const element = el as HTMLElement;

  // 触发重排，确保 beforeEnter 的样式已应用
  void document.body.offsetHeight;

  // 设置过渡动画，移动到初始位置（translate(0, 0)）
  element.style.transform = "translate(0, 0)";
  element.style.opacity = "0";

  // 监听过渡结束事件
  element.addEventListener("transitionend", done, { once: true });
}

// afterEnter 钩子：动画结束后隐藏元素并通知父组件
function afterEnter(el: Element) {
  const element = el as HTMLElement;
  animate.show = false;
  element.style.display = "none";
  emit("deleteComplete");
}

// 暴露方法供外部调用
defineExpose({
  triggerAnimation,
});
</script>

<style scoped lang="scss">
.dustbin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.dustbin-icon {
  width: 48px;
  height: 48px;
  color: #666;

  svg {
    width: 100%;
    height: 100%;
  }
}

.dustbin-text {
  font-size: 0.875rem;
  color: #666;
}

.animate-wrap {
  .animation-element {
    position: fixed;
    z-index: 100;
    pointer-events: none;
    color: #ff4d4f;
    width: 24px;
    height: 24px;
    transition: all 0.5s linear;
    transform-origin: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
