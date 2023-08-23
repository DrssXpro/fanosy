export interface IWaterFallProps {
  gap: number;
  column: number;
  pageSize: number;
  loading: boolean;
  request: IWaterfallRequest;
}

export interface IImageItem {
  id: string | number;
  url: string;
  width: number;
  height: number;
  [key: string]: any;
}

export type IWaterfallRequest = (
  page: number,
  pageSize: number
) => Promise<IImageItem[]>;
