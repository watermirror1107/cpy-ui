# Card 卡片

## CCard

内容卡片容器，支持标题、更多操作和插槽扩展。

```vue
<c-card title="资源概览" more="更多" @more="goMore">
  <div>卡片内容</div>
</c-card>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `String` | `''` |
| `more` | 右侧更多文本 | `String` | `''` |
| `isBorder` | 标题栏是否显示底边框 | `Boolean` | `false` |

| 事件 | 说明 |
| --- | --- |
| `more` | 点击右侧更多区域触发 |

| 插槽 | 说明 |
| --- | --- |
| `default` | 卡片内容 |
| `title` | 自定义标题 |
| `more` | 自定义更多区域 |

## CCardItem

卡片内的 label/value 展示行。

```vue
<c-card-item :data="{ title: '状态', value: '运行中' }" />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | `{ title, value }` 数据 | `Object` | - |
| `span` | 标题列栅格宽度 | `Number` | `3` |
| `offset` | 预留偏移参数 | `Number` | `0` |
