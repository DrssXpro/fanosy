<template>
  <fs-button type="danger" :time="1000" throttle @click="handleClick"
    >测试</fs-button
  >
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('test');
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
