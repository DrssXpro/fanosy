<template>
  <div class="test-container">
    <fs-search-container>
      <template #search>
        <fs-search-item label="文章搜索1">
          <el-input v-model="value" clearable placeholder="请输入内容" />
        </fs-search-item>
        <fs-search-item label="文章搜索2">
          <el-input v-model="value" clearable />
        </fs-search-item>
        <fs-search-item label="文章搜索3">
          <el-input v-model="value" clearable />
        </fs-search-item>
        <fs-search-item label="文章搜索4">
          <el-input v-model="value" clearable />
        </fs-search-item>
        <fs-search-item label="文章搜索5">
          <el-select v-model="value" placeholder="请选择内容" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </fs-search-item>
      </template>
    </fs-search-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FsSearchContainer, FsSearchItem } from '@fanosy/components';
const value = ref('');

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
];
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
