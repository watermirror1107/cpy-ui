<!--按钮-->
<template>
  <button
      class="c_button"
      :class="[type+(isSolid?'-solid':''),size]">
        <icon
            v-if="icon"
            :class="{'c_button_iconSvg': $slots.default}"
            :name='icon'></icon>
    <slot></slot>
  </button>
</template>
<script>
import Icon from '../CIcon/index'
export default {
  components:{
    Icon
  },
  name: 'CButton',
  props: {
    icon: {
      default: '',
      type: String
    },
    isSolid: {
      default: false,
      type: Boolean
    },
    type: {
      default: 'primary',
      type: String
    },
    size: {
      default: 'default',
      type: String
    },
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

.large {
  height: 40px;
  border-radius: 3px;
  padding: 0 16px;
}

.default {
  height: 32px;
  border-radius: 3px;
  padding: 0 8px;
}

.small {
  height: 24px;
  border-radius: 3px;
  padding: 0 8px;
}

.solid {
  color: #fff;
}

.primary {
  .button-color(@--main-blue, @--main-blue-1, @--main-blue-3)
}

.success {
  .button-color(@--main-green, @--main-green-1, @--main-green-3)
}

.warning {
  .button-color(@--main-yellow, @--main-yellow-1, @--main-yellow-3)
}

.danger {
  .button-color(@--main-red, @--main-red-1, @--main-red-3)
}

.primary-solid {
  .button-color-solid(@--main-blue, @--main-blue-8)
}

.success-solid {
  .button-color-solid(@--main-green, @--main-green-8)
}

.warning-solid {
  .button-color-solid(@--main-yellow, @--main-yellow-8)
}

.danger-solid {
  .button-color-solid(@--main-red, @--main-red-8)
}

.button-color-solid(@color:--main-blue,@hoverColor:--main-blue-8) {
  color: #fff;
  background-color: @color;
  border: 0;

  &:hover {
    background-color: @hoverColor;
  }
}

.button-color(@color:@--main-blue, @hoverColor:@--main-blue-1, @activeColor:@--main-blue-3) {
  color: @color;
  background-color: #fff;
  border: 1px solid @color;

  &:hover {
    background-color: @hoverColor;
    border: 1px solid @color;
  }
  &:active {
    background-color: @activeColor;
    border: 1px solid @color;
  }
}

</style>
