<template>
  <div class="create-container">
    <div class="line">
      <span>单选：</span>
      <fs-create-select v-model="select1" :options="options"></fs-create-select>
    </div>
    <div class="line">
      <span>多选：</span>
      <fs-create-select
        v-model="select2"
        :options="options"
        multiple
      ></fs-create-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FsCreateSelect, type ISelectOptions } from 'fanosy';
// 二次封装element-plus: 需手动导入样式或全局导入
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/option/style/css';
import 'element-plus/es/components/select/style/css';

const select1 = ref();

const select2 = ref([]);

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
  () => select1.value,
  (newValue) => {
    console.log('单选:', newValue);
  }
);

watch(
  () => select2.value,
  (newValue) => {
    console.log('多选:', newValue);
  }
);
</script>

<style scoped>
.create-container {
  width: 300px;
}

.line {
  margin-bottom: 20px;
}
</style>
