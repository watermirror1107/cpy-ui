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
    },
    showNum: {
      type: Number, default: 0
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
    let children = []
    if (this.$slots.default) {
      children = this.$slots.default.filter(item => {
        return item.componentOptions && item.componentOptions.tag === 'c-table-btn'
      })
    }
    if (children.length > 0) {
      // let width = 0;//获取父容器宽度，如果父容器没有宽度会出现排版问题
      // if (this.$parent.$el) {
      //   width = parseInt(window.getComputedStyle(this.$parent.$el, null).width) - 16 - 20//减16是因为td的padding8 margin-left:-20px 为了对齐
      // } else if (this.$parent.$options.propsData.column.width) {//dataSource的是容器初始宽度会为0；如果column中没给width也会为0
      //   width = this.$parent.$options.propsData.column.width
      // }
      // let showNum = Math.floor(width / 80)//c-table-btn的最大宽度为80,计算最多能展示几个
      //超过的截取放到更多按钮里面
      children.forEach(btn => {
        btn.componentOptions.propsData.show_type = 'vertical'//切换成竖直排列因为宽度被调整之后变成水平按钮模式要改回原来的
      })
      if (this.showNum < children.length) {//最多显示一个的时候显示更多
        //前面不需要隐藏的
        let showChildren = children.slice(0, this.showNum).map(btn => {//给展示在外面的按钮添加一个有边框
          btn.componentOptions.propsData.isShowDivision = true
          return btn
        })
        let hiddenChildren = children.slice(this.showNum)
        hiddenChildren.forEach(btn => {
          btn.componentOptions.propsData.show_type = 'horizontal'//切换成水平排列
        })
        let moreNode = h('a-popover', {
              props: {
                overlayClassName:'c_btn_wrap_popover',
                // getPopupContainer: (triggerNode) => triggerNode.parentNode,
                trigger: this.trigger,
                placement: this.placement
              }
            },
            [
              h('template', {slot: 'content'}, hiddenChildren),
              h(CTableBtn, {
                style: {
                  color: '#404960'
                },
                props: {
                  icon: 'icon-genduo',
                  text: ''
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
        }, children.map((btn, index) => {
          btn.componentOptions.propsData.isShowDivision = index !== (children.length - 1)
          return btn
        }))
      }
    } else {
      return h('')
    }
  }
}
</script>

<style lang="less">
.c_btn_wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 92px; //最小宽度可以显示一个按钮
  overflow: hidden;
  margin-left: -20px;

  &::after {
    clear: both;
    display: block;
    content: '';
  }

}

.c_btn_wrap_popover {
  padding: 0;
  .ant-popover-content {

    .ant-popover-arrow {
      display: none !important;
    }

    .ant-popover-inner-content {
      padding: 8px;
    }

    .c_table_btn {
      margin-bottom: 8px;
      border-bottom: unset !important;
      &[disabled='disabled']{
        background-color: #f5f5f5!important;
        opacity: 0.8;
      }
      &:not([disabled='disabled']){
        color: #404960;
        &:hover  {
          color: @--main-blue;
          background-color: #F1F3F5;
        }
      }

    }
  }
}
</style>
