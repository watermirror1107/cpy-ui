import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CInput from '../../packages/CInput/index.vue'

describe('CInput', () => {
  it('initializes with value and floats label', () => {
    const wrapper = mount(CInput, {
      propsData: {
        label: 'Name',
        placeholder: 'Please input',
        value: 'existing value'
      }
    })

    expect(wrapper.find('input').element.value).to.equal('existing value')
    expect(wrapper.find('.c_input_label').classes()).to.include('c_input_title')
    expect(wrapper.find('input').attributes('placeholder')).to.equal('')
  })

  it('emits change when user inputs text', async () => {
    const wrapper = mount(CInput, {
      propsData: {
        label: 'Name'
      }
    })
    const input = wrapper.find('input')

    input.element.value = 'new value'
    await input.trigger('input')

    expect(wrapper.emitted('change')[0]).to.deep.equal(['new value'])
  })

  it('syncs local value when value prop changes', async () => {
    const wrapper = mount(CInput, {
      propsData: {
        value: 'old'
      }
    })

    await wrapper.setProps({value: 'new'})

    expect(wrapper.vm.localValue).to.equal('new')
  })

  it('focuses inner input when wrapper is clicked', async () => {
    const wrapper = mount(CInput)
    let focused = false
    wrapper.vm.$refs.cInput.focus = () => {
      focused = true
    }

    await wrapper.find('.c_input').trigger('click')

    expect(focused).to.equal(true)
  })

  it('emits change on native change event', async () => {
    const wrapper = mount(CInput)
    const input = wrapper.find('input')

    input.element.value = 'changed'
    await input.trigger('change')

    expect(wrapper.emitted('change')[0]).to.deep.equal(['changed'])
  })

  it('restores placeholder after blur when value is empty', async () => {
    const wrapper = mount(CInput, {
      propsData: {
        placeholder: 'Please input'
      }
    })

    wrapper.vm.handleFocus()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').attributes('placeholder')).to.equal('')

    wrapper.vm.handleBlur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocus).to.equal(false)
    expect(wrapper.vm.isEmpty).to.equal(false)
    expect(wrapper.find('input').attributes('placeholder')).to.equal('Please input')
  })

  it('keeps label floated after blur when value exists', async () => {
    const wrapper = mount(CInput)

    wrapper.vm.handleFocus()
    wrapper.vm.localValue = 'value'
    wrapper.vm.handleBlur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isEmpty).to.equal(true)
    expect(wrapper.find('input').attributes('placeholder')).to.equal('')
  })

  it('emits pressEnter on enter key', async () => {
    const wrapper = mount(CInput)

    await wrapper.find('input').trigger('keydown.enter')

    expect(wrapper.emitted('pressEnter')).to.have.lengthOf(1)
  })

  it('renders suffix slot', () => {
    const wrapper = mount(CInput, {
      slots: {
        suffix: '<span class="suffix-icon">open</span>'
      }
    })

    expect(wrapper.find('.suffix-icon').text()).to.equal('open')
  })
})
