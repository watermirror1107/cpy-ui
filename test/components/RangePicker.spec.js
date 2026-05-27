import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import moment from 'moment'
import CRangePicker from '../../packages/CRangePicker/index.vue'
import {ARangePickerStub} from './helpers'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('CRangePicker', () => {
  const stubs = {
    'a-range-picker': ARangePickerStub
  }

  it('renders currentType 1 quick options with fallback translations', () => {
    const wrapper = mount(CRangePicker, {
      stubs
    })

    expect(wrapper.text()).to.include('一小时')
    expect(wrapper.text()).to.include('近24小时')
    expect(wrapper.find('.a-range-picker-stub').attributes('data-separator')).to.equal('~')
  })

  it('renders currentType 2 quick options', () => {
    const wrapper = mount(CRangePicker, {
      propsData: {
        currentType: 2
      },
      stubs
    })

    expect(wrapper.text()).to.include('近1天')
    expect(wrapper.text()).to.include('半年')
  })

  it('hides quick options when isShowQuick is false', () => {
    const wrapper = mount(CRangePicker, {
      propsData: {
        isShowQuick: false
      },
      stubs
    })

    expect(wrapper.find('.c_ranger_pick_quick_btn').exists()).to.equal(false)
  })

  it('emits custom range and resets quick type on change', async () => {
    const wrapper = mount(CRangePicker, {
      stubs
    })
    const value = [moment('2024-01-01'), moment('2024-01-02')]

    wrapper.vm.onChange(value)
    await wait(850)

    expect(wrapper.vm.type).to.equal(-1)
    expect(wrapper.emitted('change').pop()[0]).to.deep.equal(value)
  })

  it('updates dateValue from quick type watcher', async () => {
    const wrapper = mount(CRangePicker, {
      stubs
    })

    wrapper.vm.type = 1
    await wait(850)

    expect(wrapper.vm.dateValue).to.have.lengthOf(2)
    expect(wrapper.emitted('change')).to.not.equal(undefined)
  })
})
