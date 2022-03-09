<!--图标-->
<template>
  <svg
      class="c_icon"
      :class="getClassName"
      :width="width"
      :height="height"
      aria-hidden="true"
  >
    <use :xlink:href="getName"></use>
  </svg>
</template>

<script>

export default {
  name: 'CIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  computed:{
    getClassName() {
      return [
        `icon-svg-${this.name}`, this.className && /\S/.test(this.className) ? `${this.className}` : ''
      ];
    },
    getName() {
      return `#${this.name}`;
    }
  }
};
</script>

<style lang="less">
.c_icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
