<template>
  <div class="test-container" v-loading="loading">
    <FsEstimatedVirtualList
      :data-source="dataSource"
      :estimated-height="60"
      @getMoreData="addData"
      v-model:loading="loading"
    >
      <template #item="{ item }">
        <div class="list-item">{{ item.id }} - {{ item.content }}</div>
      </template>
    </FsEstimatedVirtualList>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Mock from 'mockjs';
import { FsEstimatedVirtualList } from '@fanosy/components';

const dataSource = ref<
  Array<{
    id: number;
    content: string;
  }>
>([]);

const loading = ref(false);

const addData = () => {
  loading.value = true;
  setTimeout(() => {
    const newData = [];
    for (let i = 0; i < 20; i++) {
      const len: number = dataSource.value.length + newData.length;
      newData.push({
        id: len,
        content: Mock.mock('@csentence(40, 100)') // 内容
      });
    }
    dataSource.value = [...dataSource.value, ...newData];
    loading.value = false;
  }, 2000);
};

onMounted(() => {
  addData();
});
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
