export interface ICategoryItem {
  id: string | number;
  level: number;
  content: string;
  isMore: boolean | null;
  children: ICategoryItem[];
  [key: string]: any;
}

export type IRequestFunction = (
  level: number,
  id: string | number
) => Promise<{
  data: ICategoryItem[];
  success: boolean;
}>;
