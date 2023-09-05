<template>
  <div class="table-container">
    <fs-table :data="tableData" :columns="columns">
      <template #bodyCell="{ row, columnKey }">
        <!-- 自定义姓名列 -->
        <template v-if="columnKey === 'name'">{{ row.name }} --- add</template>
        <!-- 自定义地址列 -->
        <template v-if="columnKey === 'address'">
          <span style="color: #f00">{{ row.address }}</span></template
        >
      </template>
    </fs-table>
  </div>
</template>

<script setup lang="ts">
import { FsTable, type IFsTableColumn } from 'fanosy';
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
