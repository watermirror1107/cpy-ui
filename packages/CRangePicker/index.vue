<template>
<!--  todo 修改样式-->
  <div class="c_ranger_pick">
    <icon name="icon-shijianxuanz_shijian"></icon>
    <a-range-picker
        :allowClear="false"
        :value="dateValue"
        :disabledDate="disabledDate"
        :separator="separator"
        :show-time="{ format: 'HH:mm:ss' }"
        format="YYYY-MM-DD HH:mm:ss"
        :placeholder="[$T('public.Starttime'), $T('public.Endtime')]"
        @change="onChange"
    />
    <ul class="c_ranger_pick_quick_btn" v-if="isShowQuick">
      <!--      <li-->
      <!--        :class="{activated:type===0}"-->
      <!--        @click="type=0">实时-->
      <!--      </li>-->
      <template v-if="currentType === 1">
        <li
            :class="{activated:type===1}"
            @click="type=1">
          {{ $T('public.Onehour') }}
        </li>
        <li
            :class="{activated:type===2}"
            @click="type=2">
          {{ $T('public.Nearly24hours') }}
        </li>
        <li
            :class="{activated:type===3}"
            @click="type=3">
          {{ $T('public.Nearlythreedays') }}
        </li>
        <li
            :class="{activated:type===4}"
            @click="type=4">
          {{ $T('public.Nearlysevendays') }}
        </li>
      </template>
      <template v-else-if="currentType === 2">
        <li
            :class="{activated:type===5}"
            @click="type=5">
          {{ $T('public.Nearlyoneday') }}
        </li>
        <li
            :class="{activated:type===6}"
            @click="type=6">
          {{ $T('public.OneMonth') }}
        </li>
        <li
            :class="{activated:type===7}"
            @click="type=7">
          {{ $T('public.Threemonths') }}
        </li>
        <li
            :class="{activated:type===8}"
            @click="type=8">
          {{ $T('public.Halfayear') }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import moment from 'moment';
import {debounce} from "@/utils";
import Icon from "../CIcon/index.vue";

export default {
  name: 'CRangePicker',
  components: {
    Icon
  },
  data() {
    return {
      dateValue: [],
      type: 2,
      loop: null // 轮询
    }
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: {type: Array, default: () => ([moment().subtract(1, 'days'), moment()])},
    gap: {type: Number, default: 3},// 实时刷新的时间间隙,单位为秒
    currentType: {type: Number, default: 1},
    separator: {type: String, default: '~'},//分隔符
    isShowQuick: {type: Boolean, default: true},//是否显示快捷键
    disabledDate: {//不可用时间
      type: Function, default: (current) => {
        return current && current > Date.now();
      }
    }
  },
  created() {
    if (!this.$T) {
      this.$T = this.translateText
    }
  },
  mounted() {
    this.type = 2;
  },
  beforeDestroy() {
    this.clearTime();
  },
  methods: {
    /**
     * @description:兼容处理
     */
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        'public.Starttime': '起始时间',
        'public.Endtime': '结束时间',
        'public.Onehour': '一小时',
        'public.Nearly24hours': '近24小时',
        'public.Nearlythreedays': '近3天',
        'public.Nearlysevendays': '近7天',
        'public.Nearlyoneday': '近1天',
        'public.OneMonth': '1个月',
        'public.Threemonths': '3个月',
        'public.Halfayear': '半年',
      }
      return textObj[code] || code
    },
    /**
     * @description:改变时间
     */
    onChange(value) {
      this.type = -1;
      this.emitChange(value);
    },
    /**
     * @description:触发emit
     */
    emitChange: debounce(function (val) {
      this.$emit('change', val);
    }),
    /**
     * @description:清空实时的定时器
     */
    clearTime() {
      clearInterval(this.loop);
    }
  },
  watch: {
    type(nv, ov) {
      if (nv !== 0) {
        this.clearTime();
      }
      switch (nv) {
        case 0:
          this.dateValue = [moment(), moment()];
          this.emitChange(this.dateValue);
          this.loop = setInterval(() => {
            this.dateValue = [this.dateValue[0], moment()];
            this.emitChange(this.dateValue);
          }, this.gap * 1000);
          break;
        case 1:
          this.dateValue = [moment()
              .subtract(1, 'hours'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 2:
          this.dateValue = [moment()
              .subtract(1, 'days'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 3:
          this.dateValue = [moment()
              .subtract(3, 'days'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 4:
          this.dateValue = [moment()
              .subtract(7, 'days'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 5:
          this.dateValue = [moment()
              .subtract(1, 'days'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 6:
          this.dateValue = [moment()
              .subtract(1, 'months'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 7:
          this.dateValue = [moment()
              .subtract(3, 'months'), moment()];
          this.emitChange(this.dateValue);
          break;
        case 8:
          this.dateValue = [moment()
              .subtract(0.5, 'years'), moment()];
          this.emitChange(this.dateValue);
          break;
        default:
          break;
      }
    },
    value(nv, ov) {
      this.dateValue = nv;
    }
  }
};
</script>

<style lang="less">


.fl {
  float: left
}

.c_ranger_pick {
  background-color: #fff;
  border: 1px solid #eee;
  color: #323232;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  width: auto;

  .lh40();

  .ant-calendar-picker {
    .fl();

    input {
      .lh40();
    }
  }

  .c_icon {
    margin-left: 16px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .fl()
  }

  .ant-calendar-picker-input {

    .lh40();
    padding: 0;
    border: none;
    border-radius: 0;
  }

  //去除focus的蓝框

  .ant-calendar-picker:focus {
    box-shadow: unset;
    border: none;
    border-color: transparent;
    outline: none;
  }

  //去除focus的蓝框

  .ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled) {
    box-shadow: unset;
    border: none;
    border-color: transparent;
    outline: none;
  }

  //去除focus的蓝框

  .ant-calendar-picker-input:focus {
    box-shadow: unset;
    border: none;
    border-color: transparent;
    outline: none;
  }

  &_quick_btn {
    background-color: #f6f8fb;
    float: left;

    li {
      .fl();
      border: 1px solid #E6E6E6;
      border-top: 0;
      border-right: 0;
      padding: 0 15px;
      box-sizing: border-box;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .activated {
      color: #fff;
      border-color: #205299;
      background-color: #205299;
    }

    &::after {
      clear: both;
      content: '';
      display: block;
    }
  }
}

</style>
