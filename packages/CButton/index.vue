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
    } else if (this.$attrs.type === "text") {
      classNameList.push(
          `c_button_txt${this.$attrs.ghost !== undefined ? "_g" : ""}`
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
  background: @--main-white;
  border: @--cpy-border-style;
  font-size: 14px;

  &[disabled] {
    opacity: 0.8;
  }

  &:hover:not([disabled='disabled']) {
    border-color:@--cpy-theme-color!important;
    color: @--cpy-theme-color!important;
  }

  &:focus {
    border-color: @--cpy-gray;
    color: currentColor!important;
  }
}

.c_button.ant-btn-primary {
  &:focus{
    background-color:@--cpy-theme-color;
  }
}
.ant-btn-primary.ant-btn-background-ghost.c_button{
  border-color:  @--cpy-theme-color;
  color: @--cpy-theme-color;
}


.c_button_txt:hover:not([disabled='disabled']) {
  opacity: 0.8;
  border-color: @--cpy-theme-color !important;
  color: @--cpy-theme-color !important;
}

.c_button_txt_g:hover:not([disabled='disabled']) {
  opacity: 0.6;
  border-color: @--cpy-theme-color !important;
  color: @--cpy-theme-color !important;
}

.c_button_warning {
  border-color: @--main-yellow !important;
  color: @--main-white !important;
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
  color: @--main-white !important;
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
  color: @--main-white !important;
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
  background: @--cpy-disabled-color;
  color:@--cpy-disabled-font-color2;
}
</style>
