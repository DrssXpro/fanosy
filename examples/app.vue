<template>
  <div class="test-container" v-loading="state.loading">
    <fs-virtual-list
      :data-source="state.dataSource"
      :item-height="100"
      @getMoreData="handleGetMoreData"
    >
      <template #item="{ item }">
        <div class="list-item">{{ item.id }}</div>
      </template>
    </fs-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { FsVirtualList } from '@fanosy/components';

const state = reactive({
  dataSource: [] as Array<{ id: number }>,
  loading: false
});

onMounted(() => {
  addData();
});

const handleGetMoreData = () => {
  addData();
};

const addData = () => {
  if (state.loading) return;
  state.loading = true;
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      const len = state.dataSource.length;
      state.dataSource.push({
        id: len + 1
      });
    }
    state.loading = false;
  }, 2000);
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
  height: 100px;
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
}
</style>
