<template>
  <div class="table-container">
    <fs-table :data="tableData">
      <template #table>
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address"
      /></template>
    </fs-table>
  </div>
</template>

<script setup lang="ts">
import { ElTableColumn } from 'element-plus';
import { FsTable } from 'fanosy';
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
  }
];
</script>

<style scoped>
.table-container {
  width: 100%;
}
</style>
