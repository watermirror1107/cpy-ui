<template>
  <div class="c_form">
    <a-form-model
        ref="form"
        :rules="rules"
        :layout="layout"
        :colon="isColon"
        :labelAlign="labelAlign"
        :label-col="{ span: labelCol ,offset: offset}"
        :wrapper-col="{ span: wrapperCol}"
        :model="formData"
        :validateOnRuleChange="isValidateOnRuleChange"
        @submit.native.prevent>
      <template
          v-for="(item,index) in formOptions"
      >
        <a-form-model-item
            :key="index"
            :label="item.label"
            :prop="item.key"
            v-if="item.isShow === undefined || item.isShow !== false">
          <slot
              :name="item.key"
              :scope="{value:formData[item.key],option:item}">
            <template v-if="item.type==='input'">
              <a-input
                  :disabled="item.isDisabled"
                  :placeholder="item.placeholder"
                  :type="item.inputType||'text'"
                  v-model.trim="formData[item.key]">
                <template
                    v-if="item.suffix"
                    v-slot:suffix>
                  <a-button
                      @click="item.saveHandler(item.key)"
                      v-if="item.isShowSave"
                      type="link">
                    {{ $T('public.save') }}
                  </a-button>
                  <span>{{ item.suffix }}</span>
                </template>
              </a-input>
            </template>
            <template v-if="item.type === 'inputNumber'">
              <a-input-number
                  :placeholder="item.placeholder"
                  :min="item.min"
                  :max="item.max"
                  :disabled="item.isDisabled"
                  v-model="formData[item.key]"></a-input-number>
            </template>
            <template v-else-if="item.type==='select'">
              <a-select
                  :disabled="item.isDisabled"
                  v-model="formData[item.key]"
                  :placeholder="item.placeholder">
                <a-select-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value">
                  {{ option.label }}
                </a-select-option>
              </a-select>
            </template>
            <template v-else-if="item.type==='checkBox'">
              <a-checkbox-group
                  :disabled="item.isDisabled"
                  v-model="formData[item.key]">
                <a-checkbox
                    v-for="option in item.options"
                    :disabled="option.disabled"
                    :value="option.value"
                    :key="option.value">
                  {{ option.label }}
                </a-checkbox>
              </a-checkbox-group>
            </template>
            <!-- 用于详情 -->
            <template v-else-if="item.type==='span'">
              <span>{{ formData[item.key]||'--' }}</span>
            </template>
            <template v-else>
              <a-radio-group
                  :disabled="item.isDisabled"
                  v-model="formData[item.key]">
                <a-radio
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value">
                  {{ option.label }}
                </a-radio>
              </a-radio-group>
            </template>
          </slot>
        </a-form-model-item>
      </template>
    </a-form-model>
  </div>
</template>

<script>

export default {
  name: 'CForm',
  inheritAttrs: false,
  data() {
    return {
      formData: {}
    }
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    value: {type: Object},
    formOptions: {type: Array, default: []},
    rules: {type: Object},
    isValidateOnRuleChange: {type: Boolean, default: true},
    labelCol: {type: Number, default: 6},
    wrapperCol: {type: Number, default: 18},
    offset: {type: Number, default: 40},
    isColon: {type: Boolean, default: false},
    layout: {type: String, default: 'horizontal'},
    labelAlign: {type: String, default: 'left'}
  },
  watch: {
    value(val) {
      this.formData = val;
    },
    formData: {
      handler(nv) {
        this.$emit('change', nv);
      },
      deep: true
    }
  },
  created() {
    if (!this.$T) {
      this.$T = this.translateText
    }
    this.formData = Object.assign({}, this.value);
  },
  methods: {
    translateText(code) {
      let textObj = {
        'public.save': '保存'
      }
      return textObj[code] || code
    },
    validate() {
      return this.$refs.form.validate();
    },
    validateField(props, callback) {
      return this.$refs.form.validateField(props, callback);
    },

    resetFields() {
      this.$refs.form.resetFields();
    },

    clearValidate(props) {
      this.$refs.form.clearValidate(props);
    }
  }
};
</script>

<style lang="less">

.c_form {

  .ant-form-item-children {
    display: block;
    //line-height: 40px;
  }

  .ant-form-item {
    .h-lh-40();
    margin-bottom: 24px;

    .ant-input, .ant-select-selection--single, .ant-select-selection__rendered, .ant-form-item-control-wrapper, .ant-form-item-control {
      .h-lh-40();
    }

  }
}
</style>
