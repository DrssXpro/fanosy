export interface ITreeTransferProps {
  dataSource: ITreeItem[]; // 树形数据源
  title?: string[]; // 穿梭框标题
  divider?: string; // 右侧选择条目分隔符
  activeColor?: string; // 搜索关键词展示颜色
}

export interface ITreeItem {
  id: string | number;
  label: string;
  disabled: boolean;
  isActive: boolean;
  parentId?: string | number;
  children?: ITreeItem[];
}

export interface ICheckItem {
  id: string | number;
  label: string;
}
