# Form 表单

`CForm` 是基于 `a-form-model` 的配置式表单，支持 input、inputNumber、select、span 和 radio 兜底类型，也支持通过插槽自定义表单项。

## 示例

```vue
<c-form
  ref="form"
  v-model="form"
  :form-options="formOptions"
  :rules="rules"
/>
```

```js
export default {
  data() {
    return {
      form: {
        name: '',
        type: undefined
      },
      formOptions: [
        { key: 'name', label: '名称', type: 'input', placeholder: '请输入名称' },
        {
          key: 'type',
          label: '类型',
          type: 'select',
          options: [
            { value: 1, label: '类型一' },
            { value: 2, label: '类型二' }
          ]
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入名称' }]
      }
    }
  }
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 表单数据 | `Object` | - |
| `formOptions` | 表单项配置 | `Array` | `[]` |
| `rules` | 校验规则 | `Object` | - |
| `isValidateOnRuleChange` | rule 变化时是否触发校验 | `Boolean` | `true` |
| `labelCol` | label 栅格 | `Number` | `6` |
| `wrapperCol` | 内容栅格 | `Number` | `18` |
| `offset` | label offset | `Number` | `40` |
| `isColon` | 是否显示冒号 | `Boolean` | `false` |
| `layout` | 表单布局 | `String` | `'horizontal'` |
| `labelAlign` | label 对齐方式 | `String` | `'left'` |

组件暴露 `validate`、`validateField`、`resetFields`、`clearValidate` 方法，对应 `a-form-model` 实例方法。
