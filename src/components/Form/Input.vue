<template>
  <div>
    <input :value="modelValue" class="custom-input--inner" @input="onInput" />
  </div>
</template>
<script lang="ts">
export default {
  name: "CustomInput",
};
</script>
<script setup lang="ts">
import { inject } from "vue";
import { formItemKey } from "./type.ts";
import type { FormItemContext } from "./type.ts";

defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// 获取 FormItem 提供的事件处理器
const formItemContext = inject<FormItemContext>(formItemKey);

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  // 先更新 modelValue（保持 v-model 功能）
  emit("update:modelValue", value);
  // 然后触发验证（事件驱动）
  formItemContext?.onFieldChange?.();
};
</script>
<style lang="scss">
@use "@/assets/styles/mixin.scss" as *;
@include b(input) {
  @include m(inner) {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
</style>
