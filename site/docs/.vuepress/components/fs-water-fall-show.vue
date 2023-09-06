<template>
  <div class="waterfall-container">
    <fs-water-fall
      v-model:loading="loading"
      :gap="20"
      :column="6"
      :request="requestData"
      :page-size="20"
    >
      <template #item="{ item }">
        <img :src="item.url" alt="图片" class="image" />
      </template>
    </fs-water-fall>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FsWaterFall, type IImageItem } from 'fanosy';

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

<style scoped>
.waterfall-container {
  width: 100%;
  height: 100%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
