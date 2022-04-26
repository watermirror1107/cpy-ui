<!--全局弹窗样式-->
<template>
  <a-modal
      :width="width"
      :footer="null"
      :visible="isVisible"
      :destroyOnClose="isDestroy"
      :title="null"
      @cancel="cancel"
  >
    <slot
        name="title">
      <icon v-if="icon" :name="icon"></icon>
      <p class="title">{title}</p>
    </slot>
    <slot></slot>
    <slot v-if="isSlotFooter"
          name="footer">
      <div
          class="footer"
      >
        <a-button
            class="footer_cancel"
            type="ghost"
            @click="cancel"
        >{{ cancelText }}
        </a-button>
        <a-button
            :loading="isConfirmLoading"
            class="footer_ok"
            :disabled="isConfirmLoading"
            type="primary"
            @click="ok"
        >{{ okText }}
        </a-button>
      </div>
    </slot>
  </a-modal>
</template>

<script lang="ts">
import Icon from "../CIcon/index.vue";

export default {
  name: 'CModal',
  components: {Icon},
  props: {
    icon: {type: String, default: ''},
    title: {type: String},
    ok: {type: Function},
    cancel: {type: Function},
    isVisible: {type: Boolean, default: false},
    isDestroy: {type: Boolean, default: true},
    isConfirmLoading: {type: Boolean, default: false},
    width: {type: Number, default: 600},
    cancelText: {type: String, default: this.$T('instance.Cancel')},
    okText: {type: String, default: this.$T('instance.Confirm')},
  },
  create() {
    if (!this.$T) {
      this.$T = this.translateText
    }
  },
  computed: {
    isSlotTitle() {
      return Boolean(this.$slots.title || this.$scopedSlots.title);
    },
    isSlotFooter() {
      return Boolean(this.$slots.footer || this.$scopedSlots.footer);
    }
  },
  methods: {
    translateText(code) {
      let obj = {
        'instance.Cancel': '取消',
        'instance.Confirm': '确定',
      }
      return obj[code] || code
    }
  }
};
</script>

<style scoped lang="less">
.footer {
  margin-top: 26px;
  display: flex;
  justify-content: center;

  &_ok {
    margin-right: 24px;
  }

  &_cancel {
    color: #959595;
    border-color: #959595;
  }

  &_cancel:hover {
    color: #C8C8C8;
    border-color: #C8C8C8;
  }
}
</style>
