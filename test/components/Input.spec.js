import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CInput from '../../packages/CInput/index.vue'

describe('CInput', () => {
  it('initializes with value and floats label', () => {
    const wrapper = mount(CInput, {
      propsData: {
        label: '名称',
        placeholder: '请输入名称',
        value: '已有内容'
      }
    })

    expect(wrapper.find('input').element.value).to.equal('已有内容')
    expect(wrapper.find('.c_input_label').classes()).to.include('c_input_title')
    expect(wrapper.find('input').attributes('placeholder')).to.equal('')
  })

  it('emits change when user inputs text', async () => {
    const wrapper = mount(CInput, {
      propsData: {
        label: '名称'
      }
    })
    const input = wrapper.find('input')

    input.element.value = '新内容'
    await input.trigger('input')

    expect(wrapper.emitted('change')[0]).to.deep.equal(['新内容'])
  })

  it('restores placeholder after blur when value is empty', async () => {
    const wrapper = mount(CInput, {
      propsData: {
        placeholder: '请输入'
      }
    })

    wrapper.vm.handleFocus()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').attributes('placeholder')).to.equal('')

    wrapper.vm.handleBlur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocus).to.equal(false)
    expect(wrapper.vm.isEmpty).to.equal(false)
    expect(wrapper.find('input').attributes('placeholder')).to.equal('请输入')
  })

  it('emits pressEnter on enter key', async () => {
    const wrapper = mount(CInput)

    await wrapper.find('input').trigger('keydown.enter')

    expect(wrapper.emitted('pressEnter')).to.have.lengthOf(1)
  })

  it('renders suffix slot', () => {
    const wrapper = mount(CInput, {
      slots: {
        suffix: '<span class="suffix-icon">元</span>'
      }
    })

    expect(wrapper.find('.suffix-icon').text()).to.equal('元')
  })
})
