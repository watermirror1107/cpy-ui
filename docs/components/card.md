# Card 卡片

`CCard` 是内容展示容器，支持标题、更多入口和自定义头部内容。

## 基础用法

```vue
<c-card title="资源概览" more="更多" @more="goMore">
  <div>卡片内容</div>
</c-card>
```

## 自定义标题和更多

```vue
<c-card>
  <template slot="title">
    <span>自定义标题</span>
  </template>
  <template slot="more">
    <c-button type="link">查看全部</c-button>
  </template>
</c-card>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `String` | `''` | 标题 |
| `isBorder` | `Boolean` | `false` | 头部是否显示下边框 |
| `more` | `String` | `''` | 更多入口文案 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `more` | - | 点击更多区域时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 卡片内容 |
| `title` | 自定义标题 |
| `more` | 自定义更多区域 |
