<template>
  <div class="test-container">
    <fs-select-area :gap="20" @chooseArea="handle" />
  </div>
</template>

<script setup lang="ts">
import { FsSelectArea } from '@fanosy/components';
const handle = (res: string[][]) => {
  console.log(res);
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
  height: 100%;
  box-sizing: border-box;
  animation: identifier 0.25s; // 添加动画，使其出现时更加丝滑
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes identifier {
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
