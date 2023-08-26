<template>
  <div class="test-container">
    <fs-category-selector
      :request="requestData"
      @select-category="getSelectResult"
    />
  </div>
</template>

<script setup lang="ts">
import { FsCategorySelector, type ICategoryItem } from '@fanosy/components';
import { templateData1, templateData2, templateData3 } from './categoryData';

const dataSource = [templateData1, templateData2, templateData3];

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
