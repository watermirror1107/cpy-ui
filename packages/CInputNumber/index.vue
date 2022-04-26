<!--数字输入框-->
<template>
<!-- todo 修改样式 -->
  <div
      class="c_inputNumber"
      :class="'c_inputNumber_'+size">
    <div class="c_inputNumber_box">
      <div
          class="c_inputNumber_container"
          :class="{c_inputNumber_container_disabled:disabled}">
        <button
            class="c_inputNumber_container_button"
            :disabled="disabled||value<=min"
            type="button"
            style="border-right: 1px solid #E6E6E6;"
            @click="reduce">
          <icon name="icon-jian"></icon>
        </button>
        <input
            class="c_inputNumber_container_input"
            ref="input"
            :disabled="disabled"
            :value="value"
            type="number"
            @input="inputChangeValue"
            @blur="blurChangeValue">
        <button
            class="c_inputNumber_container_button"
            :disabled="disabled||value>=max"
            style="border-left: 1px solid #E6E6E6;"
            type="button"
            @click="plus">
          <icon name="icon-jia"></icon>
        </button>
      </div>
    </div>
    <span
        class="c_inputNumber_unit"
        v-if="unit">{{ unit ? unit : '' }}</span>
  </div>
</template>

<script>
import Icon from '../CIcon/index.vue';

export default {
  name: 'CInputNumber',
  components: {
    Icon
  },
  props: {
    isInteger: {default: true, type: Boolean},
    disabled: {default: false, type: Boolean},
    step: {default: 1, type: Number},
    max: {default: 4096, type: Number},
    min: {default: 1, type: Number},
    unit: {default: '', type: String},
    size: {default: 'large', type: String},
    value: {default: 'large', type: [String, Number]},
  },
  model: {
    event: 'valChange',
    prop: 'value'
  },
  watch: {
    value() {
      this.$emit('change');
    }
  },
  methods: {
    /**
     * @description:输入框内容改变
     */
    inputChangeValue(ev) {
      if (this.isInteger) {
        const {value} = ev.target;
        this.$nextTick(() => {
          this.$refs.input.value = this.isInteger ? parseInt(value) : value;
        });
      }
    },

    /**
     * @description:失去焦点
     */
    blurChangeValue(ev) {
      let {value} = ev.target;
      if (value > this.max) {
        value = this.max;
        ev.target.value = this.max;
      }
      if (value < this.min) {
        value = this.min;
        ev.target.value = this.min;
      }
      this.$emit('valChange', this.isInteger ? parseInt(value) : value);
    },

    reduce() {
      const {
        value,
        min,
        step
      } = this;
      const res = Number(value) - step;
      this.$emit('valChange', res < min ? min : res);
    },

    plus() {
      const {
        value,
        max,
        step
      } = this;
      const res = Number(value) + step;
      this.$emit('valChange', res > max ? max : res);
    }
  }
};
</script>

<style lang="less">
.c_inputNumber_large {
  height: 40px;
  line-height: 40px;
}

.c_inputNumber_small {
  height: 32px;
  line-height: 32px;
}
.c_inputNumber {
  display: block;
  font-size: 14px;

  &:after {
    clear: both;
    display: block;
    content: '';
  }

  &_box {
    display: flex;
    overflow: hidden;
    float: left;
    line-height: inherit;
    height: inherit;
    width: calc(100% - 40px);
  }

  &_unit {
    display: block;
    float: left;
    height: inherit;
    line-height: inherit;
    width: 40px;
    text-align: center;
  }

  &_container {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-collapse: collapse;
    line-height: inherit;
    height: inherit;
    flex-grow: 1;
    border-radius: 3px;
    color: #323232;
    font-size: 14px;
    box-sizing: border-box;
    border: 1px solid #E6E6E6;
    // margin-right: 10px;

    &_input {
      height: calc(100% - 2px);
      line-height: calc(100% - 2px);
      outline: none;
      width: calc(100% - 80px);
      flex-grow: 1;
      background-color: transparent;
      text-align: center;
      border: unset;
    }

    &_input[disabled] {
      cursor: not-allowed;
    }

    &_input[type=number]::-webkit-inner-spin-button,
    &_input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /*** 消除input元素 type="number" 时默认的 加减按钮---moz版*/

    &_input[type=number] {
      -moz-appearance: textfield;
    }

    &_button {
      color: #C8C8C8;
      display: block;
      width: 32px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      outline: none;
      background-color: transparent;
      border-color: transparent;
      box-sizing: content-box;
    }

    &_button[disabled] {
      background-color: #E6E6E6;
      cursor: not-allowed;
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


</style>
