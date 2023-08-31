export default {
  '/guide': [
    {
      text: '基础',
      children: [
        {
          text: '设计',
          link: '/guide/design'
        },
        {
          text: '安装',
          link: '/guide/install'
        },
        {
          text: '快速开始',
          link: '/guide/start'
        }
      ]
    },
    {
      text: '进阶',
      children: [
        {
          text: '内置过渡动画',
          link: '/guide/advanced-transitions'
        },
        {
          text: '更新日志',
          link: '/guide/advanced-changelog'
        }
      ]
    }
  ],
  '/component': [
    {
      text: '二次封装组件',
      children: [
        {
          text: 'FsButton 增强版ElButton',
          link: '/component/fs-button'
        }
      ]
    },
    {
      text: '动画组件',
      children: [
        {
          text: 'ListModifyTransition 列表CURD过渡',
          link: '/component/list-modify-transition'
        },
        {
          text: 'ListEnterTransition 列表进入过渡',
          link: '/component/list-enter-transition'
        }
      ]
    },
    {
      text: '数据展示',
      children: [
        {
          text: 'VirtualWaterfall 瀑布流虚拟列表',
          link: '/component/virtual-waterfall'
        }
      ]
    },
    {
      text: '交互组件',
      children: [
        {
          text: 'Drag 拖拽容器',
          link: '/component/drag'
        }
      ]
    }
  ]
};
