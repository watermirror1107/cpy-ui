<script>
import Button from "../CButton";

export default {
  name: "CBtnGroup",
  components: {Button},
  props: {
    trigger: {
      //更多菜单的激活方式
      type: String,
      default: "hover",
    },
    placement: {
      //更多菜单内容张开的位置
      type: String,
      default: "bottom",
    },
    showNum: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    translateText(code) {
      let obj = {
        "instance.More": "更多操作",
      };
      return obj[code] || code;
    },
  },
  created() {
    if (!this.$T) {
      this.$T = this.translateText;
    }
  },
  render(h, context) {
    let children = [];
    if (this.$slots.default) {
      children = this.$slots.default.filter((item) => {
        return (
            item.componentOptions && item.componentOptions.tag === "c-button"
        );
      });
    }
    if (children.length > 0) {
      let showNum = this.showNum;
      //超过的截取放到更多按钮里面
      if (showNum < children.length || showNum === 0) {
        //最多显示一个的时候显示更多
        //前面不需要隐藏的
        let midIndex = showNum === 0 ? 0 : showNum;
        let showChildren = children.slice(0, midIndex);
        let hiddenChildren = children.slice(midIndex);
        let moreNode = h(
            "a-popover",
            {
              props: {
                getPopupContainer: (triggerNode)=>triggerNode.parentNode,
                trigger: this.trigger,
                placement: this.placement,
              },
            },
            [
              h(
                  "template",
                  {slot: "content"},
                  hiddenChildren.map((item) => {
                    return h(
                        "div",
                        {
                          class: "c_btn_group_more_item",
                        },
                        [item]
                    );
                  })
              ),
              h(
                  Button,
                  {
                    props: {
                      icon: "icon-xuanzekuanxia",
                    },
                    class: "c_btn_group_more_btn"
                  },
                  this.$T("instance.More")
              ),
            ]
        );
        return h(
            "div",
            {
              staticClass: "c_btn_group",
            },
            [showChildren, moreNode]
        );
      } else {
        return h(
            "div",
            {
              staticClass: "c_btn_group",
            },
            children
        );
      }
    } else {
      return h("");
    }
  },
};
</script>

<style lang="less">
.c_btn_group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: 92px; //最小宽度可以显示一个按钮
  overflow: hidden;

  .c_button {
    margin-right: 15px;
  }

  &::after {
    clear: both;
    display: block;
    content: "";
  }

  .c_btn_group_more_btn {
    display: flex;
    flex-direction: row-reverse;

    .c_button_iconSvg {
      font-size: 10px;
      margin: 0 0 0 10px;
    }
  }
  .ant-popover-arrow{
    opacity: 0;
  }
  .ant-popover-inner{
    padding: 8px;
  }
  .c_btn_group_more_item {
    line-height: 36px;
    height: 36px;
    margin-bottom: 8px;
    &:last-child{
      margin-bottom: 0;
    }
    .c_button{
      margin-right: 0;
      justify-content: flex-start;
      text-align: left;
      box-shadow: none;
      width: 100%;
      border: none;
      border-radius: 0;
      height: 36px;
      line-height: 36px;
      &:not([disabled='disabled'])  {
        &:hover {
          border-color: #eee;
          background-color: #F1F3F5!important;
          opacity: 1;
        }
      }
    }
    .c_button[class$='_g'][disabled='disabled']{
      background-color: #f5f5f5!important;
    }
  }
}




</style>
