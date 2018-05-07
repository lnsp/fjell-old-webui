<template>
  <div class="row align-content-stretch flex-wrap pl-2 pr-2">
    <div v-for="item in items" :key="item.id" :class="sizeOf(size) + ' p-1 mb-2'">
      <div class="selection-card card" @click="trigger(item)" :class="{ 'active': has(item), 'bg-primary': has(item), 'text-white': has(item) }">
        <slot :item="item" :has="has">
          <div class="card-header text-center">{{ item }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSelector',
  props: ['items', 'mode', 'size'],
  data () {
    return {
      selected: null
    }
  },
  methods: {
    sizeOf (size) {
      if (size === 'small') {
        return 'col-12 col-sm-4 col-lg-3 col-xl-2'
      }
      return 'col-12 col-sm-6 col-lg-4 col-xl-3'
    },
    has (item) {
      if (this.selected === null) return false
      if (this.mode === 'toggle') {
        return this.selected.filter(e => e.id === item.id).length > 0
      } else {
        return this.selected.id === item.id
      }
    },
    trigger (item) {
      if (this.mode === 'toggle') {
        if (this.selected === null) {
          this.selected = []
        }
        if (this.has(item)) {
          this.selected = this.selected.filter(e => e.id !== item.id)
        } else {
          this.selected.push(item)
        }
      } else {
        this.selected = item
      }
      this.$emit('input', this.selected)
    }
  }
}
</script>

<style>
.selection-card {
  cursor: pointer;
}
</style>
