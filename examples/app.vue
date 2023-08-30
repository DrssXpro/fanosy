<template>
  <div class="test-container">
    <fs-water-fall
      v-model:loading="loading"
      :gap="20"
      :column="6"
      :request="requestData"
      :page-size="20"
    >
      <template #item="{ item }">
        <el-image :src="item.url" alt="图片" class="image" lazy></el-image>
      </template>
    </fs-water-fall>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IImageItem } from '@fanosy/components';

const loading = ref(false);

const requestData = (page: number, pageSize: number): Promise<IImageItem[]> => {
  return new Promise<IImageItem[]>((resolve) => {
    fetch(
      `https://blogback.fasyncsy.com.cn/vilipix/ranking?${pageSize}=30&page=${page}`
    ).then(async (res) => {
      const result = await res.json();
      const imageList: IImageItem[] = result.data.rows.map((i: any) => ({
        id: i.picture_id,
        url: i.original_url,
        height: i.height,
        width: i.width
      }));
      resolve(imageList);
    });
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
