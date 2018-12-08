<template>
  <div class="input-group">
    {{ label }}
    <div class="input-group-prepend">
      <button class="btn btn-outline-primary"
        :class="{ 'btn-outline-secondary': !canDecrement() }"
        :disabled="!canDecrement()" @click="decrement()">
        −
      </button>
    </div>
    <input type="text" readonly class="form-control text-center count-selector-value" :value="value" />
    <div class="input-group-append">
      <button class="btn btn-outline-primary"
        :class="{ 'btn-outline-secondary': !canIncrement() }"
        :disabled="!canIncrement()" @click="increment()">
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
input, button {
  height: calc(2.25rem + 2px);
}
</style>

<script>
export default {
  name: 'CountSelector',
  props: ['value', 'label', 'min', 'max'],
  methods: {
    canIncrement () {
      return this.value < this.max
    },
    canDecrement () {
      return this.value > this.min
    },
    increment () {
      if (this.canIncrement()) {
        this.$emit('input', this.value + 1)
      }
    },
    decrement () {
      if (this.canDecrement()) {
        this.$emit('input', this.value - 1)
      }
    }
  }
}
</script>
