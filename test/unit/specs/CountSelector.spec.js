import Vue from 'vue'
import CountSelector from '@/components/controls/CountSelector'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CountSelector, { value: 0, min: 0, max: 0, label: '' })
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.count-selector-value').type)
      .toEqual('text')
  })
})
