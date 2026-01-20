<template>
  <teleport v-if="visible" :disabled="!appendToBody" to="body">
    <div class="custom-dialog" @click="handleClose">
      <div class="custom-dialog__content" @click.stop>
        <slot />
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
export default {
  name: "CustomDialog",
};
</script>
<script setup lang="ts">
interface Props {
  visible?: boolean;
  title?: string;
  width?: string;
  appendToBody?: boolean;
}
withDefaults(defineProps<Props>(), {
  visible: false,
  title: "",
  width: "800px",
  appendToBody: true,
});
// 定义 emit
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();
const handleClose = () => {
  emit("update:visible", false);
};
</script>
<style>
.custom-dialog {
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.custom-dialog__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 800px;
  height: 400px;
  padding: 5px;
}
iframe {
  width: 600px;
  height: 300px;
}
</style>
