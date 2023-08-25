<template>
  <div class="test-container">
    <FsBounceCountTo
      :num="1236"
      :font-size="32"
      color="red"
      :delay="2"
      :rock-speed="500"
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
