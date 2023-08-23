<template>
  <div class="test-container">
    <fs-virtual-water-fall
      :request="req"
      :gap="15"
      :column="5"
      v-model:loading="loading"
    >
      <template #item="{ item }">
        <img class="image" :src="item.src" alt="图片" />
      </template>
    </fs-virtual-water-fall>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  FsVirtualWaterFall,
  type FsVirtualWaterfallReuqest
} from '@fanosy/components';

const loading = ref(false);

const req: FsVirtualWaterfallReuqest = async (tpage, size) => {
  // 请求，并传入分页参数
  const rep = await fetch(
    `https://www.vilipix.com/api/v1/picture/public?limit=${size}&sort=hot&offset=${
      --tpage * size
    }`
  );
  // 数据处理
  let {
    data: { rows, count }
  } = await rep.json();
  rows = rows.map((item: any) => ({
    id: item.picture_id,
    width: item.width,
    height: item.height,
    src: item.regular_url + '?x-oss-process=image/resize,w_240/format,jpg'
  }));

  return {
    total: count,
    list: rows
  };
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
  box-sizing: border-box;
  animation: identifier 0.25s; // 添加动画，使其出现时更加丝滑
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
