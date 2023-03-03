<template>
  <div class="c_duration">
    <ul
        class="c_duration_list"
        :style="{
              height: size==='small'?'22px':size==='large'?'40px':'32px',
          }"
        v-if="type==1">
      <li
          class="c_duration_list_item"
          :style="{
              height: size==='small'?'22px':size==='large'?'40px':'32px',
              lineHeight: size==='small'?'22px':size==='large'?'40px':'32px',
          }"
          v-for="item in duration_middle_list"
          :class="{c_duration_list_item_selected:item.id==duration,c_duration_list_item_disabled:disabled}"
          :key="item.id"
          @click="handleClick(item.id)"
      >
        {{ item.name }}
        <span v-if="item.discount>0"
              class="c_duration_discount">{{ translate(item.discount) }}{{ $T('public.discount') }}</span>
      </li>
      <li class="c_duration_list_item">
        <a-select
            :disabled="disabled"
            class="c_duration_list_item_more"
            :class="{selected:mDuration}"
            v-model="mDuration"
            @change="selectMore"
            :size="size">
          <a-icon slot="suffixIcon" style="color: #646464" type="caret-down"/>
          <a-select-option value="">
            {{ $T('public.Moretime') }}
          </a-select-option>
          <template v-for="mitem in more_middle_list">
            <a-select-option
                :value="mitem.id"
                :key="mitem.id">
              {{ mitem.id }}{{ $T('public.Months') }}
              <span v-if="mitem.discount>0"
                    class="c_duration_discount">{{ translate(mitem.discount) }}{{ $T('public.discount') }}</span>
            </a-select-option>
          </template>
        </a-select>
      </li>
    </ul>
    <a-select
        v-else
        :size="size"
        :disabled="disabled"
        v-model="duration"
        style="width: 120px">
      <a-icon slot="suffixIcon" style="color: #646464" type="caret-down"/>
      <a-select-option
          v-for="item in [...duration_middle_list,...more_middle_list].sort((a,b)=>{return a.id>b.id?1:-1})"
          :value="item.id"
          :key="item.id">
        {{ item.name }}
        <span v-if="item.discount>0"
              class="c_duration_discount">{{ translate(item.discount) }}{{ $T('public.discount') }}</span>
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: 'CDuration',
  data() {
    return {
      more_middle_list: [],
      duration_middle_list: [],
      duration: null,
      mDuration: ''//初始值不能赋为undefined，要对应moreTime选项
    }
  },
  props: {
    disabled: {type: [Boolean], default: false},
    value: {type: [Number, String]},
    size: {type: String, default: 'default'},
    type: {default: 1},
    moreList: {
      type: Array,
      default: () => []
    },
    durationList: {
      default: () => [],
      type: Array
    }
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  watch: {
    duration: {
      handler(nv, ov) {
        if (nv != ov) {
          this.$emit('change', nv);
        }
      },
      immediate: true
    },
    value: {
      handler(nv, ov) {
        if (nv != ov) {
          this.duration = nv;
        }
      },
      immediate: true
    }
  },
  beforeMount() {
    if (!this.$T) {
      this.$T = this.translateText
    }
    if (this.moreList.length !== 0) {
      this.more_middle_list = this.moreList
    } else {
      this.more_middle_list = [
        {
          id: 4,
          name: '4' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 5,
          name: '5' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 7,
          name: '7' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 8,
          name: '8' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 10,
          name: '10' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 11,
          name: '11' + this.$T('public.Months'),
          discount: 0
        }]
    }
    if (this.durationList.length !== 0) {
      this.duration_middle_list = this.durationList
    } else {
      this.duration_middle_list = [
        {
          id: 1,
          name: '1' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 2,
          name: '2' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 3,
          name: '3' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 6,
          name: '6' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 9,
          name: '9' + this.$T('public.Months'),
          discount: 0
        },
        {
          id: 12,
          name: '1' + this.$T('public.year'),
          discount: 0
        },
        {
          id: 24,
          name: '2' + this.$T('public.year'),
          discount: 0
        },
        {
          id: 36,
          name: '3' + this.$T('public.year'),
          discount: 0
        }
      ]
    }
  },
  methods: {
    /**
     * @description:计算中英文折扣
     */
    translate(discount) {
      if (localStorage?.CPY_PORTAL_LANGUAGE === 'en_US') {
        return discount * 10
      }
      return discount
    },
    /**
     * @description:翻译兼容
     */
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        'public.Moretime': '更多时长',
        'public.Months': '个月',
        'public.year': '年',
        'public.discount': '折',
      }
      return textObj[code] || code
    },
    /**
     * @description:点击更多
     */
    selectMore(val) {
      if (val) {
        this.$emit('change', val);
      }
    },
    /**
     * @description:选择选项
     */
    handleClick(id) {
      if (this.disabled) return false;
      this.duration = id;
      this.mDuration = '';
    }
  }
};
</script>
<style lang="less">
ul {
  list-style: none;
}


.c_duration {
  &_discount {
    display: inline-block;
    color: @--cpy-white;
    line-height: 16px;
    font-size: 12px;
    width: 32px;
    height: 16px;
    background-color: @--main-red;
    border-radius: 8px;
    margin-left: 8px;
    text-align: center;
  }

  &_list {
    display: inline-block;

    .ant-select {
      width: 100%;
    }

    .ant-select-selection.selected {
      border-color: @--cpy-blue-1;
      color: @--cpy-blue-1;
      background-color: @--cpy-blue-2;
    }

    .ant-select-selection__rendered {
      border: unset;
    }

    .ant-select-selection {
      border: unset;
    }

    .ant-select-lg .ant-select-selection--single {
      height: 36px;
    }

    &_item {
      box-sizing: content-box;
      float: left;
      width: 90px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      border: 1px solid @--cpy-gray;
      border-collapse: collapse;
      cursor: pointer;

      &:last-child {
        width: 120px;
      }

      .icon {
        margin-left: 10px;
      }

      &_more {
        border: unset;
      }

      &_selected {
        border-color: @--cpy-blue-1;
        color: @--cpy-blue-1;
        background-color: @--cpy-blue-2;
      }

      &_disabled {
        color: @--cpy-black-2 !important;
        background-color: @--cpy-gray-2 !important;
        cursor: not-allowed;
      }
    }


  }
}


</style>

