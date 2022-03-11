<template>
  <a-tabs
      @change="handleClick"
      v-model="curSelectIndex">
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
  data() {
    return {
      curSelectIndex: 0
    }
  },
  props: {
    tabs: {type: Array},
    selectIndex: {type: Number, default: 0}
  },
  watch: {
    selectIndex: {
      handler(val) {
        this.curSelectIndex = val;
      },
      immediate: true
    }
  },
  methods: {
    /**
     * @description:change回调
     */
    handleClick(index) {
      this.$emit('update:selectIndex', index);
      this.$emit('change', index);
    }
  }
};
</script>
<style lang="less">
.ant-tabs-bar {
  margin: 0;
}
</style>
