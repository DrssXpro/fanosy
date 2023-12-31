import { defineUserConfig, defaultTheme } from 'vuepress';
import sidebar from '../../src/sidebar';
import { searchPlugin } from '@vuepress/plugin-search';
import { getDirname, path } from '@vuepress/utils';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/images/bg.jpg' }]],
  theme: defaultTheme({
    logo: '/images/bg.jpg',
    repo: 'https://github.com/DrssXpro/fanosy/tree/main/packages/components',
    docsRepo: 'https://github.com/DrssXpro/fanosy/tree/main/site',
    docsBranch: 'main',
    colorModeSwitch: false,
    notFound: ['页面走丢了捏~'],
    navbar: [
      {
        text: '灵感来源',
        link: '/guide/inspiration'
      },
      {
        text: '组件',
        link: '/component/fs-button'
      },
      {
        text: 'Use',
        link: '/use/use-element-rect'
      },
      {
        text: 'Utils',
        link: '/utils'
      }
    ],
    sidebar
  }),
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Fanosy',
      description: '基于Vue3.3的功能性组件库'
    }
  },
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索'
        }
      }
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ],
  port: 2444
});
