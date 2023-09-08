<template>
  <div class="table-container">
    <div class="box">
      <fs-table
        :data="tableData"
        :columns="columns"
        show-pagination
        :pagination="{ pageSize: 10, total: 100, currentPage: 1 }"
      ></fs-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FsTable, type IFsTableColumn } from '@fanosy/components';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/pagination/style/css';
interface IData {
  date: string;
  name: string;
  address: string;
}

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
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
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
    label: '日期',
    width: 400
  },
  {
    prop: 'name',
    columnKey: 'name',
    label: '名字',
    width: 400
  },
  {
    prop: 'address',
    columnKey: 'address',
    label: '地址',
    fixed: 'right',
    width: 150
  }
];
</script>

<style scoped>
.table-container {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 300px;
  border: 1px solid black;
}
</style>
