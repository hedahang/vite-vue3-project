<template>
  <custom-container>
    <custom-header>Header</custom-header>
    <custom-main>
      <custom-button>Button</custom-button>
      <custom-button type="primary" round>Button</custom-button>
      <custom-button type="primary">Button</custom-button>
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
</template>
<script setup lang="ts"></script>
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
