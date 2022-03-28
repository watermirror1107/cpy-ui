<!--表格按钮-->
<script>
import icon from '../CIcon/index.vue'

export default {
  name: 'CTableBtn',
  inheritAttrs: false,
  render(h, context) {
    let children = this.$slots.default ? this.$slots.default : [
      h(icon, {props: {name: this.icon}}), h('p', {class: ['c_table_btn_text']}, this.text)
    ]
    let vnode = h('a-button', {
      class: ['c_table_btn', `c_table_btn_${this.show_type}`],
      props: {...this.$attrs,ghost:this.$attrs.type==='danger'},//danger的时候要设置ghost不然样式不好看
      on: this.$listeners,
    }, children)
    if (this.tip) {
      vnode = h('a-tooltip', {
        props: {
          placement: this.placement,
          trigger: this.trigger
        }
      }, [
        h('p', {slot: 'title'}, this.tip),
        vnode
      ])
    }
    return vnode
  },
  components: {
    icon
  },
  props: {
    show_type: {type: String, default: 'vertical'},
    tip: {type: String, default: ''},
    placement: {type: String, default: 'top'},
    trigger: {type: String, default: 'hover'},
    icon: {type: String, default: 'icon-shilixiangqing_bianji'},
    text: {type: String, default: 'button'}
  }
}
</script>

<style lang="less">
.c_table_btn:hover {
  background-color: #f5f5f5 !important
}

.c_table_btn.ant-btn {
  border: none;
  box-shadow: none;
  background-color: transparent;
}

.c_table_btn {
  &_text {
    margin-bottom: 0;
  }
}

.c_table_btn_vertical {
  max-width: 90px;
  overflow: hidden;
  height: 60px;

  p {
    width: 100%;
    text-align: left;
    line-height: 16px;
    height: 32px;
    overflow : hidden;
    white-space: break-spaces;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.c_table_btn_horizontal {
  width: 100%;
  max-width: 200px;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee!important;
  border-radius: 0;
  .c_icon {
    margin-right: 8px;
    flex-shrink: 0;
  }

  p {
    white-space: nowrap;
    flex:1;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
  }
  &:last-child{
    border-bottom: unset!important;
  }
}


.c_table_btn.ant-btn[ant-click-animating-without-extra-node]:after {
  .ButtonWithoutAnimation()
}

.c_table_btn.ant-btn[disabled='disabled'] {
  color: #e6e6e6;
}

.c_table_btn.ant-btn[disabled='disabled']:hover {
  background-color: transparent !important;
}

.ButtonWithoutAnimation {
  border: 0 none;
  opacity: 0;
  animation: none 0 ease;
}


</style>
