# FsMessageBox 消息盒

## 介绍

`FsMessageBox` 组件仅为个人学习函数式调用组件的一个尝试，其样式来自网络

## 引入

此组件引入即可使用

```typescript
import { FsMessageBox } from 'fanosy';
```

## 代码演示

### 基础用法

该组件只需要直接导入调用即可，其参数为 `title` 和 `content`，其返回值为一个 **promise**，当点击确认按钮时会走 resolve，取消或者关闭时走 reject。

同时支持传入 `beforeClose` 回调，该回调允许返回一个 boolean 值 或者一个 Promise 且结果为 boolean，组件内部根据 boolean 判断消息盒关闭状态。

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-message-box-show />
    </ClientOnly>
  </template>
  <template #meta>

@[code vue{}](../.vuepress/components/fs-message-box-show.vue)

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
