# FsCategorySelector 分类选择器

## 介绍

`FsCategorySelector` 是一个分类业务组件，主要用于多级类目选择，最多支持十级类目，详细使用方式如下

## 引入

此组件引入即可使用

```typescript
import { FsCategorySelector } from 'fanosy';
```

## 代码演示

### 基础用法

该组件有两个必传项：`request` 和 `loading`，request 作为请求函数，组件内部会根据用户操作进行类目列表请求，其中 loading 需要进行外部的双向绑定，内部组件发送 request 请求时会对 loading 状态改变进行维护，需要注意的是该组件对于类目要求有固定的类型，具体类型查看 props

<CodeShow>

<template #source>
<ClientOnly>
<fs-category-selector-show />
</ClientOnly>
</template>
<template #meta>

@[code vue{}](../.vuepress/components/fs-category-selector-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数          | 说明                   | 类型             | 是否必传 | 默认值    |
| ------------- | ---------------------- | ---------------- | -------- | --------- |
| request       | 获取类目请求           | IReqeustFunction | 是       | 无        |
| model:loading | loading状态            | boolean          | 是       | 无        |
| currentColor  | 选中字体颜色           | string           | 否       | ’#005FCD‘ |
| currentBg     | 选中的背景颜色         | string           | 否       | '#E6EFFA' |
| isLast        | 获取最后类目时信息格式 | boolean          | 否       | false     |

```typescript
type IRequestFunction = (
  level: number,
  id: string | number
) => Promise<{
  data: ICategoryItem[];
  success: boolean;
}>;

interface ICategoryItem {
  id: string | number;
  level: number;
  content: string;
  isMore: boolean | null;
  children: ICategoryItem[];
  [key: string]: any;
}
```

### Event

| 事件名         | 说明                                   | 结果类型                                                |
| :------------- | -------------------------------------- | ------------------------------------------------------- |
| selectCategory | 选中最后一个类目时触发，拿到选择的结果 | Array<Pick<ICategoryItem, 'id' \| 'level' \| 'content'> |

注意当 `isLast`  设置为 true 时，只获取最后一个类目的结果，如果为 false，则默认拿到最后一个类目包括其父级的结果
