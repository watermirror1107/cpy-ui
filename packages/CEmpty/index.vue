<template>
  <div class="c_empty">
    <div class="c_empty_image">
      <slot name="image">
        <c-icon name="icon-shangchuan" style="font-size: 50px"></c-icon>
      </slot>
    </div>
    <p class="c_empty_desc">
      <slot name="description"> {{ title }} </slot>
    </p>
    <div class="c_empty_footer">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
import cIcon from "../CIcon/index.vue";
export default {
  name: "CEmpty",
  components: {
    cIcon,
  },
  props: {
    title: { type: String, default: "当前主机尚未挂载数据盘" },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
.c_empty {
  font-size: 14px;
  color: #646464;
  letter-spacing: 0.5px;
  // font-family: "Source Han Sans CN";
  .c_empty_image {
    text-align: center;
    margin-bottom: 8px;
  }
  .c_empty_desc {
  }
  .c_empty_footer {
    text-align: center;
  }
}
</style>