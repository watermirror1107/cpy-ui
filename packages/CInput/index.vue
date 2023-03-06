<!--输入框-->
<template>
  <div
      class="c_input"
      :class="{ 'c_input_focus': isEmpty || isFocus,'c_input_disabled':disabled }"
      @click="triggerFocus">
    <div class="c_input_box">
      <span
          class="c_input_label"
          :class="{ c_input_title: isEmpty }">{{ label }}</span>
      <input
          ref="cInput"
          autocomplete="off"
          :type="type"
          :placeholder="realPlaceholder"
          class="c_input_container"
          :value="localValue"
          :disabled="disabled"
          @keydown.enter="$emit('pressEnter')"
          @change="handleChange"
          @input="handleInput"
          :class="{ 'c_input_container_focus': isEmpty }"
          @focus="handleFocus"
          @blur="handleBlur"
      />
    </div>
    <div class="c_input_icon">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CInput',
  data() {
    return {
      isFocus: false,
      isEmpty: false,
      localValue: '',
      realPlaceholder: '',
      fakePlaceholder: 'fakePlaceholder'
    }
  },
  props: {
    value: {type: String},
    placeholder: {type: String, default: ''},
    label: {type: String, default: ''},
    type: {type: String, default: 'text'},
    disabled:{type:Boolean,default:false}
  },
  watch: {
    value(nv) {
      this.localValue = nv;
    }
  },
  model: {
    event: "change",
    prop: 'value'
  },
  created() {
    this.realPlaceholder = this.placeholder;
    if (this.value) {
      this.localValue = this.value;
      this.handleFocus();
    }
  },
  methods: {
    /**
     * @description:切换focus
     */
    triggerFocus() {
      this.$refs.cInput.focus();
    },
    handleInput(e) {
      this.localValue = e.target.value;
      this.$emit('change', e.target.value);
    },
    handleChange(e) {
      this.$emit('change', e.target.value);
    },
    handleFocus() {
      this.isFocus = true;
      this.isEmpty = true;
      this.realPlaceholder = '';
    },
    handleBlur() {
      this.isFocus = false;
      if (!this.localValue) {
        this.isEmpty = false;
        this.realPlaceholder = this.placeholder;
      }
    }
  }
};
</script>
<style lang="less">
.c_input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 360px;
  height: 48px;
  border: @--cpy-border-style-2;
  border-radius: 3px;
  transition: all 0.2s ease-out;
  &_disabled{
    cursor: not-allowed;
    border-color: @--cpy-gray-5!important;
    input{
      color: @--cpy-disabled-font-color2;
    }
  }

  &:hover {
    border: @--cpy-border-style-2;
  }

  &_icon {
    color: @--cpy-gray-5;
  }

  &_box {
    display: flex;
    flex-grow: 1;
    text-align: left;
    width: calc(100% - 144px)
  }

  &_label {
    flex-shrink: 0;
    margin-left: 16px;
    font-size: 16px;
    color: @--cpy-gray-3;
    transition: all 0.2s ease-out;
  }

  &_title {
    position: absolute;
    padding: 0 5px;
    font-size: 14px;
    color: @--cpy-blue;
    transform: translateY(-18px);
    background: @--cpy-white;
    line-height: 14px;
  }

  &_container {
    height: 24px;
    font-size: 14px;
    padding: 0 16px;
    color: @--cpy-gray-6;
    border: none;
    outline: none;
    margin-top: 10px;
  }

  &_container:-webkit-autofill { //解决自动填充Input的背景色
    -webkit-box-shadow: 0 0 0 1000px @--cpy-white inset !important;
  }

  &_container_focus {
    margin-top: 0;
    width: 100%;
    font-size: 16px;
    color: @--cpy-black-3;
  }
}


</style>
