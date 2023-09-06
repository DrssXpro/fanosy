# FsWaterFall 瀑布流组件

## 介绍

`FsWaterFall` 实现了最基本的瀑布流布局，核心思想是使用贪心算法，每次选取当前最小的高度列添加数据，计算每张图片展示的位置。

需要注意的是组件内部并没有获取 DOM 操作来计算每张图片的大小，仅支持后端返回图片固定宽高信息。

## 引入

此组件引入即可使用

```typescript
import { FsWaterFall } from 'fanosy';
```

## 代码演示

### 基础用法

该组件主要依赖于传入的 `request` 方法，组件内部会在恰当时机调用该方法加载更多数据，同时内部监听了视口变化，当容器大小发生改变时会触发回流重新布局，为了优化回流带来的性能问题，采用了防抖来进行性能优化

> 目前 vilipix 插画网站出现问题，接口无法调用获取数据，如果想看该组件实际效果可以查看[个人录制的视频](https://www.bilibili.com/video/BV1qF411f7g7/)：

<CodeShow>

<template #source>
<ClientOnly>
<fs-water-fall-show />
</ClientOnly>
</template>
<template #meta>

@[code vue{}](../.vuepress/components/fs-water-fall-show.vue)

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
```

### Event

| 事件名      | 说明                                       | 结果类型 |
| :---------- | ------------------------------------------ | -------- |
| getMoreData | 内部监听列表触底发出事件，用来获取更多数据 | 无       |
