# 快速开始

本节将介绍如何在项目中使用 Fanosy

## 用法

### ✨自动导入（推荐）

Fanosy 依据 element-plus 中推荐的自动导入插件：`unplugin-vue-components`，封装了 **componentsLibResolver** 工具方法，该方法适用于所有基于 element-plus 封装的业务组件库实现自动导入组件、样式的效果。

因此您需要先安装 `@fanosy/utils` 工具包以及 `unplugin-vue-components` 插件：

```bash
 npm i @fanosy/utils
 npm i -D unplugin-vue-components
```

> 如果您只使用工具包的 componentsLibResolver 方法，那么您也可以选择安装为开发时依赖

接下来我们就来看看如何使用，主要在 vite.config.ts 中进行配置（未尝试webpack，建议使用 fanosy 的项目都是用 vite 作为构建工具）

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { componentsLibResolver } from '@fanosy/utils';

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [
        componentsLibResolver({
          componentsMap: stylesMap,
          componentsPath: `fanosy/es/src`
        })
      ]
    })
  ]
});
```

需要注意的时该工具方法需要传入一个 options 参数：

```typescript
type IComponentsMap = Record<string, string[]>;

interface IResolverOptions {
  componentsMap: IComponentsMap; // 自己封装的组件依赖 element-plus 组件样式映射
  componentsPath: string; // 组件路径
}
```

这里的 stylesMap 需要用户根据自己封装的组件进行配置，比如 Fanosy 的样式依赖配置如下：

```typescript
const stylesMap = {
  FsButton: ['button'],
  FsCreateSelect: ['button', 'input', 'option', 'select'],
  FsSearchContainer: ['button'],
  FsSelectArea: ['option', 'select', 'space'],
  FsTable: ['table', 'pagination', 'table-column'],
  FsTreeTransfer: ['tree', 'checkbox', 'checkbox-group', 'button', 'input']
};
```

通过如下配置之后我们就可以实现和 element-plus 自动导入一样的效果，只需要在模板使用组件即可

::: danger

`FsTable` 不支持自动导入以及全局导入，具体原因请查看该组件的介绍文档
组件介绍的使用方式统一按照按需导入，如果使用该方法请忽略 script 标签中的组件和样式导入

:::

### 按需导入

Fanosy 提供了基于 ES Module 开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。通过 [Gulp](https://gulpjs.com/) 手动单独打包组件内置样式，因此想用哪个导就完了

需要注意的是：部分基于 element-plus 二次封装的组件依赖原组件样式，因此在使用时请确保安装elmenet-plus并**手动引入对应组件样式**，具体引入的样式文件请查看组件部分文档

```vue
<template>
  <fs-button :time="1000" throttle type="primary">click me!</fs-button>
</template>
<script>
import { FsButton } from 'fanosy';
import 'element-plus/es/components/button/style/css';
export default {
  components: { FsButton }
};
</script>
```

### 全局导入

废话不多说，开导

> 注意如果使用了部分element-plus二次封装的组件别忘了把全局样式也一块导了捏~

```typescript
import { createApp } from 'vue';
import App from './app.vue';
import fanosy from '@fanosy/components';
import 'element-plus/dist/index.css';

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
