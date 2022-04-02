<script>
import CTableBtn from "../CTableBtn";
import {debounce} from "../../utils";

export default {
  name: "CBtnWrap",
  components: {CTableBtn},
  data() {
    return {
      children: []
    }
  },
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
    this.children = this.$slots.default.filter(btn => {
      return btn.componentOptions && btn.componentOptions.tag === 'c-table-btn'//只能放 c-table-btn组件
    })
    //todo 调整大小的时候自适应更改里面的内容，bug 按钮上面绑定的事件会错乱，而且表格只有最后一行会伸缩改变,当从更多中释放出来的时候不会再次触发render
    // const _this=this
    // window.onresize=debounce(function (){
    //     _this.$forceUpdate()
    // },200)
  },
  render(h, context) {
    let width = 0;//获取父容器宽度，如果父容器没有宽度会出现排版问题
    if (this.$parent.$el) {
      width = parseInt(window.getComputedStyle(this.$parent.$el, null).width)-16//减16是因为td的padding8
    }
    let showNum = Math.floor(width / 90)//c-table-btn的最大宽度为90,计算最多能展示几个
    //超过的截取放到更多按钮里面
    this.children.forEach(btn=>{
      btn.componentOptions.propsData.show_type='vertical'//切换成竖直排列因为宽度被调整之后变成水平按钮模式要改回原来的
    })
    if (showNum < this.children.length || (showNum === 0 && width >= 90)) {//最多显示一个的时候显示更多
      //前面不需要隐藏的
      let midIndex=showNum===0?0:(showNum-1)
      let showChildren = this.children.slice(0,  midIndex)
      let hiddenChildren = this.children.slice(midIndex)
      hiddenChildren.forEach(btn => {
        btn.componentOptions.propsData.show_type = 'horizontal'//切换成水平排列
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
      }, this.children)
    }
  }
}
</script>

<style lang="less">
.c_btn_wrap {
  display: flex;
  justify-content:flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 92px; //最小宽度可以显示一个按钮
  overflow: hidden;

  &::after {
    clear: both;
    display: block;
    content: '';
  }
}
</style>
