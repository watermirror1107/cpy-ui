<template>
  <div class="c_radio_group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CRadioGroup',
  props: {
    value: {default: ''},
    selectedType: {default: 1, type: Number|String}
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  provide() {
    return {
      setGroupValue:  (e)=> {
        this.$emit('change', e.target.value);
      }
    }
  }
};
</script>
