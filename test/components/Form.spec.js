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
          name: '实例',
          cpu: 2,
          type: 'vm',
          status: 'on',
          hidden: 'x'
        },
        formOptions: [
          {type: 'input', key: 'name', label: '名称', suffix: '台'},
          {type: 'inputNumber', key: 'cpu', label: 'CPU'},
          {type: 'select', key: 'type', label: '类型', options: [{value: 'vm', label: '虚机'}]},
          {type: 'span', key: 'status', label: '状态'},
          {type: 'radio', key: 'hidden', label: '隐藏', isShow: false, options: [{value: 'x', label: 'X'}]}
        ]
      },
      stubs
    })

    expect(wrapper.text()).to.include('台')
    expect(wrapper.text()).to.include('虚机')
    expect(wrapper.text()).to.include('on')
    expect(wrapper.findAll('.a-form-model-item-stub')).to.have.lengthOf(4)
  })

  it('emits change when formData changes', async () => {
    const wrapper = mount(CForm, {
      propsData: {
        value: {name: '旧名称'},
        formOptions: [{type: 'input', key: 'name', label: '名称'}]
      },
      stubs
    })

    wrapper.vm.formData.name = '新名称'
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('change').pop()[0]).to.deep.equal({name: '新名称'})
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
        value: {custom: '插槽值'},
        formOptions: [{type: 'input', key: 'custom', label: '自定义'}]
      },
      scopedSlots: {
        custom: '<span class="custom-form-item">{{ props.scope.value }}-{{ props.scope.option.label }}</span>'
      },
      stubs
    })

    expect(wrapper.find('.custom-form-item').text()).to.equal('插槽值-自定义')
  })
})
