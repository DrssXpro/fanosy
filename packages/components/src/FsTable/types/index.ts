export interface IFsTableProps<T> {
  // 数据源
  data: T[];
  // 渲染列配置项
  columns?: IFsTableColumn[];
  // 数据未空时展示文本
  emptyText?: string;
  // 是否设置多选列
  isSelect?: boolean;
  // 是否展示分页：true 时必须传入 pagination
  showPagination?: boolean;
  // 分页器配置项
  pagination?: IPaginationConfig;

  tableConfig?: ITableConfg;
}

// 列配置项
export interface IFsTableColumn {
  prop: string;
  label: string;
  columnKey: string;
  [key: string]: any;
}

// 分页器配置
export interface IPaginationConfig {
  total: number;
  currentPage: number;
  pageSize: number;
}

export interface ITableConfg {
  [key: string]: any;
}

export interface ITableScrollbarProps {
  // 是否开启自适应滚动条
  isFixed: boolean;
  // 是否固定表格头部，滚动时吸顶
  headerSticky?: boolean;
  // 自适应滚动条距离窗口底部的距离
  bottom?: number;
  // 滚动重新计算防抖: 200 ~ 1000 ms
  scrollDelay?: number;
}
