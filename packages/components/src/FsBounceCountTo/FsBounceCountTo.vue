<template>
  <div class="fs-bounce-count-to">
    <fs-bounce-num
      v-for="(i, index) in numSplit"
      :key="index"
      :delay="index + props.delay"
      :num="i"
      :font-size="props.fontSize"
      :color="props.color"
      :rock-speed="props.rockSpeed"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FsBounceNum from './FsBounceNum.vue';
import { IBounceCountToProps } from './types';
import './style/index.scss';

const props = withDefaults(defineProps<IBounceCountToProps>(), {
  fontSize: 14,
  color: '#000',
  rockSpeed: 500
});

const numSplit = computed(() =>
  props.num
    .toString()
    .split('')
    .map((i) => parseInt(i))
);
</script>
