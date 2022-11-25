<!--全局弹窗样式-->
<script>
import Icon from "../CIcon/index.vue";
import Vue from "vue";
import {Modal, Button} from 'ant-design-vue'

export default {
  name: 'CModal',
  render(h) {
    let children = [];
    //title
    if (this.isSlotTitle || this.title) {
      let titleChildren = null
      if (this.isSlotTitle) {//有插槽
        titleChildren = this.$slots.title[0].tag ? this.$slots.title : this.$scopedSlots.title()
      } else if (this.title instanceof Function) {//render
        titleChildren = [this.title(h)]
      } else if (this.title) {//props
        titleChildren = [this.title]
        if (this.icon) {
          titleChildren.unshift(h(Icon, {props: {name: this.icon}, style: {marginRight: '8px'}}))
        }
      }
      let title = h('p', {class: 'c_modal_title'}, titleChildren)
      children.push(title)
    }
    //content
    let content = null
    // 是否要居中对齐
    let className = ['c_model_content']
    if (this.$slots.default || this.content) {
      if (this.$slots.default) {
        content = this.$slots.default
      } else if (this.content instanceof Function) {
        content = [this.content(h)]
      } else if (this.content) {
        className.push('c_model_content-center')
        content = this.content
      }
      children.push(h('p', {class: className}, content))
    }
    //footer
    if (this.isSlotFooter || this.footer) {
      //当footer为布尔真的时候，会填充默认内容,不支持字符串填充，需要的字符串填充用插槽，或者render
      let footerChildren = [
        h(Button, {
          class: ['c_modal_footer_cancel', 'c_modal_footer_btn'],
          props: {type: 'text'},
          on: {
            'click': this.closeModal
          }
        }, this.cancelText),
        h(Button, {
          class: ['c_modal_footer_ok', 'c_modal_footer_btn'],
          props: {type: 'primary', loading: this.isConfirmLoading, disabled: this.isConfirmLoading},
          on: {
            'click': this.ok
          }
        }, this.okText)
      ]
      if (this.isSlotFooter) {
        footerChildren = this.$slots.footer[0].tag ? this.$slots.footer : this.$scopedSlots.footer()
      } else if (this.footer instanceof Function) {
        footerChildren = [this.footer(h)]
      }
      children.push(h('div', {class: 'c_modal_footer'}, footerChildren))
    }
    return h(Modal, {
      class: 'c_modal',
      props: {
        width: this.width,
        footer: null,
        closable: false,
        visible: this.isVisible,
        destroyOnClose: this.isDestroy,
        title: null,
      },
      on: {
        cancel: this.closeModal
      }
    }, children)
  },
  components: {Icon},
  model: {
    prop: 'isVisible',
    event: 'change'
  },
  props: {
    icon: {type: String, default: ''},
    content: {default: ''},
    title: {default: ''},
    ok: {
      type: Function, default: () => {
      }
    },
    cancel: {
      type: Function, default: () => {
      }
    },
    footer: {default: true},
    isVisible: {type: Boolean, default: false},
    isDestroy: {type: Boolean, default: true},
    isConfirmLoading: {type: Boolean, default: false},
    width: {type: Number, default: 376},
    cancelText: {type: String, default: Vue.prototype.$T ? Vue.prototype.$T('instance.Cancel') : '取消'},
    okText: {type: String, default: Vue.prototype.$T ? Vue.prototype.$T('instance.Confirm') : '确定'}
  },
  computed: {
    isSlotTitle() {
      return Boolean(this.$slots.title || this.$scopedSlots.title);
    },
    isSlotFooter() {
      return Boolean(this.$slots.footer || this.$scopedSlots.footer);
    }
  }, 
  methods: {
    /**
     * @description:关闭弹窗
     */
    closeModal() {
      this.$emit('change', false)
      this.cancel()
    }
  }
};
</script>

<style lang="less">
.c_modal {
  &_title {
    text-align: center;
    color: #323232;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_content {
    color: #646464;
    text-align: center;
  }

  &_footer {
    margin-top: 26px;
    display: flex;
    justify-content: center;

    &_cancel {
      color: #646464;
      margin-right: 12px;
      border: unset;
      background-color: #F1F2F6;

      &:hover {
        background-color: #eee;
        color: #333333;
      }
    }
  }
}

</style>
