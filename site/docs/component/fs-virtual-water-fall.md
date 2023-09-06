# FsVirtualWaterFall 瀑布流虚拟列表

## 介绍

`FsVirtualWaterFall` 组件结合了瀑布流和虚拟列表的特性，其性能远高于普通的瀑布流布局，同时为了缓解白屏问题可以为每张图片添加动画，使加载过程更加顺滑

组件内部维护了瀑布流队列，根据瀑布流的特性计算每一项的具体位置，根据每一项的具体位置判断是否超出容器，保留只在容器里的列表项，以此实现虚拟列表的特性

需要注意的是该组件目前只支持定高的情况，且只适合图片展示且接口需要返回固定宽高，目前暂未实现通用的瀑布流虚拟列表组件

## 引入

此组件引入即可使用

```typescript
import { FsVirtualWaterFall } from 'fanosy';
```

## 代码演示

### 基础用法

该组件主要依赖于传入的 `request` 方法，组件内部会在恰当时机调用该方法加载更多数据，同时内部监听了视口变化，当容器大小发生改变时会触发回流重新布局，为了优化回流带来的性能问题，采用了防抖来进行性能优化

> 目前 vilipix 插画网站出现问题，接口无法调用获取数据，如果想看该组件实际效果可以查看[个人录制的视频](https://www.bilibili.com/video/BV1qF411f7g7/)：

<CodeShow>

<template #source>
<ClientOnly>
<fs-virtual-water-fall-show />
</ClientOnly>
</template>
<template #meta>

@[code vue{}](../.vuepress/components/fs-virtual-water-fall-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数            | 说明                   | 类型                      | 是否必传 | 默认值       |
| --------------- | ---------------------- | ------------------------- | -------- | ------------ |
| model:loading   | loading状态            | boolean                   | 是       | 无           |
| column          | 列数                   | number                    | 否       | 4            |
| columnItemCount | 预估每列容纳的item数量 | number                    | 否       | 6            |
| requestSize     | 每次请求数据量         | number                    | 否       | 30           |
| gap             | item间距               | number                    | 否       | 20           |
| request         | 获取数据方法           | FsVirtualWaterfallRequest | 否       | 返回空值请求 |

```typescript
type FsVirtualWaterfallReuqest = (
  page: number,
  pageSize: number
) => Promise<{
  total: number;
  list: IDataItem[];
}>;

interface IDataItem {
  id: number | string;
  width: number;
  height: number;
  [key: string]: any;
}
```

### Event

| 事件名      | 说明                                       | 结果类型 |
| :---------- | ------------------------------------------ | -------- |
| getMoreData | 内部监听列表触底发出事件，用来获取更多数据 | 无       |
