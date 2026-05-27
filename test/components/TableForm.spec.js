import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CTableForm from '../../packages/CTableForm/index.vue'
import {
  AFormModelItemStub,
  AFormModelStub,
  AInputStub,
  ARangePickerStub,
  ASelectOptionStub,
  ASelectStub
} from './helpers'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('CTableForm', () => {
  const stubs = {
    'a-form-model': AFormModelStub,
    'a-form-model-item': AFormModelItemStub,
    'a-input': AInputStub,
    'a-select': ASelectStub,
    'a-select-option': ASelectOptionStub,
    'a-range-picker': ARangePickerStub
  }

  it('renders inputs, selects and range picker from options', () => {
    const wrapper = mount(CTableForm, {
      propsData: {
        data: {name: '实例', status: 'on'},
        formOptions: [
          {type: 'input', key: 'name', placeholder: '名称'},
          {type: 'select', key: 'status', placeholder: '状态', options: [{value: 'on', label: '运行中'}]},
          {type: 'range-picker', key: 'createdAt'}
        ]
      },
      stubs
    })

    expect(wrapper.find('.c_table_form_input').exists()).to.equal(true)
    expect(wrapper.find('.a-select-stub').exists()).to.equal(true)
    expect(wrapper.find('.a-range-picker-stub').exists()).to.equal(true)
    expect(wrapper.text()).to.include('运行中')
  })

  it('emits change and delayed submit when form data changes', async () => {
    const wrapper = mount(CTableForm, {
      propsData: {
        delay: 1,
        data: {name: '旧名称'},
        formOptions: [{type: 'input', key: 'name'}]
      },
      stubs
    })

    wrapper.vm.formData.name = '新名称'
    await wrapper.vm.$nextTick()
    await wait(10)

    expect(wrapper.emitted('change').pop()[0]).to.deep.equal({name: '新名称'})
    expect(wrapper.emitted('submit')).to.have.lengthOf(1)
  })

  it('formats range picker values with option format', () => {
    const wrapper = mount(CTableForm, {
      propsData: {
        data: {},
        formOptions: [{type: 'range-picker', key: 'range', format: 'YYYY/MM/DD'}]
      },
      stubs
    })
    const date = value => ({
      format: format => `${value}:${format}`
    })

    wrapper.vm.handleRangePickerChange('range', [date('start'), date('end')])

    expect(wrapper.vm.formData.range).to.deep.equal(['start:YYYY/MM/DD', 'end:YYYY/MM/DD'])
  })

  it('renders named slot with current value', () => {
    const wrapper = mount(CTableForm, {
      propsData: {
        data: {custom: '插槽值'},
        formOptions: [{type: 'input', key: 'custom'}]
      },
      scopedSlots: {
        custom: '<span class="custom-table-form">{{ props.scope.value }}</span>'
      },
      stubs
    })

    expect(wrapper.find('.custom-table-form').text()).to.equal('插槽值')
  })
})
