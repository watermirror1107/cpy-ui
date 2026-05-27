import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CButton from '../../packages/CButton/index.vue'
import {AButtonStub, ATooltipStub} from './helpers'

describe('CButton', () => {
  const mountButton = options => mount(CButton, {
    stubs: {
      'a-button': AButtonStub,
      'a-tooltip': ATooltipStub
    },
    ...options
  })

  it('renders default slot text', () => {
    const wrapper = mountButton({
      slots: {
        default: '<span class="button-text">保存</span>'
      }
    })

    expect(wrapper.find('.button-text').exists()).to.equal(true)
    expect(wrapper.text()).to.include('保存')
  })

  it('passes click listeners to ant button', async () => {
    const wrapper = mountButton({
      listeners: {
        click: () => wrapper.vm.$emit('tracked-click')
      }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('tracked-click')).to.have.lengthOf(1)
  })

  it('adds theme and ghost classes for extended button types', () => {
    const wrapper = mountButton({
      attrs: {
        type: 'warning',
        ghost: true
      }
    })

    expect(wrapper.find('button').classes()).to.include('c_button_warning_g')
  })

  it('wraps button with tooltip when tip is provided', () => {
    const wrapper = mountButton({
      propsData: {
        tip: '谨慎操作',
        placement: 'bottom'
      }
    })

    expect(wrapper.find('.a-tooltip-stub').exists()).to.equal(true)
    expect(wrapper.find('.a-tooltip-stub').attributes('data-placement')).to.equal('bottom')
    expect(wrapper.text()).to.include('谨慎操作')
  })
})
