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

## API

### Props

| 参数        | 说明               | 类型        | 是否必传 | 默认值             |
| ----------- | ------------------ | ----------- | -------- | ------------------ |
| dataSource  | 树形数据源         | ITreeItem[] | 是       | 无                 |
| title       | 穿梭框标题         | string[]    | 否       | ['列表1', '列表2'] |
| divider     | 右侧条目分隔符     | string      | 否       | '/'                |
| activeColor | 搜索关键词展示颜色 | string      | 否       | '#f00'             |

### Event

| 事件名      | 说明                                         | 结果类型     |
| :---------- | -------------------------------------------- | ------------ |
| selectValue | 选择类目至右侧框时触发该事件，拿到选择的结果 | IcheckItem[] |

```typescript
interface ITreeItem {
  id: string | number;
  label: string;
  disabled: boolean;
  isActive: boolean;
  parentId?: string | number;
  children?: ITreeItem[];
}

interface ICheckItem {
  id: string | number;
  label: string;
}
```
