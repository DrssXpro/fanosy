<template>
  <div>
    <fs-select-area @choose-area="handleChooseResult" :gap="20" />
  </div>
</template>

<script setup lang="ts">
import { FsSelectArea } from 'fanosy';
// 二次封装element-plus: 需手动导入样式或全局导入
import 'element-plus/es/components/option/style/css';
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/space/style/css';
const handleChooseResult = (res: string[][]) => {
  console.log('查看结果:', res);
};
</script>

<style scoped></style>
