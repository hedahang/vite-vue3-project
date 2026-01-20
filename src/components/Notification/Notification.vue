<template>
  <div v-if="visible" class="custom-notification" :style="positionStyle">
    <div class="custom-notification__title">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="custom-notification__message">
      <slot name="message">
        <span>{{ message }}</span>
      </slot>
    </div>
    <div
      v-if="showClose"
      class="custom-notification__close-button"
      @click="handleClose"
    >
      ×
    </div>
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
  offset?: number; // 水平方向偏移（left/right）
  verticalOffset?: number; // 垂直方向偏移（top/bottom），用于堆叠
  showClose?: boolean;
  visible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showClose: true,
  title: "",
  message: "",
  position: "top-right",
  offset: 20,
  verticalOffset: undefined, // 如果不提供，则使用 offset（向后兼容）
  visible: false,
});
// 定义 emit
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();
const positionStyle = computed(() => {
  // 垂直偏移：如果提供了 verticalOffset 则使用，否则使用 offset（向后兼容）
  const verticalOffset = props.verticalOffset ?? props.offset;
  // 水平偏移：始终使用 offset
  const horizontalOffset = props.offset;

  if (props.position === "top-right") {
    return {
      top: `${verticalOffset}px`,
      right: `${horizontalOffset}px`,
    };
  } else if (props.position === "top-left") {
    return {
      top: `${verticalOffset}px`,
      left: `${horizontalOffset}px`,
    };
  } else if (props.position === "bottom-right") {
    return {
      bottom: `${verticalOffset}px`,
      right: `${horizontalOffset}px`,
    };
  } else if (props.position === "bottom-left") {
    return {
      bottom: `${verticalOffset}px`,
      left: `${horizontalOffset}px`,
    };
  }
  return {
    top: `${verticalOffset}px`,
    right: `${horizontalOffset}px`,
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
  .custom-notification__title {
    font-weight: 700;
    font-size: 16px;
    color: #303133;
    margin: 0;
  }
  .custom-notification__message {
    font-size: 14px;
    line-height: 21px;
    margin: 6px 0 0;
    color: #606266;
    text-align: justify;
  }
  .custom-notification__close-button {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: #909399;
    font-size: 16px;
  }
}
</style>
