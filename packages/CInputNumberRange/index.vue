<template>
  <div class="inputNumberRange">
    <a-input-group
        style="width: 100%;"
        compact
    >
      <a-input
          :class="{noBorder:!border}"
          :size="size"
          type="number"
          :value="value[0]"
          :suffix="unit"
          @blur="controlValue('min',$event)"
          style="width:calc((100% - 30px) / 2); text-align: center"
          :placeholder="placeholder[0]"/>
      <a-input
          :class="{noBorder:!border}"
          :size="size"
          style="width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
          placeholder="~"
          disabled
      />
      <a-input
          :class="{noBorder:!border}"
          :size="size"
          :suffix="unit"
          @blur="controlValue('max',$event)"
          :value="value[1]"
          type="number"
          style="width:calc((100% - 30px) / 2);text-align: center; border-left: 0"
          :placeholder="placeholder[1]"/>
    </a-input-group>
  </div>
</template>

<script>
export default {
  name: 'InputNumberRange',
  props: {
    border: { type: Boolean, default: true },
    size: { type: String },
    unit: { type: String, default: '' },
    min: { type: Number },
    max: { type: Number },
    value: { type: Array },
    placeholder: { type: Array }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    controlValue (type, ev) {
      const { min, max } = this
      const [valueMin, valueMax] = this.value
      const value = Number(ev.target.value)
      if (type === 'min') {
        if (min > value) {
          this.$emit('change', [min, valueMax])
        } else if (valueMax) {
          if (min <= value && value < valueMax) {
            this.$emit('change', [value, valueMax])
          }
        } else {
          this.$emit('change', [value, valueMax])
        }
      } else if (max < value) {
        this.$emit('change', [valueMin, max])
      } else if (valueMin) {
        if (Number(valueMin) < value && value <= max) {
          this.$emit('change', [valueMin, value])
        }
      } else {
        this.$emit('change', [valueMin, value])
      }
    }
  }
}
</script>
<style lang="stylus">
.noBorder{
  border:unset!important;
  .ant-input{
    border:inherit
  }
}
</style>
