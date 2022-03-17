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
  color: #323232;
  line-height: 44px;
  height: 44px;
  padding: 0 24px;
  text-align: left;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  >.c_icon{
    display: inline-block;
    transform: rotate( 180deg );
    cursor: pointer;
    font-size: 20px;
    vertical-align: -2px;
    margin-top: 11px;
  }
  &_content {
    display: inline-block;
    margin-left: 8px;
    color: #323232;
  }
}

</style>
