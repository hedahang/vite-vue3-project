<template>
  <component :is="comp"></component>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter } from "../grouter/index";

let router = useRouter();
const comp = ref(null);

watch(
  () => router.current.value,
  async () => {
    const route = router.routes.find(
      (route) => route.path === router.current.value
    );
    if (route && route.component) {
      const module = await route.component();
      comp.value = module.default || module;
    } else {
      comp.value = null;
    }
  },
  { immediate: true }
);
</script>
