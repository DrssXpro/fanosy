# FsCreateSelect 创建选项下拉框

## 介绍

`FsCreateSelect` 基于 `ElSelect` 的功能基础上增加了额外创建选项的功能，其内部使用 nanoid 生成选项的唯一 value 值

## 引入

此组件引入即可使用

```typescript
import { FsCreateSelect } from 'fanosy';
```

## 代码演示

### 基础用法

该组件需要进行 `v-model` 双向绑定，该值即为下拉框选中的值，该值在组件内部设置的类型为 `any`，之所以这样做是考虑到多选的情况

> 如果开启多选，则双向绑定的结果为一个数组，具体看代码实例

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-create-select-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-create-select-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数       | 说明       | 类型             | 是否必传 | 默认值 |
| ---------- | ---------- | ---------------- | -------- | ------ |
| 双向绑定值 | 选项内容   | _any_            | 是       | 无     |
| options    | 下拉框选项 | _ISelectOptions_ | 是       | 无     |

```typescript
interface ISelectOptions {
  label: string;
  value: string;
}

// 双向绑定结果：
type ResultSingle = {
  label: string;
  value: string;
};

// 双向绑定多选结果
type ResultMultiple = ResultSingle[];
```

其他使用方法请查看[ElSelect 使用文档](https://element-plus.gitee.io/zh-CN/component/select.html)
