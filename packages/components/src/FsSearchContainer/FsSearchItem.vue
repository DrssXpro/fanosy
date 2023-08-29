<template>
  <div
    :class="ns.b()"
    :style="{ width: `${props.itemWidth}px` }"
    v-if="isVisible"
  >
    <div
      :class="ns.e('label')"
      :style="{
        fontSize: `${props.labelSize}px`,
        color: `${props.labelColor}`
      }"
    >
      {{ props.label }}
    </div>
    <div :class="ns.e('content=')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue';
import { useNameSpace } from '@fanosy/use';
import './style/item.scss';

defineOptions({
  name: 'fs-search-item'
});

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

const ns = useNameSpace('search-item');

const instance = getCurrentInstance() as any;

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
