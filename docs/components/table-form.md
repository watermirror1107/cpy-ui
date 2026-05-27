# TableForm 表格筛选

`CTableForm` 是表格上方的筛选表单，支持输入框、选择器和日期范围。

## 基础用法

```vue
<c-table-form
  v-model="query"
  :form-options="formOptions"
  @submit="refreshTable"
/>
```

```js
export default {
  data() {
    return {
      query: {
        name: '',
        status: ''
      },
      formOptions: [
        {type: 'input', key: 'name', placeholder: '搜索名称'},
        {
          type: 'select',
          key: 'status',
          placeholder: '状态',
          options: [{value: 'running', label: '运行中'}]
        },
        {type: 'range-picker', key: 'createdAt'}
      ]
    }
  }
}
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `Object` | `undefined` | 筛选数据 |
| `formOptions` | `Array` | `[]` | 筛选项配置 |
| `delay` | `Number` | `500` | submit 防抖延迟 |

## 支持的 item.type

| 类型 | 说明 |
| --- | --- |
| `input` | 搜索输入框 |
| `select` | 下拉选择 |
| `range-picker` | 日期范围 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `formData` | 筛选数据变化，`v-model` 使用该事件 |
| `submit` | - | 防抖后的提交事件 |

## Slots

每个筛选项都可以使用 `key` 同名插槽覆盖默认渲染。
