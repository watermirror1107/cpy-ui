<template>
  <div class="c_duration">
    <ul
        class="c_duration_list"
        v-if="type===1">
      <li
          class="c_duration_list_item"
          v-for="item in duration_middle_list"
          :class="{c_duration_list_item_selected:item.id==duration}"
          :key="item.id"
          @click="handleClick(item.id)"
      >
        {{ item.name }}
      </li>
      <li class="c_duration_list_item">
        <a-select
            class="c_duration_list_item_more"
            :class="{selected:mDuration}"
            v-model="mDuration"
            @change="selectMore"
            size="large">
          <a-select-option value="">
            {{ $T('public.Moretime') }}
          </a-select-option>
          <a-select-option
              v-for="mitem in more_middle_list"
              :value="mitem.id"
              :key="mitem.id">
            {{ mitem.id }}{{ $T('public.Months') }}
          </a-select-option>
        </a-select>
      </li>
    </ul>
    <a-select
        v-else
        v-model="duration"
        style="width: 120px">
      <a-select-option
          v-for="item in [...durationList,...moreList].sort((a,b)=>{return a.id>b.id?1:-1})"
          :value="item.id" ￥
          :key="item.id">
        {{ item.name }}
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
    value: {type: [Number, String]},
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
    }else{
      this.more_middle_list=[
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
    }else{
      this.duration_middle_list =[
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
     * @description:翻译兼容
     */
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        'public.Moretime': '更多时长',
        'public.Months': '个月',
        'public.year': '年',
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
      this.duration = id;
      this.mDuration = '';
    }
  }
};
</script>
<style lang="less">
ul{
  list-style: none;
}
.discount {
  display: block;
  position: absolute;
  color: #fff;
  line-height: 16px;
  font-size: 12px;
  width: 32px;
  height: 16px;
  background-color: @--main-red;
  top: -9px;
  left: 2px;
  border-top-left-radius: 5px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.c_duration_list {
  border: 1px solid #eeeeee;
  height: 40px;
  display: inline-block;

  .ant-select{
    width: 100%;
  }
  .ant-select-selection.selected {
    border-color: #1279F8;
    color: #1279F8;
    background-color: #D0E4FE;
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
    float: left;
    height: 40px;
    width: 90px;
    text-align: center;
    line-height: 40px;
    margin: 0;
    border: 1px solid #E6E6E6;
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
      border-color: #1279F8;
      color: #1279F8;
      background-color: #D0E4FE
    }
  }


}


</style>

