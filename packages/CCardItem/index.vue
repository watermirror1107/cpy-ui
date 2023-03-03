<template>
  <a-row class="c_card_item">
    <a-col
        :span="span"
        class="c_card_item_title">{{ data.title }}
    </a-col>
    <a-col
        :span="24-span"
        class="c_card_item_content">
      <slot><span>{{ data.value }}</span></slot>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'CCardItem',
  props: {
    data: {
      type: Object
    },
    offset:{
      type:Number,
      default:0
    },
    span:{
      type:Number,
      default:3
    }
  }
};
</script>

<style lang="less">
.c_card_item {
  line-height: 40px;

  &_title {
    color: @--cpy-gray-3;
  }

  &_content {
    align-items: baseline;
  }
}
</style>
