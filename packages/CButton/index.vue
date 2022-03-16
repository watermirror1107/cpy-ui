<!--按钮-->
<script>
import Icon from '../CIcon/index'
export default {
  inheritAttrs:false,
  components: {
    Icon
  },
  name: 'CButton',
  props: {
    icon: {
      default: '',
      type: String
    },
    tip: {
      default: '',
      type: String
    },
    placement: {
      default: 'top',
      type: String
    }
  },
  render(h) {
    let children = [h('div',this.$slots.default)]
    if (this.icon) {
      let icon=h(Icon, {class: {'c_button_iconSvg': this.$slots.default}, props: {name: this.icon}})
      children.unshift(icon)
    }
    let vnode = h('a-button', {
      class: 'c_button',
      props:this.$attrs,
      on:this.$listeners
    }, children)
    if (this.tip) {
      vnode = h('a-tooltip', {
        props: {
          placement: this.placement
        }
      }, [
        h('p', {slot: 'title'}, this.tip),
        vnode
      ])
    }
    return vnode
  }
};
</script>
<style lang="less">

.c_button {
  display: flex;
  align-items: center;
  outline: none;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;

  &_iconSvg {
    margin-right: 8px;
  }
}

</style>
