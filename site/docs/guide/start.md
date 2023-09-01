# 快速开始

本节将介绍如何在项目中使用 Fanosy

## 用法

### 按需导入

Fanosy 提供了基于 ES Module 开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。通过 [Gulp](https://gulpjs.com/) 手动单独打包组件内置样式。

终上所述，想要哪个导哪个

```vue
<template>
  <fs-button :time="1000" throttle type="primary">click me!</fs-button>
</template>
<script>
import { FsButton } from 'fanosy'
export default {
  components: { FsButton }
};
</script>
```

### 全局导入

直接导就完了

```typescript
import { createApp } from 'vue';
import App from './app.vue';
import fanosy from '@fanosy/components';

const app = createApp(App);
app.use(fanosy);
app.mount('#app');
```


### Volar 支持

如果您在使用 `Volar`，那么可以在 `tsconfig.json` 中配置 `compilerOptions.types` 来指定全局组件类型（尤其是全局注册时要想获得类型提示就需要加上下面配置）

```json
{
  "compilerOptions": {
    // ...
    "types": ["fanosy/lib/src/components"]
  }
}
```
