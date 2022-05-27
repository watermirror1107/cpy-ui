<template>
  <div class="range-pick-wrap">
    <div class="left-input">
      <icon class="icon-box" name="icon-shijianxuanz_shijian"></icon>
      <a-range-picker
          size="large"
          :allowClear="false"
          :value="dateValue"
          :disabledDate="disabledDate"
          :separator="separator"
          :show-time="{ format: 'HH:mm:ss' }"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="[$T('public.Starttime'), $T('public.Endtime')]"
          @change="onChange"
      />
    </div>
    <ul class="right-btn" v-if="isShowQuick">
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
      <template v-else-if="currentType === 3">
        <li v-for="(item,index) in arrValue" :key="index"
            :class="{activated:type===item.type}"
            @click="changeType(item)">
           {{Math.abs(item.type)}}{{ $T('public.day') }}
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
    separator: {type: String, default: '-'},//分隔符
    isShowQuick: {type: Boolean, default: true},//是否显示快捷键
    defaultType:{type:Number,default:2},//默认type类型
    arrValue:{type:Array,default:()=>([{
        type:-1
      },{
        type:3
      },{
        type:7
      }])
    },
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
    // this.type = 2;
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
        'public.Onehour': '1小时',
        'public.Nearly24hours': '24小时',
        'public.Nearlythreedays': '3天',
        'public.Nearlysevendays': '7天',
        'public.Nearlyoneday': '1天',
        'public.OneMonth': '1个月',
        'public.Threemonths': '3个月',
        'public.Halfayear': '半年',
        'public.day':'天'
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
    },
    changeType(item){
      this.type = item.type
      if(item.type<0){
         this.dateValue = [moment(),moment().subtract(item.type, 'days')];
      }else{
         this.dateValue = [moment().subtract(item.type, 'days'), moment()];
      }
      this.emitChange(this.dateValue);
    }
  },
  watch: {
    type(nv, ov) {
      if (nv !== 0) {
        this.clearTime();
      }
      if(this.currentType==3){
        return;
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
    },
    defaultType(nv,ov){
      this.type = nv;
    }
  }
};
</script>

<style lang="less" scoped>
.range-pick-wrap {
  display: flex;
  align-items: center;
  font-size: 0;
  .left-input {
    display: flex;
    align-items: center;
    width: 352px;
    height: 40px;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 16px;
    background: #fff;
    .icon-box {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin: 0 8px;
    }
    /deep/ .ant-calendar-range-picker-separator {
      min-width: 25px;
    }

    /deep/ .ant-input {
      border: none;
    }
    /deep/ .ant-calendar-picker-input {
      padding-left: 2px;
    }
    /deep/ .ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled) {
      box-shadow: none;
    }
  }

  .right-btn {
    display: flex;
    align-items: center;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    li {
      height: 38px;
      width: 64px;
      font-size: 14px;
      line-height: 38px;
      text-align: center;
      border-right: 1px solid #E6E6E6;
      cursor: pointer;
      color: #323232;
      &:last-child {
        border-right: none;
      }
      &.activated {
        background: #0048FF;
        color: #fff;
      }
    }
  }
}

</style>
