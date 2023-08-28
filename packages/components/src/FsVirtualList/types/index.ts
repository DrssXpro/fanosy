export interface IVirtuallistProps {
  // 固定item高度
  itemHeight: number;
  // 数据源
  dataSource: IVirtuallistItem[];
}

export interface IVirtuallistItem {
  id: number | string;
  [key: string]: any;
}
