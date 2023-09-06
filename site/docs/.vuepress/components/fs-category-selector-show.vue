<template>
  <div class="category-container" v-loading="loading">
    <fs-category-selector
      v-model:loading="loading"
      :request="requestData"
      @select-category="getSelectResult"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FsCategorySelector, type ICategoryItem } from 'fanosy';
import { templateData1, templateData2, templateData3 } from './categoryData';

const dataSource = [templateData1, templateData2, templateData3];

const loading = ref(false);

const requestData = async (level: number, id: string | number) => {
  const res = await getCategoryData(level, id);
  return {
    data: res,
    success: true
  };
};

const getSelectResult = (
  result: Array<Pick<ICategoryItem, 'id' | 'content' | 'level'>>
) => {
  console.log('拿到选择结果：', result);
};

function getCategoryData(
  level: number,
  id: string | number
): Promise<ICategoryItem[]> {
  const randomTime = Math.floor(Math.random() + 1);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataSource[level - 1] || []);
    }, randomTime * 1000);
  });
}
</script>

<style scoped>
.category-container {
  width: 100%;
  height: 100%;
}
</style>
