<template>
  <header class="custom-header" :style="{ height }">
    <slot />
  </header>
</template>

<script lang="ts">
export default {
  name: "CustomHeader",
};
</script>
<script setup lang="ts">
interface Props {
  height?: string;
}
withDefaults(defineProps<Props>(), {
  height: "60px",
});
</script>

<style lang="scss">
@use "@/assets/styles/mixin.scss" as *;
@include b(header) {
  padding: $header-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
