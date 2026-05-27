# Banner 横幅

`CBanner` 用于页面顶部标题区域，默认带返回图标。

## 基础用法

```vue
<c-banner title="订单详情" />
<c-banner title="订单详情" :is-can-back="false" />
```

## 自定义内容

```vue
<c-banner>
  <strong>自定义标题</strong>
</c-banner>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `String` | `''` | 标题 |
| `isCanBack` | `Boolean` | `true` | 是否显示返回图标 |

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 覆盖默认标题和返回图标 |

## 注意

点击返回图标会调用 `$router.back()`，使用默认返回能力时需要业务项目注入 Vue Router。
