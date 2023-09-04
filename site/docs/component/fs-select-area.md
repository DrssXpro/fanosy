# FsSelectArea 省市区选择器

## 介绍

`FsSelectArea` 基于 `ElSelect` 实现，其主要针对的业务即为省市区选择，组件已内置相关数据，直接使用即可

## 引入

此组件引入即可使用

```typescript
import { FsSelectArea } from 'fanosy';
```

## 代码演示

### 基础用法

该组件只需要简单配置布局相关内容，之后监听事件拿到选择的结果即可

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-select-area-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-select-area-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数      | 说明           | 类型                       | 是否必传 | 默认值     |
| --------- | -------------- | -------------------------- | -------- | ---------- |
| gap       | 选择器间距     | _number_                   | 否       | 无         |
| direction | 选择器排布方向 | 'horizontal '\| 'vertical' | 否       | horizontal |

### Event

| 事件名     | 说明                                       | 结果类型    |
| :--------- | ------------------------------------------ | ----------- |
| chooseArea | 用户选择最后一个区域框时触发，返回选择结果 | string\[][] |

```typescript
// 例如选择: 北京市 市辖区 东城区
const result = [
  ['11000', '北京市'],
  ['110100', '市辖区'],
  ['110101', '东城区']
];
```
