<template>
  <fs-button type="primary" :time="1000" throttle @click="handleClick"
    >click me
  </fs-button>
</template>

<script setup lang="ts">
import { FsButton } from 'fanosy';
const handleClick = () => {
  console.log('点击事件');
};
</script>
