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

const value = ref('');
</script>

<style scoped lang="scss">
.test-container {
  margin: 0 auto;
  width: 90vw;
  height: 90vh;
  border: 1px solid red;
  box-sizing: border-box;
  padding: 10px;
  .box {
    width: 100%;
    height: 300px;
    border: 1px solid black;
  }
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
