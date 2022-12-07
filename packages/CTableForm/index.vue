<template>
  <div class="c_table_form">
    <a-form-model
        layout="inline"
        :model="formData"
        @submit="handleSubmit"
        @submit.native.prevent>
      <a-form-model-item
          v-for="(item,index) in formDataOptions"
          :prop="item.key"
          :key="index">
        <slot
            :name="item.key" 
            :scope="{value:formData[item.key]}">
          <a-input
              class="c_table_form_input"
              v-if="item.type==='input'"
              :placeholder="item.placeholder"
              v-model.trim="formData[item.key]"
              allowClear>
            <icon
                slot="prefix"
                name="icon-sousuo"/>
            <icon
                slot="suffix"
                name="icon-queren"/>
          </a-input>
          <a-select
              v-else-if="item.type === 'select'"
              v-model="formData[item.key]"
              :placeholder="item.placeholder">
            <a-select-option
                v-for="option in item.options"
                :value="option.value"
                :key="option.value">
              {{ option.label }}
            </a-select-option>
          </a-select>
          <a-range-picker
              class="max-width"
              v-else-if="item.type === 'range-picker'"
              :mode="item.mode||['date', 'date']"
              :placeholder="item.placeholder||['开始日期','结束日期']"
              @change="handleRangePickerChange(item.key, $event)"/>
           <c-button
              v-else-if="item.type === 'refresh'"
              size="large"
              class="c_table_refresh"
              @click="handleSubmit" 
              icon="icon-chongzhi">
            </c-button>
        </slot>
      </a-form-model-item>
    </a-form-model>
   
  </div>
</template>

<script>
import icon from '../CIcon/index'
import CButton from '../CButton/index'
import {debounce} from "../../utils";

export default {
  name: 'CTableForm',
  components: {icon,CButton},
  data() {
    this.handleSubmit = debounce(this.handleSubmit, this.delay)
    return {
      formData: {},
      formDataOptions:[]
    }
  },
  props: {
    delay: {type: Number, default: 500},
    formOptions: {type: Array, default: []},
    data: {type: Object}
  },
  model: {
    event: 'change',
    prop: 'data'
  },
  created() {
    this.formData = Object.assign({}, this.data);
    this.formDataOptions = this.formOptions.concat({
      key: 'refresh',type:'refresh'
    });
  },
  watch: {
    formData: {
      handler(nv) {
        this.$emit('change', nv);
        this.handleSubmit();
      },
      deep: true
    },
    formOptions: {
      handler(nv) {
        this.formDataOptions = nv.concat({
          key: 'refresh',type:'refresh'
        });
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    },
    /**
     * @description:日期范围选择回调
     */
    handleRangePickerChange(key, data) {
      const curItem = this.formOptions.find((el) => el.key === key);
      if (curItem) {
        this.formData[key] = data.length === 0 ? [] : [data[0].format(curItem.format || 'YYYY-MM-DD'), data[1].format(curItem.format || 'YYYY-MM-DD')];
      }
    }
  }
};
</script>

<style lang="less">
.c_table_form {
  display: flex;
  align-items: center;
  .c_table_refresh{
    display: inline-block;
    margin-left:5px;
    width:46px!important;
  }
  &_input {
    width: 300px;

    .ant-input {
      width: 300px !important;
    }

    svg {
      font-size: 14px;
    }
  }

  .ant-form-item {
    .lh40();

    .ant-input, .ant-select-selection--single, .ant-select-selection__rendered {
      .lh40();
    }

    .ant-form-item-control {
      line-height: 0;
    }
  }

  .max-width {
    .ant-input {
      width: 296px !important;
    }
    .ant-calendar-picker-input{
      line-height: 28px;
    }
  }
}
</style>
