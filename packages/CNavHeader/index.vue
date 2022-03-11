<template>
  <div
      class="c_nav_header"
      :class="{ 'c_nav_header_center': isNeedCenter }">
    <div class="c_nav_header_left">
      <icon
          name="icon-shangyiye"
          v-if="isCanBack"
          @click.native="$router.back()"
          style="cursor: pointer;font-size: 20px;">
      </icon>
      <slot name="left">
          <span class="c_nav_header_content">
               {{ title }}
          </span>
      </slot>
    </div>
    <div class="c_nav_header_right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import Icon from "../CIcon/index.vue";

export default {
  name: 'CNavHeader',
  components: {
    Icon
  },
  props: {
    title: {type: String, default: ''},
    isCanBack: {type: Boolean, default: true},
    isNeedCenter: {type: Boolean, default: false}
  }
};
</script>

<style lang="less">
.flex_horizon_center {
  display: flex;
  align-items: center;
}

.c_nav_header {
  .flex_horizon_center();
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  height: 44px;
  padding: 0 24px;
  background-color: #fff;

  &_content {
    margin-left: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #323232;
  }

  &_left, &_right {
    .flex_horizon_center();
  }
}

.c_nav_header_center {
  padding: 0 calc(50% - 600px);
}
</style>
