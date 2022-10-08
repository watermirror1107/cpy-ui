<!--按钮-->
<script>
import Icon from "../CIcon/index";

export default {
  inheritAttrs: false,
  components: {
    Icon,
  },
  name: "CButton",
  props: {
    icon: {
      default: "",
      type: String,
    },
    tip: {
      default: "",
      type: String,
    },
    placement: {
      default: "top",
      type: String,
    },
    size: {
      default: "default",
      type: String,
    },
  },
  render(h) {
    let children = [h("span", {class: 'c_button_text'}, this.$slots.default)];
    if (this.icon) {
      let icon = h(Icon, {
        class: {c_button_iconSvg: this.$slots.default},
        props: {name: this.icon},
      });
      children.unshift(icon);
    }
    let classNameList = ["c_button"];
    if (this.$attrs.type === "warning") {
      classNameList.push(
          `c_button_warning${this.$attrs.ghost !== undefined ? "_g" : ""}`
      );
    } else if (this.$attrs.type === "success") {
      classNameList.push(
          `c_button_success${this.$attrs.ghost !== undefined ? "_g" : ""}`
      );
    } else if (this.$attrs.type === "danger") {
      classNameList.push(
          `c_button_danger${this.$attrs.ghost !== undefined ? "_g" : ""}`
      );
    } else if (!this.$attrs.type) {
      classNameList.push(
          `c_button_default${this.$attrs.ghost !== undefined ? "_g" : ""}`
      );
    }
    let vnode = h(
        "a-button",
        {
          style: {
            verticalAlign: 'middle',
            // lineHeight: this.size==='default'?'32px':this.size==='small'?'24px':'40px'
          },
          class: classNameList,
          props: {...this.$attrs, size: this.size},
          on: this.$listeners,
        },
        children
    );
    if (this.tip) {
      vnode = h(
          "a-tooltip",
          {
            props: {
              placement: this.placement,
              overlayClassName: "c_button_tip_content",
            },
          },
          [h("p", {slot: "title"}, this.tip), vnode]
      );
    }
    return vnode;
  },
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
  border-radius: 2px!important;
  &_iconSvg {
    margin-right: 8px;
  }

}

.c_button_tip_content {
  .ant-tooltip-inner {
    text-align: left;
  }
}

.c_button_default {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  font-size: 14px;

  &[disabled] {
    opacity: 0.8;
  }

  &:hover:not([disabled='disabled']) {
    border-color: @--main-blue!important;
    color: @--main-blue!important;
  }

  &:focus {
    border-color: #e6e6e6;
    color: currentColor!important;
  }
}

.c_button.ant-btn-primary {
  &:focus{
    background-color: @--main-blue;
  }
}
.ant-btn-primary.ant-btn-background-ghost.c_button{
  border-color:  @--main-blue;
  color:  @--main-blue;;
}

.c_button_warning {
  border-color: @--main-yellow !important;
  color: white !important;
  background-color: @--main-yellow !important;
}

.c_button_warning:hover:not([disabled='disabled']) {
  opacity: 0.8;
}

.c_button_warning_g {
  border-color: @--main-yellow !important;
  color: @--main-yellow !important;
  background-color: transparent !important;
}

.c_button_warning_g:hover:not([disabled='disabled']) {
  opacity: 0.6;
}

.c_button_success {
  border-color: @--main-green !important;
  color: white !important;
  background-color: @--main-green !important;
}

.c_button_success:hover:not([disabled='disabled']) {
  opacity: 0.8;
}

.c_button_success_g {
  border-color: @--main-green !important;
  color: @--main-green !important;
  background-color: transparent !important;
}

.c_button_success_g:hover:not([disabled='disabled']) {
  opacity: 0.6;
}

.c_button_danger {
  border-color: @--main-red !important;
  color: white !important;
  background-color: @--main-red !important;
}

.c_button_danger:hover:not([disabled='disabled']) {
  opacity: 0.8;
}

.c_button_danger_g {
  border-color: @--main-red !important;
  color: @--main-red !important;
  background-color: transparent !important;
}

.c_button_danger_g:hover:not([disabled='disabled']) {
  opacity: 0.6;
}

.c_button[disabled="disabled"] {
  opacity: 0.6;
}
</style>
