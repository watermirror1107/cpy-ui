import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CForm from '../../packages/CForm/index.vue'
import {
  AButtonStub,
  AFormModelItemStub,
  AFormModelStub,
  AInputNumberStub,
  AInputStub,
  ARadioGroupStub,
  ARadioStub,
  ASelectOptionStub,
  ASelectStub
} from './helpers'

describe('CForm', () => {
  const stubs = {
    'a-form-model': AFormModelStub,
    'a-form-model-item': AFormModelItemStub,
    'a-input': AInputStub,
    'a-input-number': AInputNumberStub,
    'a-select': ASelectStub,
    'a-select-option': ASelectOptionStub,
    'a-radio-group': ARadioGroupStub,
    'a-radio': ARadioStub,
    'a-button': AButtonStub
  }

  it('renders visible form options and hides items with isShow false', () => {
    const wrapper = mount(CForm, {
      propsData: {
        value: {
          name: 'instance',
          cpu: 2,
          type: 'vm',
          status: 'on',
          hidden: 'x'
        },
        formOptions: [
          {type: 'input', key: 'name', label: 'Name', suffix: 'unit'},
          {type: 'inputNumber', key: 'cpu', label: 'CPU'},
          {type: 'select', key: 'type', label: 'Type', options: [{value: 'vm', label: 'VM'}]},
          {type: 'span', key: 'status', label: 'Status'},
          {type: 'radio', key: 'hidden', label: 'Hidden', isShow: false, options: [{value: 'x', label: 'X'}]}
        ]
      },
      stubs
    })

    expect(wrapper.text()).to.include('unit')
    expect(wrapper.text()).to.include('VM')
    expect(wrapper.text()).to.include('on')
    expect(wrapper.findAll('.a-form-model-item-stub')).to.have.lengthOf(4)
  })

  it('emits change when formData changes', async () => {
    const wrapper = mount(CForm, {
      propsData: {
        value: {name: 'old name'},
        formOptions: [{type: 'input', key: 'name', label: 'Name'}]
      },
      stubs
    })

    wrapper.vm.formData.name = 'new name'
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('change').pop()[0]).to.deep.equal({name: 'new name'})
  })

  it('syncs form data when value prop changes', async () => {
    const wrapper = mount(CForm, {
      propsData: {
        value: {name: 'old'},
        formOptions: [{type: 'input', key: 'name', label: 'Name'}]
      },
      stubs
    })

    await wrapper.setProps({value: {name: 'new'}})

    expect(wrapper.vm.formData).to.deep.equal({name: 'new'})
  })

  it('proxies validation methods to form ref', () => {
    const wrapper = mount(CForm, {
      propsData: {
        value: {}
      },
      stubs
    })
    let validateFieldCalled = false

    expect(wrapper.vm.validate()).to.equal(true)
    wrapper.vm.validateField('name', () => {
      validateFieldCalled = true
    })
    wrapper.vm.resetFields()
    wrapper.vm.clearValidate('name')

    expect(validateFieldCalled).to.equal(true)
  })

  it('renders named slot with value and option scope', () => {
    const wrapper = mount(CForm, {
      propsData: {
        value: {custom: 'slot value'},
        formOptions: [{type: 'input', key: 'custom', label: 'Custom'}]
      },
      scopedSlots: {
        custom: '<span class="custom-form-item">{{ props.scope.value }}-{{ props.scope.option.label }}</span>'
      },
      stubs
    })

    expect(wrapper.find('.custom-form-item').text()).to.equal('slot value-Custom')
  })

  it('renders input save action and calls option handler', async () => {
    const calls = []
    const wrapper = mount(CForm, {
      propsData: {
        value: {name: 'demo'},
        formOptions: [{
          type: 'input',
          key: 'name',
          label: 'Name',
          suffix: 'unit',
          isShowSave: true,
          saveHandler: key => calls.push(key)
        }]
      },
      stubs
    })

    await wrapper.find('button').trigger('click')

    expect(calls).to.deep.equal(['name'])
    expect(wrapper.text()).to.include('unit')
  })
})
