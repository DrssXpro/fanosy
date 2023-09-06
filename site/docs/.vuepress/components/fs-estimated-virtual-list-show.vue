<template>
  <div class="virtuallist-container">
    <fs-estimated-virtual-list
      v-model:loading="loading"
      :data-source="dataSource"
      :estimated-height="60"
      @getMoreData="addData"
    >
      <template #item="{ item }">
        <div class="list-item">{{ item.id }} - {{ item.content }}</div>
      </template>
    </fs-estimated-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FsEstimatedVirtualList } from 'fanosy';
import Mock from 'mockjs';

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
    const newData: Array<{
      id: number;
      content: string;
    }> = [];
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

<style scoped>
.virtuallist-container {
  width: 100%;
  height: 600px;
}
.list-item {
  border: 1px solid #000;
  padding: 10px;
  letter-spacing: 0.1em;
}
</style>
