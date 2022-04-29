<script>
import CButton from "../CButton";

export default {
  name: "CBtnGroup",
  components: { CButton },
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
              trigger: this.trigger,
              placement: this.placement,
            },
          },
          [
            h(
              "template",
              { slot: "content" },
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
              CButton,
              {
                props: {
                  icon: "icon-xuanzekuanxia",
                  // text: ,
                },
                class: "c_btn_group_more_btn",
              },
              this.$T("instance.More") || "更多操作"
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
    flex-direction: row-reverse;
    .c_button_iconSvg {
      font-size: 10px;
      margin: 0px 0px 0px 10px;
    }
  }
}
.c_btn_group_more_item {
  width: 108px;

  .c_button {
    width: 100%;
    justify-content: center;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #eee;

    &:hover {
      border-color: #eee;
      background-color: #f5f5f5;
    }
  }
}
</style>
