import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CBtnWrap from '../../packages/CBtnWrap/index.vue'
import CTableBtn from '../../packages/CTableBtn/index.vue'
import {AButtonStub, APopoverStub, ATooltipStub} from './helpers'

describe('CBtnWrap', () => {
  const Host = {
    components: {CBtnWrap, CTableBtn},
    props: {
      column: {
        type: Object,
        default: () => ({width: 180})
      }
    },
    template: `
      <div style="width: 180px">
        <c-btn-wrap trigger="click" placement="right">
          <c-table-btn text="编辑" />
          <c-table-btn text="删除" />
          <c-table-btn text="详情" />
          <span>ignored</span>
        </c-btn-wrap>
      </div>
    `
  }

  it('keeps table buttons and moves overflow buttons into more popover', () => {
    const wrapper = mount(Host, {
      propsData: {
        column: {width: 180}
      },
      stubs: {
        'a-button': AButtonStub,
        'a-tooltip': ATooltipStub,
        'a-popover': APopoverStub
      }
    })

    expect(wrapper.find('.c_btn_wrap').exists()).to.equal(true)
    expect(wrapper.find('.a-popover-stub').attributes('data-trigger')).to.equal('click')
    expect(wrapper.find('.a-popover-stub').attributes('data-placement')).to.equal('right')
    expect(wrapper.text()).to.include('更多')
    expect(wrapper.text()).not.to.include('ignored')
  })

  it('renders an empty node when no table buttons are provided', () => {
    const EmptyHost = {
      components: {CBtnWrap},
      template: '<c-btn-wrap><span>not a button</span></c-btn-wrap>'
    }
    const wrapper = mount(EmptyHost)

    expect(wrapper.find('.c_btn_wrap').exists()).to.equal(false)
  })
})
