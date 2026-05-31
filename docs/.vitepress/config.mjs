import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

const vitepressVue = fileURLToPath(new URL('../../node_modules/vitepress/node_modules/vue/dist/vue.runtime.esm-bundler.js', import.meta.url))
const vitepressServerRenderer = fileURLToPath(new URL('../../node_modules/vitepress/node_modules/vue/server-renderer/index.js', import.meta.url))
const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  title: 'cpy-ui',
  description: 'Vue 2 + ant-design-vue component library',
  lang: 'zh-CN',
  base,
  themeConfig: {
    logo: `${base}logo.svg`,
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '项目分析', link: '/analysis' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '构建发布', link: '/guide/build' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件总览',
          items: [
            { text: '组件清单', link: '/components/' }
          ]
        },
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Banner 顶部标题', link: '/components/banner' },
            { text: 'Card 卡片', link: '/components/card' }
          ]
        },
        {
          text: '表单输入',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入', link: '/components/input-number' },
            { text: 'Radio 单选', link: '/components/radio' },
            { text: 'Duration 时长选择', link: '/components/duration' },
            { text: 'RangePicker 时间范围', link: '/components/range-picker' },
            { text: 'SearchSelect 搜索选择', link: '/components/search-select' },
            { text: 'Form 表单', link: '/components/form' }
          ]
        },
        {
          text: '业务组件',
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'TableForm 表格筛选', link: '/components/table-form' },
            { text: 'TableBtn 表格按钮', link: '/components/table-btn' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Tap 统计卡片', link: '/components/tap' },
            { text: 'Ellipsis 省略文本', link: '/components/ellipsis' },
            { text: 'EditableCell 可编辑单元格', link: '/components/editable-cell' }
          ]
        }
      ]
    },
    socialLinks: []
  },
  vite: {
    resolve: {
      alias: [
        { find: 'vue/server-renderer', replacement: vitepressServerRenderer },
        { find: 'vue', replacement: vitepressVue }
      ]
    }
  }
})
