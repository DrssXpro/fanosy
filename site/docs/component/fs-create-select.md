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

该组件要求必须传入属性 `time` ，用来设置节流或防抖的时间间隔

`debounce` 和 `throttle` 属性按照需求传入，如果都不传入则默认不开启防抖和节流的效果，两者都传入时以防抖为主

<CodeShow>
  <template #source>
    <ClientOnly>
      <fs-create-select-show />
    </ClientOnly>
  </template>
  <template #meta>

 @[code vue{3-6,14,16-17,25-27,41,48,50-59}:no-line-numbers](../\.vuepress/components/fs-create-select-show.vue)

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