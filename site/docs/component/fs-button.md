# FsButton 增强版ElButton

## 介绍

`FsButton` 完美继承了 `ElButton` 组件的使用方式(大概)，并在其基础上提供了**点击事件**的**防抖、节流**功能

## 引入

此组件引入即可使用

```typescript
import { FsButton } from 'fanosy';
```

## 代码演示

### 基础用法

该组件要求必须传入属性 `time` ，用来设置节流或防抖的时间间隔

`debounce` 和 `throttle` 属性按照需求传入，如果都不传入则默认不开启防抖和节流的效果，两者都传入时以防抖为主

点击下面的按钮查看控制台的输出效果👇

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-button-show />
    </ClientOnly>
  </template>
  <template #meta>

 @[code vue{}:no-line-numbers](../\.vuepress/components/fs-button-show.vue)

  </template>
</CodeShow>


## API



### Props

| 参数     | 说明               | 类型      | 是否必传 | 默认值 |
| -------- | ------------------ | --------- | -------- | ------ |
| time     | 节流、防抖时间间隔 | _number_  | 是       | 无     |
| debounce | 开启防抖           | _boolean_ | 否       | false  |
| throttle | 开启节流           | _boolean_ | 否       | false  |

其他使用方法请查看[ElButton 使用文档](https://element-plus.gitee.io/zh-CN/component/button.html)