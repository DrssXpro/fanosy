<template>
  <div class="table-container">
    <fs-table
      :data="tableData"
      :columns="columns"
      show-pagination
      :pagination="{
        currentPage: paginationState.currentPage,
        pageSize: paginationState.pageSize,
        total: paginationState.total
      }"
      @page-size-change="handlePageSize"
      @current-page-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { FsTable, type IFsTableColumn } from 'fanosy';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/pagination/style/css';
import { reactive } from 'vue';

interface IData {
  date: string;
  name: string;
  address: string;
}

const paginationState = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
});

const handlePageSize = (pageSize: number) => {
  paginationState.pageSize = pageSize;
};

const handleCurrentChange = (page: number) => {
  paginationState.currentPage = page;
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
