<template>
  <div class="table-container">
    <button @click="handleSelect">全选</button>
    <fs-table :data="tableData" :columns="columns" ref="fsTableRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FsTable, type IFsTableColumn } from 'fanosy';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/pagination/style/css';

interface IData {
  date: string;
  name: string;
  address: string;
}

const fsTableRef = ref<any>();

const handleSelect = () => {
  fsTableRef.value.ElTableInstance.toggleAllSelection();
};

const tableData: IData[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];

const columns: IFsTableColumn[] = [
  {
    prop: 'date',
    columnKey: 'date',
    label: '日期'
  },
  {
    prop: 'name',
    columnKey: 'name',
    label: '名字'
  },
  {
    prop: 'address',
    columnKey: 'address',
    label: '地址',
    fixed: 'right'
  }
];
</script>

<style scoped>
.table-container {
  width: 100%;
}
</style>
