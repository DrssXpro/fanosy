# FsBounceCountTo 数据滚动

## 介绍

`FsBounceCountTo` 组件仅为个人在阅读技术文章时无意中看到，因此就想手动实现一下，具体效果看代码演示

需要注意的是该组件涉及到的部分动画并没有考虑兼容性问题，因此不同浏览器可能会出现不同的效果，慎用！

## 引入

此组件引入即可使用

```typescript
import { FsBounceCountTo } from 'fanosy';
```

## 代码演示

### 基础用法

该组件必须传入 `num` 和 `delay` 属性，详细含义请查看下面 props 文档

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-bounce-count-to-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-bounce-count-to-show.vue)

  </template>
</CodeShow>

## API

### Props

| 参数      | 说明                  | 类型   | 是否必传 | 默认值 |
| --------- | --------------------- | ------ | -------- | ------ |
| num       | 展示数字              | number | 是       | 无     |
| delay     | bounce动画数字延迟(s) | number | 是       | 无     |
| fontSize  | 字体大小              | number | 否       | 14     |
| color     | 字体颜色              | string | 否       | '#000' |
| rockSpeed | 滚动速度              | speed  | 否       | 500    |

```typescript
type speed = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
```
