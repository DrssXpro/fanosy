import { App } from 'vue';
import * as components from './src/index';
export * from './src/index';

export default {
  install: (app: App) => {
    const keys = Object.keys(components) as (keyof typeof components)[];
    keys.forEach((k) => {
      // 暂未解决：3.3泛型组件无法直接注册（泛型无法传递），暂且将 table 组件跳过全局注册
      typeof components[k] === 'object' &&
        k !== 'FsTable' &&
        app.component(components[k].name, components[k]);
    });
  }
};
