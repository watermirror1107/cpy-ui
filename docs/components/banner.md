# Banner 顶部标题

`CBanner` 是页面顶部标题栏。默认显示返回图标和标题，也可以通过默认插槽完全自定义内容。

## 示例

```vue
<c-banner title="实例详情" />

<c-banner :is-can-back="false">
  <span>自定义标题内容</span>
</c-banner>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `String` | `''` |
| `isCanBack` | 是否显示返回图标 | `Boolean` | `true` |

返回图标点击时调用 `$router.back()`。
