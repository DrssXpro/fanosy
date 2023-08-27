<template>
  <div class="test-container" v-loading="tableState.loading">
    <fs-table
      :data="tableState.list"
      :columns="columns"
      ref="fsTableRef"
      :table-config="{ border: true }"
      show-pagination
      :pagination="{
        currentPage: tableState.currentPage,
        pageSize: tableState.pageSize,
        total: tableState.total
      }"
      @current-page-change="handlePageChange"
    >
      <template #bodyCell="{ row, columnKey }">
        <template v-if="columnKey === 'name'">{{ row.name }}-123</template>
      </template>
    </fs-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { FsTable, type IFsTableColumn } from '@fanosy/components';

interface IData {
  date: string;
  name: string;
  address: string;
}

const fsTableRef = ref<any>();
const tableState = reactive({
  loading: false,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  list: [] as IData[]
});

onMounted(() => {
  getData();
});

const handlePageChange = (page: number) => {
  tableState.currentPage = page;
  getData();
};

async function getData() {
  tableState.loading = true;
  const res = await getList(tableState.currentPage, tableState.pageSize);
  tableState.loading = false;
  tableState.list.push(...res.data);
  tableState.total = res.total;
}

function getList(page: number, pageSize: number) {
  return new Promise<{ total: number; success: boolean; data: IData[] }>(
    (resolve) => {
      setTimeout(() => {
        const arr = [];
        console.log('page:', page);
        for (let i = 1; i <= pageSize; i++) {
          arr.push({
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles'
          });
        }
        resolve({
          total: 100,
          success: true,
          data: arr
        });
      }, 1000);
    }
  );
}

const columns: IFsTableColumn[] = [
  {
    prop: 'date',
    columnKey: 'date',
    label: '日期'
    // width: 400
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
