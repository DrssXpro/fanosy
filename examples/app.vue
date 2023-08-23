<template>
  <div class="test-container" v-loading="loading">
    <FsWaterFall
      v-model:loading="loading"
      :gap="20"
      :column="6"
      :request="requestData"
      :page-size="20"
    >
      <template #item="{ item }">
        <img :src="item.url" alt="图片" class="image" />
      </template>
    </FsWaterFall>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  FsWaterFall,
  type IImageItem,
  type IWaterfallRequest
} from '@fanosy/components';

const loading = ref(false);

const requestData: IWaterfallRequest = (page, pageSize) => {
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

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
