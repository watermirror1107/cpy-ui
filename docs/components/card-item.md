# CardItem 卡片项

`CCardItem` 用于在卡片中展示一条标题和值。

## 基础用法

```vue
<c-card-item :data="{ title: 'CPU', value: '8核' }" />
```

## 自定义内容

```vue
<c-card-item :data="{ title: '状态', value: status }">
  <a-tag color="green">运行中</a-tag>
</c-card-item>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `Object` | `undefined` | 展示数据，包含 `title`、`value` |
| `span` | `Number` | `3` | 标题列 span |
| `offset` | `Number` | `0` | 预留属性 |

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 自定义值区域 |
