import { CSSProperties } from 'vue';

export interface IVirtualWaterFallProps {
  loading: boolean;
  column?: number;
  columnItemCount?: number;
  requestSize?: number;
  gap?: number;
  request?: FsVirtualWaterfallReuqest;
}

export interface IColumnQueue {
  list: Array<IRenderItem>;
  height: number;
}

export interface IItemRect {
  width: number;
  height: number;
}

// 渲染视图项
export interface IRenderItem {
  item: IDataItem;
  y: number;
  h: number;
  style: CSSProperties;
}

// 数据源项类型：固定宽高
export interface IDataItem {
  id: number | string;
  width: number;
  height: number;
  [key: string]: any;
}

// 数据请求
export type FsVirtualWaterfallReuqest = (
  page: number,
  pageSize: number
) => Promise<{
  total: number;
  list: IDataItem[];
}>;
