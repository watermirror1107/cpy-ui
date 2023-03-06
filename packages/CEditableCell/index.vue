<!--文本编辑组件-->
<template>
  <div class="c_cell" @click.stop="">
    <div v-show="isEditable">
      <a-form-model
        layout="inline"
        :model="litForm"
        :rules="formRules"
        ref="litForm"
      >
        <a-form-model-item prop="text">
          <a-input
            style="width: 100%"
            :id="id"
            v-model="litForm.text"
            @focus="$emit('focus')"
            @change="handleChange"
            @pressEnter="enterSubmit($event)"
            @blur="check"
          />
        </a-form-model-item>
      </a-form-model>
    </div>
    <div v-show="!isEditable" class="c_cell_text">
      <!-- 这里不用v-if而用v-show是因为Label不能找到未渲染的Input-->
      <Ellipsis
        class="c_cell_text_content"
        :class="{
          c_cell_text_content_isHasHover: isHasHover && !isDisabled,
          c_cell_text_content_isDisabled: isDisabled,
        }"
        :text="litForm.text || emptyPlaceholder"
        @click.native="handleClick"
      ></Ellipsis>
      <label
        :for="id"
        style="margin-left: 20px; cursor: pointer"
        @click="isEditable = true"
        v-if="!isDisabled"
      >
        <icon name="icon-bianji"></icon>
      </label>
    </div>
  </div>
</template>
<script>
import Ellipsis from "../CEllipsis/index.vue";
import Icon from "../CIcon/index.vue";

export default {
  name: "CEditableCell",
  components: { Ellipsis, Icon },
  data() {
    return {
      formRules: {
        text: [],
      },
      id: Math.random(), // 一个列表里面有多个输入框的时候不能用同一个ID,不然label会找不到对应的input
      isEditable: false,
      litForm: {
        text: "",
      },
    };
  },
  props: {
    emptyPlaceholder: {
      type: String,
    },
    text: {
      type: String,
    },
    rules: {
      type: Array,
    },
    isHasHover: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    text: {
      handler: function (nv) {
        this.litForm.text = nv;
      },
      immediate: true,
    },
  },
  beforeMount() {
    if (this.rules) {
      for (let i = 0; i < this.rules.length; i++) {
        this.formRules.text.push(this.rules[i]);
        // this.$set(this.formRules.text, i, this.rules[i]);
      }
    }
  },
  methods: {
    /**
     * @description:点击文字
     */
    handleClick() {
      if (this.isDisabled) return;
      this.$emit("textClick");
    },
    /**
     * @description:回车触发
     */
    enterSubmit(ev) {
      this.$emit("enter");
      ev?.target?.blur(); //
    },
    /**
     * @description:键盘输入发生改变
     */
    handleChange(ev) {
      this.litForm.text = ev?.target?.value;
    },

    /**
     * @description:失去焦点
     */
    check() {
      this.$refs.litForm.validate((isValidate) => {
        if (isValidate) {
          this.isEditable = false;
          // 名字一样不用修改
          if (this.text === this.litForm.text) {
            // this.$message.warn('名称一致不用修改')
            return;
          }
          this.$emit("change", {
            val: this.litForm.text,
            errCallback: () => {
              this.litForm.text = this.text;
            },
          });
        }
      });
    },
  },
};
</script>
<style lang="less">
.c_cell_text {
  display: flex;

  &_content {
    border-bottom: 1px solid transparent;
  }

  &_content_isHasHover:hover {
    border-color: @--cpy-theme-color;
    cursor: pointer;
  }

  &_content_isDisabled {
    color:@--cpy-disabled-font-color2!important;
  }
}
</style>
