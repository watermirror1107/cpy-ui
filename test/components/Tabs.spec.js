import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CTabs from '../../packages/CTabs/index.vue'

const ATabsStub = {
  name: 'a-tabs',
  props: {
    activeKey: Number
  },
  render(h) {
    return h('div', {
      class: 'a-tabs-stub',
      attrs: {'data-active-key': this.activeKey},
      on: this.$listeners
    }, this.$slots.default)
  }
}

const ATabPaneStub = {
  name: 'a-tab-pane',
  props: {
    tab: String
  },
  render(h) {
    return h('div', {
      class: 'a-tab-pane-stub'
    }, this.tab)
  }
}

describe('CTabs', () => {
  it('renders tab names and active key', () => {
    const wrapper = mount(CTabs, {
      propsData: {
        value: 1,
        tabs: [
          {name: '概览'},
          {name: '日志'}
        ]
      },
      stubs: {
        'a-tabs': ATabsStub,
        'a-tab-pane': ATabPaneStub
      }
    })

    expect(wrapper.find('.a-tabs-stub').attributes('data-active-key')).to.equal('1')
    expect(wrapper.text()).to.include('概览')
    expect(wrapper.text()).to.include('日志')
  })

  it('emits change when tabClick is received', async () => {
    const wrapper = mount(CTabs, {
      propsData: {
        tabs: [{name: '概览'}]
      },
      stubs: {
        'a-tabs': ATabsStub,
        'a-tab-pane': ATabPaneStub
      }
    })

    wrapper.findComponent(ATabsStub).vm.$emit('tabClick', 2)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('change')[0]).to.deep.equal([2])
  })
})
