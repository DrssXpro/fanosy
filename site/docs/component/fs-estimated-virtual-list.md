# FsEstimatedVirtualList 不定高虚拟列表

## 介绍

`FsEstimatedVirtualList` 组件是在定高虚拟列表的基础上进行升级，无需给定每一项高度，但需要给出一个预测高度（该预测高度尽量比真实每一项的高度要小）。

组件内部会先根据预测高度进行渲染，当拿到真实数据渲染到视图上之后组件内部会获取真实DOM的高度再重新渲染，同时由于高度的不确定性，核心实现的计算要比定高虚拟列表更多，因此不定高的虚拟列表性能与定高虚拟列表相比较差。

## 引入

此组件引入即可使用

```typescript
import { FsEstimatedVirtualList } from 'fanosy';
```

## 代码演示

### 基础用法

该组件需要传入数据源 `dataSource` 和一个预测高度 `estimatedHeight`，组件会根据预测高度先行进行计算，拿到真实DOM之后再获取真实高度进行替换

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-estimated-virtual-list-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-estimated-virtual-list-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数          | 说明           | 类型               | 是否必传 | 默认值 |
| ------------- | -------------- | ------------------ | -------- | ------ |
| dataSource    | 数据源         | IVirtuallistItem[] | 是       | 无     |
| itemHeight    | item项固定高度 | number             | 是       | 无     |
| model:loading | loading状态    | boolean            | 是       | 无     |

```typescript
interface IVirtuallistItem {
  id: number;
  [key: string]: any;
}
```

### Event

| 事件名      | 说明                                       | 结果类型 |
| :---------- | ------------------------------------------ | -------- |
| getMoreData | 内部监听列表触底发出事件，用来获取更多数据 | 无       |
