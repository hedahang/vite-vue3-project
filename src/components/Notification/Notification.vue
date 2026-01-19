<template>
  <div v-if="visible" class="custom-notification" :style="positionStyle">
    <div class="custom-nofication__title">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="custom-nofication__message">
      <slot name="message">
        <span>{{ message }}</span>
      </slot>
    </div>
    <button
      v-if="showClose"
      class="custom-nofication__close-button"
      @click="handleClose"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "CustomNotification",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  title?: string;
  message?: string;
  position?: string;
  offset?: number;
  showClose?: boolean;
  visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showClose: true,
  title: "",
  message: "",
  position: "top-right",
  offset: 20,
  visible: false,
});
// 定义 emit
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();
const positionStyle = computed(() => {
  if (props.position === "top-right") {
    return {
      top: `${props.offset}px`,
      right: `${props.offset}px`,
    };
  } else if (props.position === "top-left") {
    return {
      top: `${props.offset}px`,
      left: `${props.offset}px`,
    };
  } else if (props.position === "bottom-right") {
    return {
      bottom: `${props.offset}px`,
      right: `${props.offset}px`,
    };
  } else if (props.position === "bottom-left") {
    return {
      bottom: `${props.offset}px`,
      left: `${props.offset}px`,
    };
  }
  return {
    top: `${props.offset}px`,
    right: `${props.offset}px`,
  };
});
const handleClose = () => {
  emit("update:visible", false); // ✅ 通过 emit 更新
};
</script>
<style lang="scss">
.custom-notification {
  position: fixed;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .custom-nofication__close-button {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
</style>
