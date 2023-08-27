<template>
  <div class="test-container">
    <fs-select-area
      @choose-area="handleArea"
      direction="vertical"
      size="small"
    />
  </div>
</template>

<script setup lang="ts">
import { FsSelectArea } from '@fanosy/components';

const handleArea = (area: string[][]) => {
  console.log('checkchoose:', area);
};
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
