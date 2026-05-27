import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CTableBtn from '../../packages/CTableBtn/index.vue'
import {AButtonStub, ATooltipStub} from './helpers'

describe('CTableBtn', () => {
  const mountTableBtn = options => mount(CTableBtn, {
    stubs: {
      'a-button': AButtonStub,
      'a-tooltip': ATooltipStub
    },
    ...options
  })

  it('renders default icon and text content', () => {
    const wrapper = mountTableBtn({
      propsData: {
        icon: 'icon-edit',
        text: '编辑'
      }
    })

    expect(wrapper.find('.c_icon').exists()).to.equal(true)
    expect(wrapper.find('.c_table_btn_text').text()).to.equal('编辑')
    expect(wrapper.find('button').classes()).to.include('c_table_btn_vertical')
  })

  it('renders custom slot over default content', () => {
    const wrapper = mountTableBtn({
      slots: {
        default: '<span class="custom-table-btn">自定义</span>'
      }
    })

    expect(wrapper.find('.custom-table-btn').text()).to.equal('自定义')
    expect(wrapper.find('.c_table_btn_text').exists()).to.equal(false)
  })

  it('sets ghost for danger type', () => {
    const wrapper = mountTableBtn({
      attrs: {
        type: 'danger'
      }
    })

    expect(wrapper.find('button').attributes('data-ghost')).to.equal('true')
  })

  it('wraps content in tooltip when tip is provided', () => {
    const wrapper = mountTableBtn({
      propsData: {
        tip: '删除后不可恢复',
        trigger: 'click',
        placement: 'left'
      }
    })

    expect(wrapper.find('.a-tooltip-stub').attributes('data-trigger')).to.equal('click')
    expect(wrapper.find('.a-tooltip-stub').attributes('data-placement')).to.equal('left')
    expect(wrapper.text()).to.include('删除后不可恢复')
  })
})
