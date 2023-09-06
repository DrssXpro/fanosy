<template>
  <div class="virtual-container">
    <fs-virtual-water-fall
      v-model:loading="loading"
      :request="req"
      :gap="15"
      :column="5"
    >
      <template #item="{ item }">
        <img class="test-item" :src="item.src" />
      </template>
    </fs-virtual-water-fall>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { FsVirtualWaterFall, type FsVirtualWaterfallReuqest } from 'fanosy';

const loading = ref(false);

const req: FsVirtualWaterfallReuqest = async (tpage, size) => {
  // 请求，并传入分页参数
  const request = await fetch(
    `https://www.vilipix.com/api/v1/picture/public?limit=${size}&sort=hot&offset=${
      --tpage * size
    }`
  );
  // 数据处理
  let {
    data: { rows, count }
  } = await request.json();
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

<style scoped>
.virtual-container {
  width: 100%;
  height: 600px;
}
.test-item {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* 添加动画，使其出现时更加丝滑 */
  animation: identifier 0.25s;
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
