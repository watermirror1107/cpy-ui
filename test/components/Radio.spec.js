import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CRadio from '../../packages/CRadio/index.vue'
import CRadioGroup from '../../packages/CRadioGroup/index.vue'

describe('CRadioGroup and CRadio', () => {
  const GroupHost = {
    components: {CRadioGroup, CRadio},
    template: `
      <c-radio-group :value="value" :selected-type="selectedType" @change="$emit('change', $event)">
        <c-radio value="a">A</c-radio>
        <c-radio value="b">B</c-radio>
      </c-radio-group>
    `,
    props: {
      value: {
        type: String,
        default: 'a'
      },
      selectedType: {
        type: Number,
        default: 1
      }
    }
  }

  it('marks matching radio as selected', () => {
    const wrapper = mount(GroupHost, {
      propsData: {
        value: 'a',
        selectedType: 1
      }
    })
    const radios = wrapper.findAll('.c_radio_wrap')

    expect(radios.at(0).classes()).to.include('c_radio_wrap_selected')
    expect(radios.at(0).classes()).to.include('c_radio_wrap_blue')
    expect(radios.at(1).classes()).not.to.include('c_radio_wrap_selected')
  })

  it('emits change through group provide when clicked', async () => {
    const wrapper = mount(GroupHost)

    await wrapper.findAll('input').at(1).trigger('click')

    expect(wrapper.emitted('change')[0]).to.deep.equal(['b'])
  })

  it('renders selectedType 2 style and check mark', () => {
    const wrapper = mount(GroupHost, {
      propsData: {
        value: 'b',
        selectedType: 2
      }
    })
    const radio = wrapper.findAll('.c_radio_wrap').at(1)

    expect(radio.classes()).to.include('c_radio_wrap_b2')
    expect(radio.find('.c_radio_wrap_button_selected').isVisible()).to.equal(true)
  })
})
