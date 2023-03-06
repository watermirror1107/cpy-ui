<template>
  <a-tabs
      @tabClick="handleClick"
      :activeKey="value">
    <a-tab-pane
        v-for="(item,index) in tabs"
        :key="index"
        :tab="item.name"
    ></a-tab-pane>
  </a-tabs>
</template>
<script>

export default {
  name: 'CTabs',
  props: {
    tabs: {type: Array},
    value: {type: Number, default: 0}
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  methods: {
    /**
     * @description:change回调
     */
    handleClick(index) {
      this.$emit('change', index);
    }
  }
};
</script>
<style lang="less" scoped>
.ant-tabs-bar {
  margin: 0;
}
/deep/ .ant-tabs-nav{
  .ant-tabs-tab-active{
    color: @--cpy-theme-color;
  }
}
/deep/ .ant-tabs-ink-bar{
  background-color: @--cpy-theme-color;
}
</style>
