<template>
  <span
      ref="main"
      class="c_textLine"
      :style="{ '-webkit-line-clamp': lineLimit }"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
  >
    <a-popover :visible="isVisible">
      <div
          class="c_textLine_content"
          slot="content"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
      >
        {{ text }}
      </div>
      {{ text }}
    </a-popover>
  </span>
</template>
<script>


export default {
  name: 'CEllipsis',
  data() {
    return {
      isVisible: false,
      mouseleaveTimeout: 0
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    lineLimit: {
      type: Number,
      default: 3
    }
  },
  methods: {
    /**
     * @description:鼠标移入
     */
    mouseenter() {
      if (this.$refs.main.clientHeight !== this.$refs.main.scrollHeight) {
        clearTimeout(this.mouseleaveTimeout);
        this.isVisible = true;
      }
    },
    /**
     * @description:鼠标移出
     */
    mouseleave() {
      clearTimeout(this.mouseleaveTimeout);
      this.mouseleaveTimeout = window.setTimeout(() => {
        this.isVisible = false;
      }, 150);
    }
  }
}
</script>

<style lang="less">
.c_textLine {
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: "," ".";
  display: -webkit-box;
  word-break: break-all;
  -webkit-box-orient: vertical;

  &_content {
    padding: 5px;
    text-align: left;
    word-wrap: break-word;
    display: inline-block;
    max-width: 450px;
    max-height: 300px;
    overflow: auto;
  }
}

</style>
