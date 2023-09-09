# FsTable 高级表格

## 介绍

`FsTable` 组件是针对 `ElTable`、`ElPagination` 进行二次封装，其主要弥补原 table 组件使用的不足之处

::: warning

`FsTable` 组件由于使用了 Vue3.3 的泛型组件特性，在使用全局注册组件时其类型会与其他正常组件不符，暂未找到解决方案，因此该组件目前只支持按需导入，全局导入的内部实现自动将该组件跳过，因此不能通过全局引入的方式来使用该组件。

:::

**✨特性**

- 无需再以插槽的形式来配置列的展示，只需传入配置项即可完成渲染，同时支持配置项对应具名作用域插槽
- 充分利用 Vue 3.3 的泛型组件以及 defineSlots API 实现插槽行数据的类型提示
- 内部封装了 `tableScrollbar` 组件，该组件的主要作用在于当表格宽度和高度过长时会出现横向和纵向滚动条，但横向滚动条往往出现在表格底部，这时如果想要进行横向滚动并不方便（必须要先纵向滚动到底部）。该组件的作用主要有两点：
  1. 内部从下向上查找滚动的容器，为该容器添加滚动事件，更改横向滚动条样式，让它始终出现在屏幕视口范围内，方便用户使用
  2. 原 `ElTable` 必须设置 `height` 属性才可以实现固定表头，现在只需根据配置项即可实现固定表头

## 引入

此组件引入即可使用

```typescript
import { FsTable } from 'fanosy';
```

## 代码演示

### 基础用法

通过传入对应的列配置项 `columns` 和数据源 `data` 即可渲染表格数据

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-table-show-one />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-table-show-one.vue)

  </template>
</CodeShow>

```typescript
// 列配置项
export interface IFsTableColumn {
  /*数据源字段 */
  prop: string;
  /*列名 */
  label: string;
  /*列key（用于自定义列插槽使用，必须唯一） */
  columnKey: string;
  /*其他配置项，最终会应用在 在el-table-column 上，可以调整列宽度等，具体查看 element-plus 文档 */
  [key: string]: any;
}
```

### 自定义列展示

`FsTable` 由于内部使用了 Vue3.3 的 **defineSlots** 以及 **泛型组件**，因此在自定义列展示时会与 `element-plus` 稍有不同，其主要使用的插槽为 `bodyCell`, 通过该具名插槽会拿到 **row** 整行数据以及 **columnKey**，您可以通过判断 **columnKey** 来选择自己想要自定义列，具体使用方式可以见下面的实例代码

可能您不太理解为什么要以这种方式来实现自定义列展示，很简单，因为以这样的方式你会发现当你使用 **row** 来获取当前列字段时会有**完整的类型提示**，而这一点在原来的 `ElTable` 中是无法实现的

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-table-show-two />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-table-show-two.vue)

  </template>
</CodeShow>

### 横向滚动以及固定表头优化

`FsTable` 内部封装了 `FsTableScrollBar` 组件，该组件内部会劫持 `ElScrollBar`，监听容器滚动来改变横向滚动条的位置，**使横向滚动条始终出现在视图当中**

`ElTable` 提供了固定表头的方式，但需要设置固定的 `height` 属性，而 `FsTableScrollBar` 内部监听容器滚动，无需固定高度即可实现固定表头

`FsTable` 无需进行额外配置，内部已默认开启以上的功能

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-table-show-three />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-table-show-three.vue)

  </template>
</CodeShow>

### 支持分页配置

`FsTable` 内置了 `ElPagination`，只需传入对应的属性、监听对应的事件即可拥有一个分页器，具体查看下面实例代码

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-table-show-four />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-table-show-four.vue)

  </template>
</CodeShow>

### 保留原有的插槽使用

当然，可能您并不习惯我们的使用方式，但是不用担心，`FsTable` 保留了之前 `ElTable` 的插槽用法，您依然可以按照之前的方式来自定义列，只需使用我们的具名插槽 **table** 即可,

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-table-show-five />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-table-show-five.vue)

  </template>
</CodeShow>

### 保留ElTable的实例方法

通过设置 `ref` 我们可以拿到 `ElTable` 的实例来调用上面的方法，如下例所示设置全选，具体可以查看 `ElTable` 文档

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-table-show-six />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-table-show-six.vue)

  </template>
</CodeShow>

## API

### Props (FsTable)

| 参数           | 说明                                   | 类型              | 是否必传 | 默认值         |
| -------------- | -------------------------------------- | ----------------- | -------- | -------------- |
| data           | 数据源                                 | T[]               | 是       | 无             |
| columns        | 渲染配置项                             | IFsTableColumn[]  | 否       | 无             |
| emptyText      | 表格数据为空时的文本                   | string            | 否       | '表格数据为空' |
| isSelect       | 是否开启选择列                         | boolean           | 否       | false          |
| showPagination | 是否启用分页器                         | boolean           | 否       | false          |
| pagination     | 分页器配置项（需先开启分页器）         | IPaginationConfig | 否       | 无             |
| tableConfig    | table组件配置项（内部绑定到ElTable上） | ITableConfg       | 否       | 无             |

```typescript
// 列配置项
interface IFsTableColumn {
  prop: string;
  label: string;
  columnKey: string;
  [key: string]: any;
}

// 分页器配置
interface IPaginationConfig {
  total: number;
  currentPage: number;
  pageSize: number;
}

interface ITableConfg {
  [key: string]: any;
}
```

### Event (FsTable)

| 事件名            | 说明                     | 结果类型 |
| :---------------- | ------------------------ | -------- |
| pageSizeChange    | pageSize改变时触发该事件 | number   |
| currentPageChange | page改变时触发该事件     | number   |

### Props（FsTableScrollBar）

| 参数         | 说明                            | 类型    | 是否必传 | 默认值 |
| ------------ | ------------------------------- | ------- | -------- | ------ |
| isFixed      | 是否开启自适应滚动条            | boolean | 是       | 无     |
| headerSticky | 是否固定表格头部，滚动时吸顶    | boolean | 否       | false  |
| bottom       | 自适应滚动条距离窗口底部的距离  | number  | 否       | 10     |
| scrollDelay  | 滚动重新计算防抖: 200 ~ 1000 ms | number  | 否       | 300    |
