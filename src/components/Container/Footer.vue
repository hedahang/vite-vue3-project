<template>
  <footer class="custom-footer" :style="{ height }">
    <slot />
  </footer>
</template>

<script lang="ts">
export default {
  name: "CustomFooter",
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

.custom-footer {
  padding: $footer-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
