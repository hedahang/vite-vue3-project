<template>
  <button
    class="custom-button"
    :class="[
      buttonSize ? `custom-button--${buttonSize}` : '',
      type ? `custom-button--${type}` : '',
      buttonRound,
    ]"
  >
    <slot />
  </button>
</template>
<script lang="ts">
export default {
  name: "CustomButton",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { useGlobalConfig } from "@/utils/useGlobalConfig";
interface Props {
  size?: "" | "small" | "medium" | "large";
  type?: "" | "primary" | "success" | "warning" | "danger" | "info";
  round?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  size: "",
  type: "",
  round: false,
});
const globalConfig = useGlobalConfig();
const buttonSize = computed(() => {
  return props.size || globalConfig.size;
});
const buttonRound = computed(() => {
  return props.round ? "is-round" : "";
});
</script>
<style lang="scss">
@use "sass:color";
@use "@/assets/styles/mixin.scss" as *;
@include b(button) {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $button-default-background-color;
  color: $button-default-font-color;
  -webkit-appearance: none;
  text-align: center;
  border: $border-base;
  border-color: $button-default-border-color;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: $button-font-weight;
  & + & {
    margin-left: 10px;
  }
  @include button-size(
    $button-padding-vertical,
    $button-padding-horizontal,
    $button-font-size,
    $button-border-radius
  );
  &:hover,
  &:focus {
    color: $color-primary;
    border-color: color.mix($color-white, $color-primary, $weight: 70%);
    background-color: color.mix($color-white, $color-primary, $weight: 90%);
  }
  @include m(small) {
    @include button-size(
      $button-small-padding-vertical,
      $button-small-padding-horizontal,
      $button-small-font-size,
      $button-small-border-radius
    );
  }
  @include m(medium) {
    @include button-size(
      $button-medium-padding-vertical,
      $button-medium-padding-horizontal,
      $button-medium-font-size,
      $button-medium-border-radius
    );
  }
  @include m(large) {
    @include button-size(
      $button-large-padding-vertical,
      $button-large-padding-horizontal,
      $button-large-font-size,
      $button-large-border-radius
    );
  }
  @include m(primary) {
    @include button-variant(
      $button-primary-font-color,
      $button-primary-background-color,
      $button-primary-border-color
    );
  }
  @include m(success) {
    @include button-variant(
      $button-success-font-color,
      $button-success-background-color,
      $button-success-border-color
    );
  }
  @include m(warning) {
    @include button-variant(
      $button-warning-font-color,
      $button-warning-background-color,
      $button-warning-border-color
    );
  }
  @include m(danger) {
    @include button-variant(
      $button-danger-font-color,
      $button-danger-background-color,
      $button-danger-border-color
    );
  }
  @include m(info) {
    @include button-variant(
      $button-info-font-color,
      $button-info-background-color,
      $button-info-border-color
    );
  }
}
</style>
