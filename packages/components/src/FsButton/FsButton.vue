<template>
  <el-button :="$attrs" @click="handleBtnClick">
    <!-- 默认插槽 -->
    <slot />
    <!-- 自定义加载中插槽 -->
    <template #loading v-if="$slots.loading">
      <slot name="loading" />
    </template>
    <!-- 自定义图标插槽 -->
    <template #icon v-if="$slots.icon">
      <slot name="icon" />
    </template>
  </el-button>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';
import {
  debounce as debounceToolFn,
  throttle as throttleToolFn
} from '@fanosy/utils';

defineOptions({
  name: 'fs-button'
});

const props = withDefaults(
  defineProps<{
    time: number;
    debounce?: boolean;
    throttle?: boolean;
  }>(),
  {
    debounce: false,
    throttle: false
  }
);

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const handleBtnClick = props.debounce
  ? debounceToolFn((e: MouseEvent) => emit('click', e), props.time)
  : props.throttle
  ? throttleToolFn((e: MouseEvent) => emit('click', e), props.time)
  : (e: MouseEvent) => emit('click', e);
</script>
