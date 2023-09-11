import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { componentsLibResolver } from '@fanosy/utils';
import { stylesMap } from './config';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        componentsLibResolver({
          componentsMap: stylesMap,
          componentsPath: `@fanosy/components/src`
        })
      ]
    })
  ]
});
