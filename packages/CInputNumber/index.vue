<!--数字输入框-->
<template>
  <div class="c_inputNumber" :class="'c_inputNumber_' + size">
    <div class="c_inputNumber_box">
      <div
        class="c_inputNumber_container"
        :class="{
          c_inputNumber_container_disabled: disabled,
          ['c_inputNumber_container_' + type]: true,
        }"
      >
        <button
          class="
            c_inputNumber_container_button c_inputNumber_container_button_cut
          "
          :disabled="disabled || value <= min"
          type="button"
          @click="reduce"
        >
          <icon v-if="type !== 'one'" name="icon-jian"></icon>
          <icon v-else name="icon-xuanzekuanxia"></icon>
        </button>
        
        <input
          class="c_inputNumber_container_input"
          ref="input"
          :disabled="disabled"
          :value="value"
          type="number"
          @input="inputChangeValue"
          @blur="blurChangeValue"
        />
        
        <button
          class="
            c_inputNumber_container_button c_inputNumber_container_button_add
          "
          :disabled="disabled || value >= max"
          type="button"
          @click="plus"
        >
          <icon v-if="type !== 'one'" name="icon-jia"></icon>
          <icon v-else name="icon-shousuodaohang"></icon>
        </button>
      </div>
    </div>
    <span class="c_inputNumber_unit" :showType="type" v-if="unit">{{
      unit ? unit : ""
    }}</span>
  </div>
</template>

<script>
import Icon from "../CIcon/index.vue";

export default {
  name: "CInputNumber",
  components: {
    Icon,
  },
  props: {
    type: { default: "one", type: String },
    isInteger: { default: true, type: Boolean },
    disabled: { default: false, type: Boolean },
    step: { default: 1, type: Number },
    max: { default: 4096, type: Number },
    min: { default: 1, type: Number },
    unit: { default: "", type: String },
    size: { default: "large", type: String },
    value: { default: "large", type: [String, Number] },
  },
  model: {
    event: "valChange",
    prop: "value",
  },
  watch: {
    value() {
      this.$emit("change");
    },
  },
  methods: {
    /**
     * @description:输入框内容改变
     */
    inputChangeValue(ev) {
      if (this.isInteger) {
        const { value } = ev.target;
        this.$nextTick(() => {
          this.$refs.input.value = this.isInteger ? parseInt(value) : value;
        });
      }
    },

    /**
     * @description:失去焦点
     */
    blurChangeValue(ev) {
      let { value } = ev.target;
      if (value > this.max) {
        value = this.max;
        ev.target.value = this.max;
      }
      if (value < this.min) {
        value = this.min;
        ev.target.value = this.min;
      }
      this.$emit("valChange", this.isInteger ? parseInt(value) : value);
    },

    reduce() {
      const { value, min, step } = this;
      const res = Number(value) - step;
      this.$emit("valChange", res < min ? min : res);
    },

    plus() {
      const { value, max, step } = this;
      const res = Number(value) + step;
      this.$emit("valChange", res > max ? max : res);
    },
  },
};
</script>

<style lang="less">
.c_inputNumber {
  display: block;
  font-size: 14px;
  min-width: 150px;
  position: relative;
  width: 100%;
  &:after {
    clear: both;
    display: block;
    content: "";
  }

  &_box {
    display: flex;
    //overflow: hidden;
    float: left;
    line-height: inherit;
    height: inherit;
    width: 100%;
  }

  &_unit {
    height: inherit;
    line-height: inherit;
    width: 40px;
    text-align: center;
    color: #c8c8c8;
    position: absolute;
  }
  &_unit[showType="one"] {
    right: 50px;
  }
  &_unit[showType="two"] {
    right: 45px;
  }
  &_container {
    overflow: hidden;
    border-collapse: collapse;
    line-height: inherit;
    height: inherit;
    border-radius: 3px;
    color: #323232;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    display: flex;
    align-items: center;

    &_input[disabled] {
      cursor: not-allowed;
    }

    &_input[type="number"]::-webkit-inner-spin-button,
    &_input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /*** 消除input元素 type="number" 时默认的 加减按钮---moz版*/

    &_input[type="number"] {
      flex-grow: 1;
      border: unset;
      outline: none;
      width: 100%;
      -moz-appearance: textfield;
      height: calc(100% - 2px);
      line-height: calc(100% - 2px);
      padding-left: 10px;
      background-color: transparent;
      text-align: left;
      border: unset !important;
    }

    &_button {
      color: #646464;
      font-size: 10px;
      text-align: center;
      cursor: pointer;
      outline: none;
      background-color: transparent;
      border-color: transparent;
      box-sizing: content-box;
      width: 40px;
    }

    &_button[disabled] {
      background-color: #e6e6e6;
      color: #c8c8c8;
      cursor: not-allowed;
    }
  }

  &_container_one {
    justify-content: space-between;
    position: relative;
    .c_inputNumber_container_input {
      padding-right: 85px;
    }

    .c_inputNumber_container_button {
      position: absolute;
      display: flex;
      width: 32px;
      justify-content: center;
      align-items: center;
      right: 0;
      height: 50%;
      border-left: 1px solid #e6e6e6;
    }

    .c_inputNumber_container_button_add {
      border-bottom: 1px solid #e6e6e6;
      top: -5px;
    }

    .c_inputNumber_container_button_cut {
      top: 47%;
    }
  }

  &_container_two {
    .c_inputNumber_container_input {
      padding-right: 40px;
      flex-grow: 1;
      width: 100%;
    }
    .c_inputNumber_container_button_cut {
      flex-shrink: 0;
      border-right: 1px solid #e6e6e6;
    }
    .c_inputNumber_container_button_add {
      flex-shrink: 0;
      border-left: 1px solid #e6e6e6;
    }
  }

  &_container_disabled {
    opacity: 0.5;
  }
}
.c_inputNumber_large {
  height: 40px;
  line-height: 40px;
}

.c_inputNumber_small {
  height: 32px;
  line-height: 32px;
}

.c_inputNumber_large {
  height: 40px;
  line-height: 40px;
}

.c_inputNumber_small {
  height: 32px;
  line-height: 32px;
}
</style>
