# Tabs 选项卡

`CTabs` 基于 `a-tabs` 封装，使用数组配置页签。

## 基础用法

```vue
<c-tabs v-model="activeTab" :tabs="tabs" />
```

```js
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        {name: '概览'},
        {name: '日志'}
      ]
    }
  }
}
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `tabs` | `Array` | `undefined` | 页签配置，元素需包含 `name` |
| `value` | `Number` | `0` | 当前激活 key |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `index` | 点击页签时触发，`v-model` 使用该事件 |
