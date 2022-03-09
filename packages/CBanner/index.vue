<template>
  <div class="c-banner">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name:'CBanner'
};
</script>
<style lang="less">
.c-banner {
  font-size: 16px;
  font-family: Source Han Sans CN;
  color: #323232;
  line-height: 44px;
  padding: 0 24px;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
}

</style>
