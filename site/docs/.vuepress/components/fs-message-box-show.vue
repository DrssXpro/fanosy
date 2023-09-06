<template>
  <button @click="handleShowBox1">show box1</button>
  <button @click="handleShowBox2">show box2</button>
</template>

<script setup lang="ts">
import { FsMessageBox } from 'fanosy';

const handleShowBox1 = () => {
  FsMessageBox({
    title: 'message box',
    content: '这是 message box content'
  })
    .then(() => {
      alert('确认');
    })
    .catch(() => {
      alert('取消');
    });
};

const handleShowBox2 = () => {
  FsMessageBox({
    title: 'message box',
    content: '延迟2s关闭',
    beforeClose: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      })
  });
};
</script>
