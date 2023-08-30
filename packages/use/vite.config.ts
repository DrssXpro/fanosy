import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
export default defineConfig({
  build: {
    //压缩
    minify: false,
    rollupOptions: {
      external: ['vue', '@sorarain/utils'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: resolve(__dirname, './dist/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, './dist/lib')
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'fanosyutils'
    }
  },

  plugins: [
    dts({
      outDir: [
        resolve(__dirname, './dist/es'),
        resolve(__dirname, './dist/lib')
      ]
    })
  ]
});
