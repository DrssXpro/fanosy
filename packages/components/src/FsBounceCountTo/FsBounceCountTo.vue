<template>
  <div :class="ns.b()">
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
import { useNameSpace } from '@fanosy/use';
import { IBounceCountToProps } from './types';
import './style/index.scss';

defineOptions({
  name: 'fs-bounce-count-to'
});

const props = withDefaults(defineProps<IBounceCountToProps>(), {
  fontSize: 14,
  color: '#000',
  rockSpeed: 500
});

const ns = useNameSpace('bounce-count-to');

const numSplit = computed(() =>
  props.num
    .toString()
    .split('')
    .map((i) => parseInt(i))
);
</script>
