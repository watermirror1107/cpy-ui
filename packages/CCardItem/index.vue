<template>
  <a-row class="c_card_item">
    <a-col
        :span="3"
        class="c_card_item_title">{{ data.title }}
    </a-col>
    <a-col
        :span="21"
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
    }
  }
};
</script>

<style lang="less">
.c_card_item {
  line-height: 40px;

  &_title {
    color: #969696;
  }

  &_content {
    align-items: baseline;
  }
}
</style>
