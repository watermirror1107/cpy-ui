<!--全局弹窗样式-->
<template>
  <a-modal
      class="c_modal"
      :width="width"
      :footer="null"
      :closable="false"
      :visible="isVisible"
      :destroyOnClose="isDestroy"
      :title="null"
      @cancel="closeModal"
  >
    <slot
        name="title">
      <p v-if="!isSlotTitle" class="c_modal_title">
        <icon v-if="icon" :name="icon" style="margin-right: 8px;"></icon>
        {{ title }}
      </p>
    </slot>
    <slot><p class="c_modal_content" v-html="content"></p></slot>
    <slot
        name="footer">
      <div v-if="!isSlotFooter"
           class="c_modal_footer">
        <a-button
            class="c_modal_footer_cancel c_modal_footer_btn"
            type="text"
            @click="closeModal"
        >{{ cancelText }}
        </a-button>
        <a-button
            :loading="isConfirmLoading"
            class="c_modal_footer_ok c_modal_footer_btn"
            :disabled="isConfirmLoading"
            type="primary"
            @click="ok"
        >{{ okText }}
        </a-button>
      </div>
    </slot>
  </a-modal>
</template>

<script>
import Icon from "../CIcon/index.vue";
import Vue from "vue";

export default {
  name: 'CModal',
  components: {Icon},
  model:{
    prop:'isVisible',
    event:'change'
  },
  props: {
    icon: {type: String, default: ''},
    content: {type: String, default: ''},
    title: {type: String},
    ok: {type: Function,default:()=>{}},
    cancel: {type: Function,default:()=>{}},
    isVisible: {type: Boolean, default: false},
    isDestroy: {type: Boolean, default: true},
    isConfirmLoading: {type: Boolean, default: false},
    width: {type: Number, default: 376},
    cancelText: {type: String, default: Vue.prototype.$T ? Vue.prototype.$T('instance.Cancel') : '取消'},
    okText: {type: String, default: Vue.prototype.$T ? Vue.prototype.$T('instance.Confirm') : '确定'}
  },
  computed: {
    isSlotTitle() {
      return Boolean(this.$slots.title || this.$scopedSlots.title);
    },
    isSlotFooter() {
      return Boolean(this.$slots.footer || this.$scopedSlots.footer);
    }
  },
  methods:{
    /**
    * @description:关闭弹窗
    */
    closeModal(){
      this.$emit('change',false)
      this.cancel()
    }
  }
};
</script>

<style lang="less">
.c_modal {
  &_title {
    text-align: center;
    color: #323232;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_content{
    color: #646464;
    text-align: center;
  }
  &_footer {
    margin-top: 26px;
    display: flex;
    justify-content: center;

    &_cancel {
      color: #646464;
      margin-right: 12px;
      border:unset;
      background-color: #F1F2F6;
      &:hover{
        background-color: #eee;
        color: #333333;
      }
    }
  }
}

</style>
