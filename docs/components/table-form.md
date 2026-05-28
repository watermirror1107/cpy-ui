# TableForm 表格筛选

`CTableForm` 是表格查询条件栏，支持 input、select、range-picker，并在表单数据变化后 debounce 触发 `submit`。

## 示例

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
        keyword: '',
        type: undefined,
        date: []
      },
      formOptions: [
        { key: 'keyword', type: 'input', placeholder: '搜索名称' },
        {
          key: 'type',
          type: 'select',
          placeholder: '请选择类型',
          options: [{ value: 1, label: '类型一' }]
        },
        {
          key: 'date',
          type: 'range-picker',
          placeholder: ['开始日期', '结束日期'],
          format: 'YYYY-MM-DD'
        }
      ]
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `data` | 表单数据，也是 `v-model` prop | `Object` | - |
| `formOptions` | 筛选项配置 | `Array` | `[]` |
| `delay` | submit debounce 延迟 | `Number` | `500` |

| 事件 | 说明 |
| --- | --- |
| `change` | 表单数据变化时触发 |
| `submit` | debounce 后触发 |
