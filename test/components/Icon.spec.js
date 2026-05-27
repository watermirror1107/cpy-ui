import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CIcon from '../../packages/CIcon/index.vue'

describe('CIcon', () => {
  it('builds svg class and symbol href from name', () => {
    const wrapper = mount(CIcon, {
      propsData: {
        name: 'icon-test',
        className: 'extra-icon'
      }
    })

    expect(wrapper.classes()).to.include('c_icon')
    expect(wrapper.classes()).to.include('icon-svg-icon-test')
    expect(wrapper.classes()).to.include('extra-icon')
    expect(wrapper.find('use').attributes('href') || wrapper.find('use').attributes('xlink:href')).to.equal('#icon-test')
  })

  it('passes width and height to svg', () => {
    const wrapper = mount(CIcon, {
      propsData: {
        name: 'icon-size',
        width: 16,
        height: 20
      }
    })

    expect(wrapper.attributes('width')).to.equal('16')
    expect(wrapper.attributes('height')).to.equal('20')
  })
})
