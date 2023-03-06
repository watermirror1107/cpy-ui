<template>
  <label
      class="c_radio_wrap"
      :disabled="$attrs.disabled"
      :class="{
        c_radio_wrap_large:size==='large',
        c_radio_wrap_small:size==='small',
        c_radio_wrap_default:size!=='large'&&size!=='small',
        c_radio_wrap_selected: $parent.value == value&&!$attrs.disabled,
        c_radio_wrap_blue:$parent.value == value &&Number($parent.selectedType)==1&&!$attrs.disabled
      }"
      :value='value'>
    <input
        :disabled="$attrs.disabled"
        type="radio"
        :value="value"
        @click="handleClick($event,value)"
        class="c_radio">
    <slot/>
    <div
        class="c_radio_wrap_button_selected"
        v-show="$parent.value ==value&&Number($parent.selectedType)==2">
      <icon
          name="icon-xuanxiangka_gou"
          class="c_radio_wrap_button_selected_icon"></icon>
    </div>
  </label>
</template>
<script>
import Icon from "../CIcon/index.vue";

export default {
  name: 'CRadio',
  components: {
    Icon
  },
  props: {
    value: {required: true},
    size: {default: 'default',type:String}
  },
  inject: ['setGroupValue'],
  methods: {
    handleClick(e,val) {
      this.setGroupValue(val);
      this.$emit('change', e);
    }
  }
};
</script>
<style lang="less">
.c_radio_wrap {
  position: relative;
  display: inline-block;
  padding: 0 15px;
  text-align: center;
  color: @--cpy-blue-3;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  border: @--cpy-border-style;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  user-select: none;
  margin-right: 16px;
  box-sizing: border-box;

  &_button_selected {
    transition: all 0.2s ease-out;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    color: @--cpy-white;
    border-style: solid;
    // border-right: 30px @--main-blue;
    // border-bottom: 30px transparent;
    border-top: unset;
    border-left: unset;
    border-right-width: 30px;
    border-right-color: @--main-blue;
    border-bottom-width: 30px;
    border-bottom-color: transparent;

    &_icon {
      transition: all 0.2s ease-out;
      position: absolute;
      bottom: -15px;
      left: 15px;
      font-size: 14px;
    }
  }
  &_default{
    height: 32px;
    line-height: 32px;
  }
  &_large{
    height: 40px;
    line-height: 40px;
  }
  &_small{
    height: 28px;
    line-height: 28px;
  }
}

.c_radio_wrap[disabled='disabled'] {
  // background-color: #dcdcd8;
  background-color: @--cpy-disabled-color;
  cursor: not-allowed;
}

.c_radio {
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
  display: none;
}


.c_radio_wrap_selected {
  border: 1px solid @--main-blue;
  background: @--cpy-white;
  box-shadow: 0 8px 16px 0 #2150970a, 0 4px 8px 0 #21509714, 0 2px 4px 0 #2150971f;
}


.c_radio_wrap_blue{
  color: @--cpy-white;
  background-color: @--cpy-blue-3;
}

.c_radio_wrap_b2{
  border-width: 2px;
}
</style>
