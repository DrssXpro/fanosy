<template>
  <div class="test-container">
    <el-button @click="handleShow" type="primary">change</el-button>
  </div>
</template>

<script setup lang="ts">
import { FsMessageBox } from '@fanosy/components';

const handleShow = () => {
  FsMessageBox({
    title: '测试',
    content: '这是一个测试框'
  })
    .then(() => {
      console.log('确认');
    })
    .catch(() => {
      console.log('取消');
    });
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
