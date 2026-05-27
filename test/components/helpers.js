export const AButtonStub = {
  name: 'a-button',
  inheritAttrs: false,
  props: {
    type: String,
    ghost: Boolean,
    disabled: Boolean
  },
  render(h) {
    return h('button', {
      class: 'ant-btn',
      attrs: {
        disabled: this.disabled,
        type: 'button',
        'data-type': this.type,
        'data-ghost': String(Boolean(this.ghost))
      },
      on: this.$listeners
    }, this.$slots.default)
  }
}

export const ATooltipStub = {
  name: 'a-tooltip',
  props: {
    placement: String,
    overlayClassName: String,
    trigger: String
  },
  render(h) {
    return h('div', {
      class: 'a-tooltip-stub',
      attrs: {
        'data-placement': this.placement,
        'data-overlay-class': this.overlayClassName,
        'data-trigger': this.trigger
      }
    }, [
      h('div', {class: 'tooltip-title'}, this.$slots.title),
      this.$slots.default
    ])
  }
}

export const APopoverStub = {
  name: 'a-popover',
  props: {
    visible: Boolean,
    trigger: String,
    placement: String
  },
  render(h) {
    return h('div', {
      class: 'a-popover-stub',
      attrs: {
        'data-visible': String(Boolean(this.visible)),
        'data-trigger': this.trigger,
        'data-placement': this.placement
      }
    }, [
      h('div', {class: 'popover-content'}, this.$slots.content),
      this.$slots.default
    ])
  }
}

export const ARowStub = {
  name: 'a-row',
  render(h) {
    return h('div', {class: 'ant-row'}, this.$slots.default)
  }
}

export const AColStub = {
  name: 'a-col',
  props: {
    span: Number
  },
  render(h) {
    return h('div', {
      class: 'ant-col',
      attrs: {'data-span': this.span}
    }, this.$slots.default)
  }
}

export const AFormModelStub = {
  name: 'a-form-model',
  props: {
    model: Object,
    rules: Object,
    layout: String,
    colon: Boolean,
    labelAlign: String,
    labelCol: Object,
    wrapperCol: Object,
    validateOnRuleChange: Boolean
  },
  methods: {
    validate(callback) {
      if (callback) {
        callback(true)
      }
      return true
    },
    validateField(props, callback) {
      if (callback) {
        callback()
      }
      return props
    },
    resetFields() {
      this.$emit('reset-fields')
    },
    clearValidate(props) {
      this.$emit('clear-validate', props)
    }
  },
  render(h) {
    return h('form', {
      class: 'a-form-model-stub',
      on: this.$listeners
    }, this.$slots.default)
  }
}

export const AFormModelItemStub = {
  name: 'a-form-model-item',
  props: {
    label: String,
    prop: String
  },
  render(h) {
    return h('div', {
      class: 'a-form-model-item-stub',
      attrs: {
        'data-label': this.label,
        'data-prop': this.prop
      }
    }, this.$slots.default)
  }
}

export const AInputStub = {
  name: 'a-input',
  props: {
    value: [String, Number],
    placeholder: String,
    disabled: Boolean,
    type: String,
    id: [String, Number],
    allowClear: Boolean
  },
  render(h) {
    return h('div', {class: 'a-input-wrap-stub'}, [
      this.$slots.prefix,
      h('input', {
        class: 'a-input-stub',
        attrs: {
          id: this.id,
          placeholder: this.placeholder,
          disabled: this.disabled,
          type: this.type || 'text'
        },
        domProps: {
          value: this.value
        },
        on: {
          input: e => this.$emit('input', e.target.value),
          change: e => this.$emit('change', e),
          focus: e => this.$emit('focus', e),
          blur: e => this.$emit('blur', e),
          keydown: e => {
            if (e.key === 'Enter') {
              this.$emit('pressEnter', e)
            }
          }
        }
      }),
      this.$slots.suffix
    ])
  }
}

export const AInputNumberStub = {
  name: 'a-input-number',
  props: {
    value: [String, Number],
    placeholder: String,
    min: Number,
    disabled: Boolean
  },
  render(h) {
    return h('input', {
      class: 'a-input-number-stub',
      attrs: {
        type: 'number',
        placeholder: this.placeholder,
        disabled: this.disabled,
        min: this.min
      },
      domProps: {
        value: this.value
      },
      on: {
        input: e => this.$emit('input', Number(e.target.value))
      }
    })
  }
}

export const ASelectStub = {
  name: 'a-select',
  props: {
    value: [String, Number, Array],
    placeholder: String,
    disabled: Boolean,
    mode: String,
    size: String,
    open: Boolean
  },
  render(h) {
    return h('div', {
      class: 'a-select-stub',
      attrs: {
        'data-placeholder': this.placeholder,
        'data-disabled': String(Boolean(this.disabled)),
        'data-mode': this.mode,
        'data-size': this.size
      },
      on: this.$listeners
    }, [
      this.$slots.dropdownRender,
      this.$slots.default
    ])
  }
}

export const ASelectOptionStub = {
  name: 'a-select-option',
  props: {
    value: [String, Number],
    disabled: Boolean
  },
  render(h) {
    return h('div', {
      class: 'a-select-option-stub',
      attrs: {
        'data-value': this.value,
        'data-disabled': String(Boolean(this.disabled))
      }
    }, this.$slots.default)
  }
}

export const ARadioGroupStub = {
  name: 'a-radio-group',
  props: {
    value: [String, Number, Boolean],
    disabled: Boolean
  },
  render(h) {
    return h('div', {
      class: 'a-radio-group-stub',
      attrs: {
        'data-disabled': String(Boolean(this.disabled))
      }
    }, this.$slots.default)
  }
}

export const ARadioStub = {
  name: 'a-radio',
  props: {
    value: [String, Number, Boolean]
  },
  render(h) {
    return h('label', {
      class: 'a-radio-stub',
      attrs: {
        'data-value': this.value
      }
    }, this.$slots.default)
  }
}

export const ARangePickerStub = {
  name: 'a-range-picker',
  props: {
    value: Array,
    placeholder: Array,
    separator: String,
    mode: Array,
    allowClear: Boolean
  },
  render(h) {
    return h('div', {
      class: 'a-range-picker-stub',
      attrs: {
        'data-separator': this.separator,
        'data-placeholder': this.placeholder && this.placeholder.join(',')
      },
      on: this.$listeners
    })
  }
}

export const ATableStub = {
  name: 'a-table',
  props: {
    columns: Array,
    dataSource: Array,
    loading: Boolean,
    rowSelection: Object
  },
  render(h) {
    return h('div', {
      class: 'a-table-stub',
      attrs: {
        'data-loading': String(Boolean(this.loading)),
        'data-rows': this.dataSource ? this.dataSource.length : 0
      },
      on: this.$listeners
    }, this.$slots.default)
  }
}

export const APaginationStub = {
  name: 'a-pagination',
  props: {
    current: Number,
    pageNo: Number,
    pageSize: Number,
    total: Number,
    showSizeChanger: Boolean,
    showTotal: Function
  },
  render(h) {
    return h('div', {
      class: 'a-pagination-stub',
      attrs: {
        'data-current': this.current,
        'data-page-size': this.pageSize,
        'data-total': this.total
      },
      on: this.$listeners
    }, this.showTotal ? this.showTotal(this.total || 0, [1, this.pageSize || 10]) : '')
  }
}
