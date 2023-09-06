<template>
  <div class="count-container">
    <fs-bounce-count-to :num="1234" :delay="1" :font-size="25" color="#f00" />
  </div>
</template>

<script setup lang="ts">
import { FsBounceCountTo } from 'fanosy';
</script>

<style>
.count-container {
  width: 100%;
  height: 100%;
}
</style>
