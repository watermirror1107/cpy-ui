import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CInputNumber from '../../packages/CInputNumber/index.vue'

describe('CInputNumber', () => {
  it('emits valChange after plus and reduce clicks', async () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 2,
        min: 1,
        max: 3
      }
    })
    const buttons = wrapper.findAll('button')

    await buttons.at(1).trigger('click')
    await buttons.at(0).trigger('click')

    expect(wrapper.emitted('valChange')[0]).to.deep.equal([3])
    expect(wrapper.emitted('valChange')[1]).to.deep.equal([1])
  })

  it('clamps blur value to max and min', async () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 2,
        min: 1,
        max: 5
      }
    })
    const input = wrapper.find('input')

    input.element.value = '8'
    await input.trigger('blur')
    input.element.value = '0'
    await input.trigger('blur')

    expect(wrapper.emitted('valChange')[0]).to.deep.equal([5])
    expect(wrapper.emitted('valChange')[1]).to.deep.equal([1])
  })

  it('keeps decimal value when isInteger is false', async () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 1,
        min: 0,
        max: 10,
        isInteger: false
      }
    })
    const input = wrapper.find('input')

    input.element.value = '1.5'
    await input.trigger('blur')

    expect(wrapper.emitted('valChange')[0]).to.deep.equal(['1.5'])
  })

  it('renders disabled state and unit', () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 1,
        disabled: true,
        unit: 'GB'
      }
    })

    expect(wrapper.find('.c_inputNumber_container').classes()).to.include('c_inputNumber_container_disabled')
    expect(wrapper.find('input').attributes('disabled')).to.equal('disabled')
    expect(wrapper.find('.c_inputNumber_unit').text()).to.equal('GB')
  })

  it('formats typed integer value on next tick', async () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 1
      }
    })
    const input = wrapper.find('input')

    input.element.value = '3.8'
    await input.trigger('input')
    await wrapper.vm.$nextTick()

    expect(input.element.value).to.equal('3')
  })

  it('emits change when value prop updates', async () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 1
      }
    })

    await wrapper.setProps({value: 2})

    expect(wrapper.emitted('change')).to.have.lengthOf(1)
  })

  it('clamps plus and reduce to max and min boundaries', async () => {
    const wrapper = mount(CInputNumber, {
      propsData: {
        value: 2,
        min: 1,
        max: 3,
        step: 5
      }
    })
    const buttons = wrapper.findAll('button')

    await buttons.at(1).trigger('click')
    await buttons.at(0).trigger('click')

    expect(wrapper.emitted('valChange')[0]).to.deep.equal([3])
    expect(wrapper.emitted('valChange')[1]).to.deep.equal([1])
  })
})
