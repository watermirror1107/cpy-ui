<script>
/**
 * @description:使用注意c-collapse-panel中的插槽最好是使用template包裹作为作用域插槽，目前没兼容name类型的插槽
 */
import Icon from "../CIcon";
import {Collapse} from 'ant-design-vue'

export default {
  name: 'CCollapse',
  inheritAttrs: false,
  components: {
    Icon
  },
  props: {
    activeKey: {default: () => [], type: Array}//todo activeKey不准确
  },
  render(h, context) {
    let children = this.$slots.default.filter(item => {
      return item.componentOptions && item.componentOptions.tag === 'c-collapse-panel'
    })
    return h(Collapse, {
      class: 'c_collapse',
      props: {bordered: false, ...this.$attrs,activeKey:this.activeKey},
      on: this.$listeners
    }, [
      h(Icon, {props: {name: 'icon-xuanzekuanxia'}, slot: 'expandIcon'}),
      children.map(child => {
        let property = {props: child.data.attrs};
        let c_children = [...child.componentOptions.children]
        if (child.data.scopedSlots?.extra) {
          c_children.push(h('template', {slot: 'extra'}, child.data.scopedSlots.extra()))
        }
        if (child.data.scopedSlots?.header) {
          c_children.push(h('template', {slot: 'header'}, child.data.scopedSlots.header()))
        } else if (child.data.attrs?.header) {
          property.props.header = child.data.attrs.header
        }
        return h('a-collapse-panel',property, c_children)
      })
    ])
  }
};
</script>
<style lang="less">
.c_collapse {
  .ant-collapse-header {
    background-color: #E6E6E6;
    text-align: left;
    height: 40px;
    line-height: 40px !important;
    padding: 0 24px !important;

    .ant-collapse-arrow {
      position: unset !important;
      margin-right: 8px;
      transition: all 500ms;
      vertical-align: -8px!important;
    }
  }

  .ant-collapse-item {
    border-bottom: unset !important;
    margin-bottom: 24px;
  }
}
</style>
