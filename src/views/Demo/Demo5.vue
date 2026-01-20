<template>
  <custom-container>
    <custom-header>Header</custom-header>
    <custom-main>
      <custom-button>Button</custom-button>
      <custom-button type="primary" round @click="handleOpenNotify"
        >通知</custom-button
      >
      <custom-button type="primary" @click="handleOpenDialog"
        >弹框</custom-button
      >
      <custom-button type="success">Button</custom-button>
      <custom-button type="warning">Button</custom-button>
      <custom-button type="danger" size="medium">Button</custom-button>
      <custom-button type="info" size="small">Button</custom-button>
    </custom-main>
    <custom-footer>Footer</custom-footer>
  </custom-container>
  <hr />

  <custom-container>
    <custom-header>Header</custom-header>
    <custom-container>
      <custom-aside width="200px">Aside</custom-aside>
      <custom-main>Main</custom-main>
    </custom-container>
  </custom-container>
  <hr />
  <custom-container>
    <custom-aside width="200px">Aside</custom-aside>
    <custom-container>
      <custom-header>Header</custom-header>
      <custom-main>Main</custom-main>
      <custom-footer>Footer</custom-footer>
    </custom-container>
  </custom-container>
  <custom-notification
    v-model:visible="notifyVisible"
    position="top-tight"
    title="提示"
    message="这是一段信息"
  />
  <custom-dialog
    v-model:visible="dialogVisible"
    append-to-body
    title="提示"
    width="30%"
  >
    <span>这是一段信息</span>
  </custom-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
const notifyVisible = ref(false);
const dialogVisible = ref(false);
const handleOpenNotify = () => {
  notifyVisible.value = true;
};
const handleOpenDialog = () => {
  dialogVisible.value = true;
};
</script>
<style lang="scss">
.custom-header,
.custom-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.custom-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.custom-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
