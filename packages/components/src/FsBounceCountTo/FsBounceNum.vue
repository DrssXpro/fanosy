<template>
  <div class="fs-bounce-countTo" :style="computedStyle">
    <ul ref="ulRef" class="fs-bounce-countTo-list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>0</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import type { IBounceCountToProps } from './types';

const props = withDefaults(defineProps<IBounceCountToProps>(), {
  fontSize: 14,
  color: '#000',
  rockSpeed: 500
});

const computedStyle = computed<CSSProperties>(() => ({
  fontSize: `${props.fontSize}px`,
  color: props.color,
  width: `${props.fontSize * 0.8}px`,
  height: `${Math.min(20, props.fontSize) * 2.2}px`,
  lineHeight: `${Math.min(20, props.fontSize) * 2.2}px`,
  textAlign: 'center',
  overflow: 'hidden',
  // 绑定自定义属性
  '--speed': `${props.rockSpeed}ms`,
  '--delay': `${props.delay}s`,
  '--num': `${props.num}`
}));
</script>
