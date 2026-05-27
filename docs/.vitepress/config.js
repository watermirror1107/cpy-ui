export default {
  title: 'cpy-ui',
  description: '基于 Vue 2 和 ant-design-vue 的企业内部 UI 组件库',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {text: '指南', link: '/guide/getting-started'},
      {text: '组件', link: '/components/'},
      {text: 'GitHub', link: 'https://github.com/'}
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            {text: '快速开始', link: '/guide/getting-started'},
            {text: '设计约定', link: '/guide/conventions'}
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            {text: '组件总览', link: '/components/'},
            {text: 'Banner 横幅', link: '/components/banner'},
            {text: 'Button 按钮', link: '/components/button'},
            {text: 'BtnWrap 表格按钮容器', link: '/components/btn-wrap'},
            {text: 'Card 卡片', link: '/components/card'},
            {text: 'CardItem 卡片项', link: '/components/card-item'},
            {text: 'Duration 时长选择', link: '/components/duration'},
            {text: 'EditableCell 可编辑单元格', link: '/components/editable-cell'},
            {text: 'Ellipsis 文本省略', link: '/components/ellipsis'},
            {text: 'Form 表单', link: '/components/form'},
            {text: 'Icon 图标', link: '/components/icon'},
            {text: 'Input 输入框', link: '/components/input'},
            {text: 'InputNumber 数字输入框', link: '/components/input-number'},
            {text: 'Radio 单选', link: '/components/radio'},
            {text: 'RangePicker 日期范围', link: '/components/range-picker'},
            {text: 'SearchSelect 搜索下拉', link: '/components/search-select'},
            {text: 'Table 表格', link: '/components/table'},
            {text: 'TableBtn 表格按钮', link: '/components/table-btn'},
            {text: 'TableForm 表格筛选', link: '/components/table-form'},
            {text: 'Tabs 选项卡', link: '/components/tabs'},
            {text: 'Tap 数据卡片选项', link: '/components/tap'}
          ]
        }
      ]
    },
    socialLinks: []
  }
}
