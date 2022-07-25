<template>
  <div className="inputNumberRange">
    <a-input-group
        style="width: 100%;"
        compact
    >
      <a-input
          :size="size"
          type="number"
          :value="value[0]"
          @blur="controlValue('min',$event)"
          style="width: 135px; text-align: center"
          :placeholder="placeholder[0]"/>
      <a-input
          :size="size"
          style="width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
          placeholder="~"
          disabled
      />
      <a-input
          :size="size"
          @blur="controlValue('max',$event)"
          :value="value[1]"
          type="number"
          style="width: 135px; text-align: center; border-left: 0"
          :placeholder="placeholder[1]"/>
    </a-input-group>
  </div>
</template>

<script>
export default {
  name: 'InputNumberRange',
  props: {
    size: {type: String},
    min: {type: Number},
    max: {type: Number},
    value: {type: Array},
    placeholder: {type: Array}
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    controlValue(type, ev) {
      const {min, max} = this
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
