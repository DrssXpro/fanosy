<template>
  <div>
    <fs-search-container @search="handleSearch">
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
import { FsSearchContainer, FsSearchItem } from 'fanosy';
import { ElSelect, ElOption, ElInput } from 'element-plus';
// 使用该组件只需引入 button 样式即可，其他根据自己的需求引入
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/input/style/css';
import 'element-plus/es/components/option/style/css';
import 'element-plus/es/components/select/style/css';
const value = ref('');

const handleSearch = () => {
  console.log('search');
};

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

<style scoped></style>
