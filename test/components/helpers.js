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
