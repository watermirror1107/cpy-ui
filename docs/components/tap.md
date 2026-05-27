# Tap 数据卡片选项

`CTap` 是卡片式数据选项组件，常用于概览统计区域。

## 基础用法

```vue
<c-tap v-model="selectIndex" title="资源状态" :list="list" />
```

```js
export default {
  data() {
    return {
      selectIndex: 0,
      list: [
        {title: '运行中', num: 12, color: '#1279F8', type: 'running', isHoverColor: true},
        {title: '异常', num: 2, color: '#F5222D', type: 'error'}
      ]
    }
  }
}
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `list` | `Array` | 必填 | 卡片数据 |
| `selectIndex` | `Number` | `undefined` | 当前选中项 |
| `title` | `String` | `''` | 外层卡片标题 |

## List Item

| 字段 | 说明 |
| --- | --- |
| `title` | 标题 |
| `num` | 数值 |
| `color` | 主题色 |
| `type` | 额外 class |
| `isHoverColor` | 是否启用 hover 背景透明度变化 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `selectItem` | `index` | 点击卡片时触发，`v-model` 使用该事件 |

## Slots

| 名称 | Slot Props | 说明 |
| --- | --- | --- |
| `topIcon` | `{ scope: item }` | 标题左侧图标区域 |
| `bottomIcon` | `{ scope: item }` | 卡片底部图标区域 |
