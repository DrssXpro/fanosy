# FsTable 表格组件

## 介绍

`FsTable` 组件是针对 `ElTable`、`ElPagination` 进行二次封装，其主要弥补原 table 组件使用的不足之处

feature:
 -- 通过配置项

## 引入

此组件引入即可使用

```typescript
import { FsSearchContainer, FsSearchItem } from 'fanosy';
```

## 代码演示

### 基础用法

一看就知道怎么用了

通过一些简单的配置项来实现定制化需求，其核心功能在于树形子节点的数据合并，每当我们选择对应的类目移动到右侧时触发自定义事件拿到选择结果

并在选择的基础之上增加了搜索功能，输入关键词会过滤出树形结构数据，以自定义颜色显示搜索文本

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
