import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    //打包文件目录
    outDir: 'es',
    //压缩
    //minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: [
        'vue',
        /\.scss/,
        'element-plus',
        '@element-plus/icons-vue',
        'nanoid',
        '@fanosy/use',
        '@fanosy/utils'
      ],
      input: ['index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../fanosy/es'
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: '../fanosy/lib'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'library'
    }
  },
  plugins: [
    vue(),
    dts({
      entryRoot: resolve(__dirname, './index.ts'),
      copyDtsFiles: true,
      outDir: ['../fanosy/es/src', '../fanosy/lib/src']
    }),
    {
      name: 'style',
      generateBundle(_, bundle) {
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          this.emitFile({
            type: 'asset',
            fileName: key,
            source: bundler.code.replace(/\.scss/g, '.css')
          });
        }
      }
    }
  ]
});
