<script>
import CTableBtn from "../CTableBtn";

export default {
  name: "CBtnWrap",
  components: {CTableBtn},
  props: {
    trigger: {//更多菜单的激活方式
      type: String, default: 'hover'
    },
    placement: {//更多菜单内容张开的位置
      type: String, default: 'bottom'
    }
  },
  methods: {
    translateText(code) {
      let obj = {
        'instance.More': '更多'
      }
      return obj[code] || code
    }
  },
  created() {
    if (!this.$T) {
      this.$T = this.translateText
    }
  },
  render(h, context) {
    //只能放 c-table-btn组件
    let width = 0;//获取父容器宽度
    if (this.$parent.$el) {
      width = parseInt(window.getComputedStyle(this.$parent.$el, null).width)
    }
    let showNum = Math.floor(width / 90)//c-table-btn的最大宽度为90,计算最多能展示几个
    let children = this.$slots.default.filter(item => {
      return item.componentOptions && item.componentOptions.tag === 'c-table-btn'
    })
    //超过的截取放到更多按钮里面
    if (showNum < children.length) {
      //前面不需要隐藏的
      let showChildren = children.slice(0, showNum - 1)
      let hiddenChildren = children.slice(showNum - 1)
      showChildren.forEach(item=>{
        // item.componentOptions.propsData.show_type='vertical'//切换成竖直排列
      })
      hiddenChildren.forEach(item=>{
        item.componentOptions.propsData.show_type='horizontal'//切换成水平排列
      })
      let moreNode = h('a-popover', {
            props: {
              trigger: this.trigger,
              placement: this.placement
            }
          },
          [
            h('template', {slot: 'content'}, hiddenChildren),
            h(CTableBtn, {
              props: {
                icon: 'icon-gengduo',
                text: this.$T('instance.More')
              }
            })
          ]
      )

      return h('div', {
        staticClass: 'c_btn_wrap'
      }, [showChildren, moreNode])
    } else {
      return h('div', {
        staticClass: 'c_btn_wrap'
      }, children)
    }
  }
}
</script>

<style lang="less">
.c_btn_wrap {
  display: flex;
  justify-content: space-around;
  &::after {
    clear: both;
    display: block;
    content: '';
  }
}
</style>
