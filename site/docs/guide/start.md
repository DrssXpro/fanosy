# 快速开始

本节将介绍如何在项目中使用 Fanosy

## 用法

### 按需导入

Fanosy 提供了基于 ES Module 开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。通过 [Gulp](https://gulpjs.com/) 手动单独打包组件内置样式，因此想用哪个导就完了

需要注意的是：部分element-plus二次封装的组件依赖原组件样式，因此在使用时请确保安装elmenet-plus并**手动引入对应组件样式**，具体引入的样式文件请查看组件部分文档

```vue
<template>
  <fs-button :time="1000" throttle type="primary">click me!</fs-button>
</template>
<script>
import { FsButton } from 'fanosy'
import 'element-plus/es/components/button/style/css';
export default {
  components: { FsButton }
};
</script>
```

### 全局导入

废话不多说，开导

>注意如果使用了部分element-plus二次封装的组件别忘了把全局样式也一块导了捏~

```typescript
import { createApp } from 'vue';
import App from './app.vue';
import fanosy from '@fanosy/components';
import 'element-plus/dist/index.css'

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
