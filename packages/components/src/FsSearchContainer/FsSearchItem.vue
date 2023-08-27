<template>
  <div
    class="fs-search-item"
    :style="{ width: `${props.itemWidth}px` }"
    v-if="isVisible"
  >
    <div
      class="fs-search-item_label"
      :style="{
        fontSize: `${props.labelSize}px`,
        color: `${props.labelColor}`
      }"
    >
      {{ props.label }}
    </div>
    <div class="fs-search-item_content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import './style/item.scss';
const instance = getCurrentInstance() as any;
const props = withDefaults(
  defineProps<{
    label?: string;
    labelColor?: string;
    labelSize?: number;
    itemWidth?: number;
  }>(),
  {
    label: '',
    labelColor: '#242F57',
    labelSize: 12,
    itemWidth: 230
  }
);

const isVisible = ref(true);

const show = () => (isVisible.value = true);
const hidden = () => (isVisible.value = false);

if (instance) {
  const parent = instance.parent;
  if (!parent.controlItem) {
    parent.controlItem = [{ show, hidden }];
  } else {
    parent.controlItem.push({ show, hidden });
  }
}
</script>
