# FsTreeTransfer 树形穿梭框

## 介绍

`FsTreeTransfer` 是基于 `ElTree` 以及 `ElCheckbox` 实现的树形穿梭框，其主要业务场景在于我们在以多级分类作为搜索条件来选择分类时，提供树形筛选的能力

## 引入

此组件引入即可使用

```typescript
import { FsTreeTransfer } from 'fanosy';
```

## 代码演示

### 基础用法

一看就知道怎么用了

通过一些简单的配置项来实现定制化需求，其核心功能在于树形子节点的数据合并，每当我们选择对应的类目移动到右侧时触发自定义事件拿到选择结果

并在选择的基础之上增加了搜索功能，输入关键词会过滤出树形结构数据，以自定义颜色显示搜索文本

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-tree-transfer-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-tree-transfer-show.vue)

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
