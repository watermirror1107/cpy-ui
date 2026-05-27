# Form 表单

`CForm` 是配置式表单组件，适合后台详情、创建和编辑页面。

## 基础用法

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
        type: 'vm'
      },
      formOptions: [
        {type: 'input', key: 'name', label: '名称', placeholder: '请输入名称'},
        {
          type: 'select',
          key: 'type',
          label: '类型',
          options: [{value: 'vm', label: '虚机'}]
        }
      ],
      rules: {
        name: [{required: true, message: '请输入名称'}]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate()
    }
  }
}
```

## 支持的 item.type

| 类型 | 说明 |
| --- | --- |
| `input` | 文本输入框 |
| `inputNumber` | 数字输入框 |
| `select` | 下拉选择 |
| `span` | 详情文本展示 |
| 其他值 | 单选组 |

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `Object` | `undefined` | 表单数据 |
| `formOptions` | `Array` | `[]` | 表单项配置 |
| `rules` | `Object` | `undefined` | ant-design-vue 表单校验规则 |
| `isValidateOnRuleChange` | `Boolean` | `true` | 规则变化时是否校验 |
| `labelCol` | `Number` | `6` | label 栅格 |
| `wrapperCol` | `Number` | `18` | 内容栅格 |
| `offset` | `Number` | `40` | label 偏移 |
| `isColon` | `Boolean` | `false` | 是否显示冒号 |
| `layout` | `String` | `'horizontal'` | 表单布局 |
| `labelAlign` | `String` | `'left'` | label 对齐方式 |

## Events

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| `change` | `formData` | 表单数据变化，`v-model` 使用该事件 |

## Methods

| 名称 | 说明 |
| --- | --- |
| `validate()` | 调用底层表单校验 |
| `validateField(props, callback)` | 校验指定字段 |
| `resetFields()` | 重置表单字段 |
| `clearValidate(props)` | 清除校验状态 |

## Slots

每个表单项都可以使用 `key` 同名插槽覆盖默认渲染。

```vue
<c-form v-model="form" :form-options="formOptions">
  <template #name="{ scope }">
    <a-input v-model="form.name" :placeholder="scope.option.placeholder" />
  </template>
</c-form>
```
