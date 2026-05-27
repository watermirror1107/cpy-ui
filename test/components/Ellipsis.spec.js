import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CEllipsis from '../../packages/CEllipsis/index.vue'
import {APopoverStub} from './helpers'

describe('CEllipsis', () => {
  const mountEllipsis = options => mount(CEllipsis, {
    stubs: {
      'a-popover': APopoverStub
    },
    ...options
  })

  it('renders text and accepts line clamp limit', () => {
    const wrapper = mountEllipsis({
      propsData: {
        text: '这是一段很长的内容',
        lineLimit: 2
      }
    })

    expect(wrapper.text()).to.include('这是一段很长的内容')
    expect(wrapper.vm.lineLimit).to.equal(2)
  })

  it('shows popover only when content overflows', async () => {
    const wrapper = mountEllipsis({
      propsData: {
        text: '超出内容'
      }
    })

    Object.defineProperty(wrapper.vm.$refs.main, 'clientHeight', {
      configurable: true,
      value: 20
    })
    Object.defineProperty(wrapper.vm.$refs.main, 'scrollHeight', {
      configurable: true,
      value: 40
    })

    await wrapper.find('.c_textLine').trigger('mouseenter')

    expect(wrapper.vm.isVisible).to.equal(true)
    expect(wrapper.find('.a-popover-stub').attributes('data-visible')).to.equal('true')
  })

  it('keeps popover hidden when content does not overflow', async () => {
    const wrapper = mountEllipsis()

    Object.defineProperty(wrapper.vm.$refs.main, 'clientHeight', {
      configurable: true,
      value: 20
    })
    Object.defineProperty(wrapper.vm.$refs.main, 'scrollHeight', {
      configurable: true,
      value: 20
    })

    await wrapper.find('.c_textLine').trigger('mouseenter')

    expect(wrapper.vm.isVisible).to.equal(false)
  })
})
