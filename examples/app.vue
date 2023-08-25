<template>
  <div class="test-container">
    <FsBounceCountTo
      v-for="(i, index) in [1, 2, 3, 4]"
      :key="index"
      :delay="index + 1"
      :num="i"
      :font-size="32"
      color="red"
    />
  </div>
</template>

<script setup lang="ts">
import { FsBounceCountTo } from '@fanosy/components';
</script>

<style scoped lang="scss">
.test-container {
  margin: 0 auto;
  width: 90vw;
  height: 90vh;
  border: 1px solid red;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
}

.list-item {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
  font-size: 18px;
  letter-spacing: 0.1em;
}
</style>
