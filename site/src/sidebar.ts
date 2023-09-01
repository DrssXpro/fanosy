export default {
  '/guide': [
    {
      text: '基础',
      children: [
        {
          text: '灵感',
          link: '/guide/inspiration'
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
      text: '开发',
      children: [
        {
          text: '开发指南',
          link: '/guide/dev'
        }
      ]
    }
  ],
  '/component': [
    {
      text: '业务组件',
      children: [
        {
          text: 'FsButton 增强版ElButton',
          link: '/component/fs-button'
        },
        {
          text: 'FsCreateSelect 创建选项下拉框',
          link: '/component/fs-create-select'
        },
        {
          text: 'FsSelectArea 省市区选择器',
          link: '/component/fs-select-area'
        }
      ]
    },
    {
      text: '虚拟列表相关',
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
    }
  ]
};
