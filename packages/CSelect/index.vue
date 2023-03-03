<template>
  <div class="c-select-wrap" :class="{ 'has-prefix' : curIcon, 'has-suffix' : curHotText, 'no-border': noBorder }">
    <div v-if="curIcon" class="prefix-wrap"><c-icon :name="curIcon"></c-icon></div>
    <div v-if="curHotText" class="suffix-wrap"><span class="sel-icon">{{curHotText}}</span></div>
    <a-select
      :size="size"
      style="width: 100%"
      :disabled="disabled"
      :style="{'background': disabled ? '#f5f5f5' : ''}"
      dropdownClassName="dropdown-wrap"
      :value="curText"
      @change="handleChange"
    >
      <a-icon slot="suffixIcon" style="color: #646464" type="caret-down" />
      <a-select-option
        v-for="item in selectOptions"
        :key="item.val"
        :value="item.val"
        :disabled="item.disabled"
      >
        <a-tooltip
          placement="topLeft"
          :title="item.text">
          <div
            style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            <c-icon v-if="item.preIcon" :name="item.preIcon"></c-icon>
            {{ item.text }}
            <span v-if="item.hotText" class="opt-icon">{{ item.hotText }}</span>
          </div>
        </a-tooltip>
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
import CIcon from "../CIcon/index.vue";
export default {
  name: 'CSelect',
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'value',
  },
  components: {
    'c-icon': CIcon
  },
  props: {
    size: { type: String, default: 'large' },
    noBorder: { type: Boolean, default: false },
    value: { type: [Number, String] },
    disabled: { type: Boolean, default: false },
    selectOptions: {
      type: Array,
      default: () => [
        // options格式
        // {
        //   val: 1, // 对应取值  必填
        //   text: '1个月', // 选项名称 必填
        //   preIcon: 'icon-win_blue', // 选项的前置图标
        //   hotText: '9折' // 选项的后置优惠
        // }
      ],
      
    },
  },
  computed: {
    curSelect() {
      return this.selectOptions.find((el) => el.val === this.value) || {}
    },
    curIcon() {
      return this.curSelect.preIcon
    },
    curText() {
      return this.curSelect.text
    },
    curHotText() {
      return this.curSelect.hotText
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value);
    },
  }
}
</script>
<style lang="less">
.dropdown-wrap .opt-icon {
  min-width: 32px;
  color: @--cpy-white;
  border-radius: 8px;
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  background: @--cpy-red-1; 
}
</style>
<style lang="less" scoped>
.c-select-wrap {
  position: relative;
  display: inline-block;
  width: 120px;
  background: @--cpy-white;
  
  &.has-prefix {
    /deep/ .ant-select-selection__rendered {
      margin-left: 32px;
    }
  }
  .prefix-wrap {
    width: 32px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  &.has-suffix {
    /deep/ .ant-select-selection__rendered {
      margin-right: 60px;
    }
  }

  .suffix-wrap {
    width: 38px;
    height: 100%;
    position: absolute;
    right: 26px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .sel-icon {
      cursor: pointer;
      min-width: 32px;
      color: @--cpy-white;
      border-radius: 8px;
      padding: 0 2px;
      height: 16px;
      line-height: 16px;
      font-size: 14px;
      background: @--cpy-red-1;
    }
  }

  /deep/ .ant-select-selection {
    border: 1px solid @--cpy-gray;
    background: transparent;

    border-radius: 2px;
    &:focus {
      box-shadow: none;
    }
    box-shadow: none;
  }

  &.no-border {
    /deep/ .ant-select-selection {
      border: none;
    }
  }
}
</style>
