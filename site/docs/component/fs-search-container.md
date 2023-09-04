# FsSearchContainer 搜索布局容器

## 介绍

`FsSearchContainer` 组件的业务场景主要在于一般的管理界面上半部分的搜索区域，大型项目中搜索内容条件过多，因此封装该容器提供展开折叠功能，并动态计算宽度调整布局

## 引入

此组件引入即可使用

```typescript
import { FsSearchContainer, FsSearchItem } from 'fanosy';
```

## 代码演示

### 基础用法

提供了 `FsSearchContainer` 和 `FsSearchItem` 组件，其整理结构依赖于 `FsSearchContainer` 的 search 插槽，组件内部实现了插槽通信的显隐控制方式，同时监听了 container 的大小变化，以此来动态计算每行容纳的 searchItem 数量。

您可以根据之前编写习惯双向绑定表单内容，因为该组件核心只是起到了布局的效果，对于值绑定并没有影响。

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-search-container-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-search-container-show.vue)

  </template>
</CodeShow>

## API

### SearchContainer

#### Props

| 参数      | 说明                                 | 类型    | 是否必传 | 默认值  |
| --------- | ------------------------------------ | ------- | -------- | ------- |
| showReset | 是否展示重置按钮，触发重置自定义事件 | boolean | 否       | false   |
| itemWidth | 搜索表单项宽度                       | number  | 否       | 230     |
| bgColor   | 搜索容器背景颜色                     | string  | 否       | #f9f9f9 |

#### Event

| 事件名 | 说明                                           | 结果类型 |
| :----- | ---------------------------------------------- | -------- |
| search | 点击查询按钮触发事件                           | 无       |
| reset  | 点击重置按钮触发事件(需要设置showReset = true) | 无       |



### SearchItem

#### Props

| 参数       | 说明                                             | 类型   | 是否必传 | 默认值  |
| ---------- | ------------------------------------------------ | ------ | -------- | ------- |
| label      | 表单项 label 展示                                | string | 否       | 空值    |
| labelColor | 表单项 label 字体颜色                            | string | 否       | #242f57 |
| labelSize  | 表单项 label 字体大小                            | number | 否       | 12      |
| itemWidth  | 表单项宽度(需要与container的 itemWidth 保持一致) | number | 否       | 230     |

