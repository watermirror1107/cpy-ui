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
    let classNameList=['c_button']
    if(this.$attrs.type==='warning'){
      classNameList.push(`c_button_warning${this.$attrs.ghost!==undefined?'_g':''}`)
    }
    let vnode = h('a-button', {
      class:classNameList,
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
.c_button_warning{
  border-color: @--main-yellow!important;
  color: white!important;
  background-color: @--main-yellow!important ;
}
.c_button_warning_g{
  border-color: @--main-yellow!important;
  color: @--main-yellow!important;
  background-color: transparent!important ;
}

</style>
