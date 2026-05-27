import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CCard from '../../packages/CCard/index.vue'
import CCardItem from '../../packages/CCardItem/index.vue'
import {AColStub, ARowStub} from './helpers'

describe('CCard', () => {
  it('renders header from props and emits more click', async () => {
    const wrapper = mount(CCard, {
      propsData: {
        title: '资源概览',
        more: '更多',
        isBorder: true
      },
      slots: {
        default: '<div class="card-body">内容</div>'
      }
    })

    expect(wrapper.find('.c_card_header').classes()).to.include('borderBottom')
    expect(wrapper.text()).to.include('资源概览')
    expect(wrapper.text()).to.include('内容')

    await wrapper.find('.c_card_more').trigger('click')

    expect(wrapper.emitted('more')).to.have.lengthOf(1)
  })

  it('prefers title and more slots over props', () => {
    const wrapper = mount(CCard, {
      propsData: {
        title: '属性标题',
        more: '属性更多'
      },
      slots: {
        title: '<span class="slot-title">插槽标题</span>',
        more: '<span class="slot-more">插槽更多</span>'
      }
    })

    expect(wrapper.find('.slot-title').text()).to.equal('插槽标题')
    expect(wrapper.find('.slot-more').text()).to.equal('插槽更多')
    expect(wrapper.text()).not.to.include('属性标题')
  })
})

describe('CCardItem', () => {
  it('renders title, value and computed content span', () => {
    const wrapper = mount(CCardItem, {
      propsData: {
        data: {
          title: 'CPU',
          value: '8核'
        },
        span: 5
      },
      stubs: {
        'a-row': ARowStub,
        'a-col': AColStub
      }
    })
    const cols = wrapper.findAll('.ant-col')

    expect(cols.at(0).attributes('data-span')).to.equal('5')
    expect(cols.at(1).attributes('data-span')).to.equal('19')
    expect(wrapper.text()).to.include('CPU')
    expect(wrapper.text()).to.include('8核')
  })

  it('renders default slot over data value', () => {
    const wrapper = mount(CCardItem, {
      propsData: {
        data: {
          title: '状态',
          value: '隐藏值'
        }
      },
      slots: {
        default: '<strong class="custom-value">运行中</strong>'
      },
      stubs: {
        'a-row': ARowStub,
        'a-col': AColStub
      }
    })

    expect(wrapper.find('.custom-value').text()).to.equal('运行中')
    expect(wrapper.text()).not.to.include('隐藏值')
  })
})
