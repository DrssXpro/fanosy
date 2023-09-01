<template>
  <div>
    <fs-create-select v-model="select" :options="options"></fs-create-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FsCreateSelect, type ISelectOptions } from 'fanosy';
// 二次封装element-plus: 需手动导入样式或全局导入
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/option/style/css';

const select = ref();

const options: ISelectOptions[] = [
  {
    label: '选项1',
    value: '1'
  },
  {
    label: '选项2',
    value: '2'
  },
  {
    label: '选项3',
    value: '3'
  }
];

watch(
  () => select.value,
  (newValue) => {
    console.log(newValue);
  }
);
</script>

<style scoped></style>
