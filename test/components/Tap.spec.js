import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CTap from '../../packages/CTap/index.vue'

describe('CTap', () => {
  const list = [
    {title: '运行中', num: 3, color: '#1279F8', type: 'running', isHoverColor: true},
    {title: '异常', num: 1, color: '#ff0000', type: 'error'}
  ]

  it('renders cards and active style from selectIndex', () => {
    const wrapper = mount(CTap, {
      propsData: {
        title: '概览',
        list,
        selectIndex: 0
      }
    })

    expect(wrapper.text()).to.include('概览')
    expect(wrapper.text()).to.include('运行中')
    expect(wrapper.text()).to.include('3')
    expect(wrapper.find('.running').classes()).to.include('active')
    expect(wrapper.find('.running').attributes('style')).to.include('rgba(18,121,248,0.3)')
  })

  it('emits selected card index', async () => {
    const wrapper = mount(CTap, {
      propsData: {
        list
      }
    })

    await wrapper.findAll('.c_tap_card').at(1).trigger('click')

    expect(wrapper.emitted('selectItem')[0]).to.deep.equal([1])
  })

  it('changes hover opacity only when item enables hover color', async () => {
    const wrapper = mount(CTap, {
      propsData: {
        list
      }
    })
    const bg = wrapper.find('.running .bg')

    await bg.trigger('mouseenter')
    expect(bg.element.style.opacity).to.equal('0.15')

    await bg.trigger('mouseleave')
    expect(bg.element.style.opacity).to.equal('0.1')
  })

  it('renders top and bottom icon slots with item scope', () => {
    const wrapper = mount(CTap, {
      propsData: {
        list
      },
      scopedSlots: {
        topIcon: '<span class="top-slot">{{ props.scope.title }}</span>',
        bottomIcon: '<span class="bottom-slot">{{ props.scope.num }}</span>'
      }
    })

    expect(wrapper.find('.top-slot').text()).to.equal('运行中')
    expect(wrapper.find('.bottom-slot').text()).to.equal('3')
  })
})
