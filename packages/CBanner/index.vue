<template>
  <div class="c_banner">
    <slot>
      <icon
          name="icon-jiantou"
          v-if="isCanBack"
          @click.native="$router.back()">
      </icon>
      <span class="c_banner_content">
          {{ title }}
      </span>
    </slot>
  </div>
</template>
<script>

import Icon from "../CIcon";

export default {
  name: 'CBanner',
  components: {
    Icon
  },
  props: {
    title: {type: String, default: ''},
    isCanBack: {type: Boolean, default: true}
  }
};
</script>
<style lang="less">
.c_banner {
  font-size: 16px;
  font-family: Source Han Sans CN;
  color: @--cpy-font-color;
  line-height: 30px;
  min-height: 30px;
  padding: 0 24px;
  text-align: left;
  background-color: @--cpy-white;
  border-bottom: 1px solid @--cpy-gray;  
  >.c_icon{
    display: inline-block;
    transform: rotate( 180deg );
    cursor: pointer;
    font-size: 20px;
    vertical-align: -2px;
  }
  &_content {
    display: inline-block;
    margin-left: 8px;
    color: @--cpy-font-color;
  }
}

</style>
