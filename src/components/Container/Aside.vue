<template>
  <aside class="custom-aside" :style="{ width }">
    <slot />
  </aside>
</template>
<script lang="ts">
export default {
  name: "CustomAside",
};
</script>
<script setup lang="ts">
type PropValues = {
  width?: string;
};
withDefaults(defineProps<PropValues>(), {
  width: "300px",
});
</script>

<style lang="scss">
@use "@/assets/styles/mixin.scss" as *;
@include b(aside) {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
