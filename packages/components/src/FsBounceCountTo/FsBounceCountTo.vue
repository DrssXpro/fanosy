<template>
  <div class="fs-bounce-countTo" :style="computedStyle" ref="countRef">
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
import './style/index.scss';

const props = withDefaults(defineProps<IBounceCountToProps>(), {
  fontSize: 14,
  color: '#000',
  rockSpeed: 500
});

const computedStyle = computed<CSSProperties>(() => ({
  fontSize: `${props.fontSize}px`,
  color: props.color,
  width: `${Math.min(20, props.fontSize)}px`,
  height: `${Math.min(20, props.fontSize) * 1.8}px`,
  lineHeight: `${Math.min(20, props.fontSize) * 1.8}px`,
  textAlign: 'center',
  overflow: 'hidden',
  // 绑定自定义属性
  '--speed': `${props.rockSpeed}ms`,
  '--delay': `${props.delay}s`,
  '--num': `${props.num}`
}));
</script>
