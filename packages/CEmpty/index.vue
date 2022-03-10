<template>
  <a-empty
      :description='description'
      :image="simpleImage"/>
</template>

<script>
import {Empty} from 'ant-design-vue';
export default {
  name: 'CEmpty',
  data() {
    return {
      simpleImage: ''
    }
  },
  props: {
    description: {
      type: String,
      default: '暂无数据'
    }
  },
  mounted() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  }
};
</script>

