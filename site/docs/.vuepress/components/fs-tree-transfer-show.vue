<template>
  <div class="container">
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
import { FsTreeTransfer, type ICheckItem } from 'fanosy';
// 二次封装element-plus: 需手动导入样式或全局导入
import 'element-plus/es/components/tree/style/css';
import 'element-plus/es/components/checkbox/style/css';
import 'element-plus/es/components/checkbox-group/style/css';
import 'element-plus/es/components/button/style/css';
import 'element-plus/es/components/input/style/css';
const TreeData = [
  {
    id: 1,
    label: '1-节点1',
    disabled: false,
    isActive: false,
    children: [
      {
        id: 2,
        label: '2-节点1',
        disabled: false,
        parentId: 1,
        isActive: false
      },
      {
        id: 3,
        label: '2-节点2',
        disabled: false,
        parentId: 1,
        isActive: false
      },
      {
        id: 4,
        label: '2-节点3',
        disabled: false,
        parentId: 1,
        isActive: false
      }
    ]
  },
  {
    id: 5,
    label: '1-节点2',
    disabled: false,
    isActive: false
  },
  {
    id: 6,
    label: '1-节点3',
    disabled: false,
    isActive: false,
    children: [
      {
        id: 7,
        label: '2-节点1',
        disabled: false,
        isActive: false,
        parentId: 6,
        children: [
          {
            id: 8,
            label: '3-节点1',
            disabled: false,
            isActive: false,
            parentId: 7
          },
          {
            id: 9,
            label: '3-节点2',
            disabled: false,
            isActive: false,
            parentId: 7
          }
        ]
      },
      {
        id: 10,
        label: '2-节点2',
        disabled: false,
        isActive: false,
        parentId: 6,
        children: [
          {
            id: 11,
            label: '3-节点1',
            disabled: false,
            isActive: false,
            parentId: 10
          },
          {
            id: 12,
            label: '3-节点2',
            disabled: false,
            isActive: false,
            parentId: 10
          }
        ]
      }
    ]
  }
];

const handleSelect = (items: ICheckItem[]) => {
  console.log('选项:', items);
};
</script>

<style scoped>
.container {
  width: 500px;
}
</style>
