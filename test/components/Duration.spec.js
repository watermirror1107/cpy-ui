import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CDuration from '../../packages/CDuration/index.vue'
import {ASelectOptionStub, ASelectStub} from './helpers'

describe('CDuration', () => {
  const stubs = {
    'a-select': ASelectStub,
    'a-select-option': ASelectOptionStub
  }

  it('builds default duration and more lists with fallback translations', () => {
    const wrapper = mount(CDuration, {
      propsData: {
        value: 2
      },
      stubs
    })

    expect(wrapper.vm.duration_middle_list).to.have.lengthOf(8)
    expect(wrapper.vm.more_middle_list).to.have.lengthOf(6)
    expect(wrapper.text()).to.include('1个月')
    expect(wrapper.text()).to.include('更多时长')
  })

  it('emits change when a duration item is clicked and clears more value', async () => {
    const wrapper = mount(CDuration, {
      propsData: {
        durationList: [{id: 1, name: '1个月'}, {id: 3, name: '3个月'}],
        moreList: [{id: 6, name: '6个月'}]
      },
      stubs
    })

    wrapper.setData({mDuration: 6})
    await wrapper.findAll('.c_duration_list_item').at(1).trigger('click')

    expect(wrapper.vm.duration).to.equal(3)
    expect(wrapper.vm.mDuration).to.equal('')
    expect(wrapper.emitted('change')[0]).to.deep.equal([3])
  })

  it('emits change for selected custom more duration', () => {
    const wrapper = mount(CDuration, {
      stubs
    })

    wrapper.vm.selectMore(8)

    expect(wrapper.emitted('change')[0]).to.deep.equal([8])
  })

  it('uses custom list in compact select mode', () => {
    const wrapper = mount(CDuration, {
      propsData: {
        type: 2,
        durationList: [{id: 2, name: '2个月'}],
        moreList: [{id: 1, name: '1个月'}]
      },
      stubs
    })

    expect(wrapper.find('.c_duration_list').exists()).to.equal(false)
    expect(wrapper.text()).to.include('1个月')
    expect(wrapper.text()).to.include('2个月')
  })
})
