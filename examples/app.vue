<template>
  <div class="test-container">
    <fs-tree-transfer
      :data-source="TreeData"
      :title="['全部类目', '已选类目']"
      placeholder="请输入，支持模糊查询"
      divider="/"
      @select-value="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { TreeData } from './treeData';
import { FsTreeTransfer, type ICheckItem } from '@fanosy/components';

const handleSelect = (items: ICheckItem[]) => {
  console.log('选项:', items);
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
  box-sizing: border-box;
  border: 1px solid #000;
  text-align: center;
  font-size: 18px;
  letter-spacing: 0.1em;
}
</style>
