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
  },
  render(h) {
    let children = [h("div", this.$slots.default)];
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
          class: classNameList,
          props: this.$attrs,
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
  color: #0048ff;
  font-size: 14px;

  &[disabled] {
    // background: #fff;
    // color: #aac0fe;
    opacity: 0.8;

    &:hover {
      color: #ccdaff;
      background: #fff;
    }
  }

  &:hover {
    border-color: @--main-blue;
    color: @--main-blue;
  }

  &:focus {
    border-color: #e6e6e6;
    color: @--main-blue;
  }
}

.c_button.ant-btn-primary:focus {
  background-color: @--main-blue;
}

.c_button_warning {
  border-color: @--main-yellow !important;
  color: white !important;
  background-color: @--main-yellow !important;
}

.c_button_warning:hover {
  opacity: 0.8;
}

.c_button_warning_g {
  border-color: @--main-yellow !important;
  color: @--main-yellow !important;
  background-color: transparent !important;
}

.c_button_warning_g:hover {
  opacity: 0.6;
}

.c_button_success {
  border-color: @--main-green !important;
  color: white !important;
  background-color: @--main-green !important;
}

.c_button_success:hover {
  opacity: 0.8;
}

.c_button_success_g {
  border-color: @--main-green !important;
  color: @--main-green !important;
  background-color: transparent !important;
}

.c_button_success_g:hover {
  opacity: 0.6;
}

.c_button_danger_g {
  border-color: @--main-red !important;
  color: @--main-red !important;
  background-color: transparent !important;
}

.c_button_danger_g:hover {
  opacity: 0.6;
}

.c_button[disabled="disabled"] {
  opacity: 0.6;
}
</style>
