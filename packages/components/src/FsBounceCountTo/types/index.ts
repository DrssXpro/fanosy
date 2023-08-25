export interface IBounceCountToProps {
  // 字体大小
  fontSize?: number;
  // 字体颜色
  color?: string;
  // 滚动速度
  rockSpeed?: speed;
  // 最终数字
  num: number;
  // 最终bounce动画数字延迟
  delay: number;
}

export type speed = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
