<template>
  <custom-form ref="form" :model="ruleForm" :rules="rules">
    <custom-form-item label="用户名" prop="username">
      <custom-input v-model="ruleForm.username"></custom-input>
    </custom-form-item>
    <custom-form-item label="密码" prop="passwd">
      <custom-input v-model="ruleForm.passwd" type="textarea"></custom-input>
    </custom-form-item>
    <custom-form-item>
      <custom-button type="primary" @click="submitForm()">登录</custom-button>
    </custom-form-item>
  </custom-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "element-plus";
const form = ref<FormInstance>();
const ruleForm = ref({
  username: "",
  passwd: "",
});
const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  passwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const submitForm = () => {
  form.value?.validate((valid) => {
    if (valid) {
      console.log("submit");
    }
  });
};
</script>
