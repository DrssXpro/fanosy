<template>
  <div class="fs-table-container">
    <div class="fs-table-content">
      <fs-table-scroll-bar is-fixed headerSticky>
        <el-table :data="data" v-bind="props.tableConfig" ref="ElTableInstance">
          <!-- 配置项渲染列 -->
          <el-table-column v-if="!props.isSelect" type="selection" width="55" />
          <template v-for="config in props.columns" :key="config.columnKey">
            <el-table-column v-bind="config">
              <template #default="scope">
                <slot
                  name="bodyCell"
                  :row="scope.row"
                  :columnKey="config.columnKey"
                  >{{ scope.row[config.prop] }}</slot
                >
              </template>
            </el-table-column>
          </template>
          <!-- 提供插槽，保持原始 table 用法 -->
          <slot name="table"> </slot>
          <template #empty>
            <span style="color: #969799">{{ props.emptyText }}</span>
          </template>
        </el-table>
      </fs-table-scroll-bar>
    </div>
    <div class="fs-table-pagination" v-if="props.showPagination">
      <span>共{{ props.pagination!.total }}条</span>
      <el-pagination
        :current-page="props.pagination!.currentPage"
        :page-size="props.pagination!.pageSize"
        :total="props.pagination!.total"
        background
        layout="prev, pager, next, sizes"
        @update:current-page="handleCurrentPageChange"
        @update:page-size="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import FsTableScrollBar from './FsTableScrollBar.vue';
import { IFsTableProps } from './types';
import 'element-plus/es/components/table/style/css';
import 'element-plus/es/components/table-column/style/css';
import 'element-plus/es/components/pagination/style/css';
import './style/table.scss';

defineOptions({
  name: 'fs-table'
});

const props = withDefaults(defineProps<IFsTableProps<T>>(), {
  showPagination: false,
  isSelect: false,
  emptyText: '表格数据为空'
});

const emit = defineEmits<{
  pageSizeChange: [pageSize: number];
  currentPageChange: [page: number];
}>();
defineSlots<{
  bodyCell(props: { row: T; columnKey: string }): any;
  table(): any;
}>();
const ElTableInstance = ref<InstanceType<any>>();

const handleCurrentPageChange = (page: number) => {
  emit('currentPageChange', page);
};

const handlePageSizeChange = (size: number) => {
  emit('pageSizeChange', size);
};

defineExpose({
  ElTableInstance
});
</script>
