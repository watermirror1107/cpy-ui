<!--图标-->
<template>
  <svg
      class="c_icon"
      :class="{getClassName:true,rotate360:name==='icon-shili_yemianjiazai'}"
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
@keyframes rotateCircle {
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
.rotate360{
  animation: rotateCircle 1000ms linear infinite;
}
</style>
