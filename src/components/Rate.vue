<template>
  <div class="rate" :style="fontstyle">
    <slot></slot>
    <div class="rate-container" @mouseout="mouseOut">
      <div class="rate-item-container">
        <span
          v-for="item in 5"
          :key="item"
          class="rate-item"
          @mouseover="mouseOver(item)"
        >
          ☆
        </span>
      </div>
      <div class="rate-item-container hollow" :style="fontwidth">
        <span
          v-for="num in 5"
          :key="num"
          class="rate-item"
          @mouseover="mouseOver(num)"
          @click="onRate(num)"
          >★</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const emits = defineEmits(["update:modelValue"]);

type ThemeKey =
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "gray"
  | "red"
  | "pink"
  | "brown"
  | "cyan"
  | "lime";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    theme?: ThemeKey;
  }>(),
  {
    theme: "orange",
  }
);

let currentValue = ref(props.modelValue);
// 监听 props.value 的变化，同步更新 currentValue
watch(
  () => props.modelValue,
  (newValue: number) => {
    currentValue.value = newValue;
  }
);
function mouseOver(num: number) {
  currentValue.value = num;
}
function mouseOut() {
  currentValue.value = props.modelValue;
}
function onRate(num: number) {
  console.log("onRate", num);
  emits("update:modelValue", num);
}
const fontwidth = computed(() => `width:${currentValue.value}em;`);
const themeObj: Record<ThemeKey, string> = {
  orange: "#fa541c",
  yellow: "#faad14",
  green: "#52c41a",
  blue: "#1890ff",
  purple: "#722ed1",
  gray: "#858585",
  red: "#f5222d",
  pink: "#eb2f96",
  brown: "#a5673f",
  cyan: "#13c2c2",
  lime: "#a0d911",
};

const fontstyle = computed(() => {
  return {
    color: themeObj[props.theme],
  };
});
</script>
<style scoped lang="scss">
.rate {
  .rate-container {
    position: relative;
    display: inline-block;
    font-size: 24px;
    .rate-item-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .hollow {
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
    }
    .rate-item {
      flex-shrink: 0;
      display: inline-block;
      width: 1em;
      height: 1em;
      line-height: 1;
      text-align: center;
    }
  }
}
</style>
