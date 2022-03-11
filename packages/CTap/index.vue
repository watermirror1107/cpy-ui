<template>
  <card
      :title="title"
  >
    <div class="c_tap">
      <div
          class="c_tap_card"
          v-for="(item,index) in list"
          :key="index"
          :style="{color:item.color,boxShadow:selectIndex===index?`0 4px 0 ${colorRgb(item.color,0.3)}`:''}"
          @click="$emit('selectItem',index)"
          :class="{[item.type]:item.type,active:selectIndex===index}"
      >
        <div
            class="bg"
            @mouseenter="mouseenter($event, item)"
            @mouseleave="mouseleave($event, item)"
            :style="{backgroundColor:item.color}"></div>
        <div class="title">
          <slot
              v-bind:scope="item"
              name="topIcon">
            <icon
                name="icon-shiyongzhong"
                class="icon"></icon>
          </slot>
          <div class="text">{{ item.title }}</div>
        </div>
        <div class="num">
          {{ item.num }}
        </div>
        <slot
            name="bottomIcon"
            v-bind:scope="item">
        </slot>
      </div>
    </div>
  </card>
</template>
<script>
import {colorRgb} from '../../utils/index';
import Icon from '../CIcon/index'
import Card from '../CCard/index'

export default {
  name: 'CTap',
  components: {Icon, Card},
  props: {
    list: {type: Array, required: true},
    selectIndex: {type: Number, default: undefined},
    title: ''
  },
  model:{
    event:'selectItem',
    prop:'selectIndex'
  },
  methods: {
    colorRgb,
    /**
     * @description:鼠标进入
     */
    mouseenter(e, item) {
      if (item.isHoverColor) {
        e.target.style.opacity = 0.15;
      }
    },
    /**
     * @description:鼠标移除
     */
    mouseleave(e, item) {
      if (item.isHoverColor) {
        e.target.style.opacity = 0.1;
      }
    }
  }
};
</script>
<style lang="less">
.c_tap {
  width: 100%;
  display: flex;
  padding: 18px 12px 12px 12px;
  position: relative;

  &_card {
    flex: 1;
    overflow: hidden;
    position: relative;
    height: 112px;
    border-radius: 4px;
    margin: 0 12px 12px;
    cursor: pointer;

    .bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      border-radius: 5px;
    }

    .title {
      display: flex;
      margin: 16px;
      color: inherit;

      .icon {
        color: inherit;
        margin-right: 8px;
      }

      .text {
        margin-left: 8px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #323232;
        line-height: 18px;
      }
    }

    .num {
      padding: 16px 32px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: bold;
    }

    .big-icon {
      position: absolute;
      font-size: 56px;
      right: 0;
      bottom: -10px;
      opacity: 0;
    }
  }

  .active {
    .bg {
      opacity: 0.15;
    }

    .big-icon {
      opacity: 0.3;
    }

    .num {
      text-decoration: underline;
    }
  }
}
</style>
