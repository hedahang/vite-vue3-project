<template>
  <div class="custom-form">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: "CustomForm",
};
</script>
<script setup lang="ts">
import { ref, provide } from "vue";
import type { Rules } from "async-validator";
import { key } from "./type.ts";
import type { FormItem, ValidateCallback } from "./type.ts";

const props = defineProps<{
  model: { type: Object; required: true };
  rules: { type: Rules };
}>();

const items = ref<FormItem[]>([]);

provide(key, {
  model: props.model,
  rules: props.rules,
  addFormItem: (item: FormItem) => {
    items.value.push(item);
  },
});

function validate(callback: ValidateCallback) {
  const promises = items.value.map((item) => item.validate());
  Promise.all(promises)
    .then((results) => {
      const isValid = results.every((result) => !result.errors);
      callback(isValid);
    })
    .catch(() => {
      callback(false);
    });
}
defineExpose({
  validate,
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/mixin.scss" as *;
@include b(form) {
  margin-top: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 300px;
}
</style>
