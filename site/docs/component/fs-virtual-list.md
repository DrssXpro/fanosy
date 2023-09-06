# FsVirtualList 定高虚拟列表

## 介绍

`FsVirtualList` 组件为个人学习封装的定高虚拟列表组件，内部使用 `requestAnimationFrame` 进行滚动节流优化

## 引入

此组件引入即可使用

```typescript
import { FsBounceCountTo } from 'fanosy';
```

## 代码演示

### 基础用法

该组件需要传入数据源 `dataSource` 和每一项的固定高度 `itemHeight`，组件内部会进行触底判断发送自定义事件来获取更多数据，至于 loading 状态需要用户手动维护

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-virtual-list-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-virtual-list-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数       | 说明           | 类型               | 是否必传 | 默认值 |
| ---------- | -------------- | ------------------ | -------- | ------ |
| dataSource | 数据源         | IVirtuallistItem[] | 是       | 无     |
| itemHeight | item项固定高度 | number             | 是       | 无     |

```typescript
interface IVirtuallistItem {
	id: number | string;
    [key: string]: any;
}
```

### Event

| 事件名      | 说明                                       | 结果类型 |
| :---------- | ------------------------------------------ | -------- |
| getMoreData | 内部监听列表触底发出事件，用来获取更多数据 | 无       |



