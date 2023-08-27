// 传入 datalist 数据类型
export type IAreaList = IProvince[];

// selector options
export type IOptions = Record<
  string,
  {
    id: string | number;
    name: string;
    [key: string]: any;
  }
>;

// 省
export interface IProvince {
  id: string | number;
  name: string;
  cities: Record<string, ICity> | ICity[];
  [key: string]: any;
}

// 城市
export interface ICity {
  id: string | number;
  name: string;
  counties: Record<string, ICounty> | ICounty[];
  [key: string]: any;
}

// 区 / 县
export interface ICounty {
  id: string | number;
  name: string;
  [key: string]: any;
}
