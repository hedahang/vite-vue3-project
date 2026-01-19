<template>
  <div class="custom-form-item">
    <label v-if="label">{{ label }}</label>
    <slot />
    <p v-if="error" class="error">
      {{ error }}
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: "CustomFormItem",
};
</script>
<script setup lang="ts">
import Schema from "async-validator";
import { inject, onMounted, provide, ref } from "vue";
import { formItemKey, key } from "./type.ts";
import type { FormItem } from "./type.ts";
interface Props {
  label?: string;
  prop?: string;
}
const props = withDefaults(defineProps<Props>(), { label: "", prop: "" });
// 错误
const error = ref("");
// 表单数据
const formData = inject(key);

const o: FormItem = {
  validate,
};
//
defineExpose(o);

// 向子组件提供事件处理器，实现事件驱动的验证
provide(formItemKey, {
  onFieldChange: validate,
});

// 表单验证规则
function validate() {
  console.log("validate");
  if (formData?.rules === undefined) {
    return Promise.resolve({ result: true });
  }
  const rules = formData.rules[props.prop];
  // 如果该字段没有验证规则，直接返回成功
  if (rules === undefined) {
    return Promise.resolve({ result: true });
  }
  const value = formData.model[props.prop];
  const schema = new Schema({ [props.prop]: rules });
  return schema.validate({ [props.prop]: value }, (errors) => {
    if (errors && errors.length > 0 && errors[0]) {
      error.value = errors[0].message || "校验错误";
    } else {
      error.value = "";
    }
  });
}
onMounted(() => {
  formData?.addFormItem?.(o);
});
</script>
<style lang="scss">
@use "@/assets/styles/mixin.scss" as *;
@include b(form-item) {
  margin-bottom: 22px;
  label {
    line-height: 1.2;
    margin-bottom: 5px;
    display: inline-block;
  }
  & .el-form-item {
    margin-bottom: 0;
  }
}
.error {
  color: red;
}
</style>
