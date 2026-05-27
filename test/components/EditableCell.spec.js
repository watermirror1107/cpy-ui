import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CEditableCell from '../../packages/CEditableCell/index.vue'
import {AFormModelItemStub, AFormModelStub, AInputStub, APopoverStub} from './helpers'

describe('CEditableCell', () => {
  const stubs = {
    'a-form-model': AFormModelStub,
    'a-form-model-item': AFormModelItemStub,
    'a-input': AInputStub,
    'a-popover': APopoverStub
  }

  it('renders text and emits textClick when enabled', async () => {
    const wrapper = mount(CEditableCell, {
      propsData: {
        text: '可编辑名称',
        isHasHover: true
      },
      stubs
    })

    expect(wrapper.text()).to.include('可编辑名称')
    expect(wrapper.find('.c_cell_text_content').classes()).to.include('c_cell_text_content_isHasHover')

    await wrapper.find('.c_cell_text_content').trigger('click')

    expect(wrapper.emitted('textClick')).to.have.lengthOf(1)
  })

  it('does not emit textClick when disabled', async () => {
    const wrapper = mount(CEditableCell, {
      propsData: {
        text: '只读名称',
        isDisabled: true
      },
      stubs
    })

    await wrapper.find('.c_cell_text_content').trigger('click')

    expect(wrapper.emitted('textClick')).to.equal(undefined)
    expect(wrapper.find('label').exists()).to.equal(false)
  })

  it('copies rules and emits change after valid blur', () => {
    const wrapper = mount(CEditableCell, {
      propsData: {
        text: '原名称',
        rules: [{required: true, message: '必填'}]
      },
      stubs
    })

    wrapper.vm.litForm.text = '新名称'
    wrapper.vm.check()

    expect(wrapper.vm.formRules.text).to.have.lengthOf(1)
    expect(wrapper.vm.isEditable).to.equal(false)
    expect(wrapper.emitted('change')[0][0].val).to.equal('新名称')

    wrapper.emitted('change')[0][0].errCallback()
    expect(wrapper.vm.litForm.text).to.equal('原名称')
  })

  it('emits enter and blurs current input', () => {
    let blurCount = 0
    const wrapper = mount(CEditableCell, {
      stubs
    })

    wrapper.vm.enterSubmit({
      target: {
        blur: () => {
          blurCount += 1
        }
      }
    })

    expect(wrapper.emitted('enter')).to.have.lengthOf(1)
    expect(blurCount).to.equal(1)
  })
})
