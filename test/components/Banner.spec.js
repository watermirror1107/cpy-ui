import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CBanner from '../../packages/CBanner/index.vue'

describe('CBanner', () => {
  it('renders title and back icon by default', () => {
    const wrapper = mount(CBanner, {
      propsData: {
        title: '订单详情'
      },
      mocks: {
        $router: {back: () => {}}
      }
    })

    expect(wrapper.find('.c_banner_content').text()).to.equal('订单详情')
    expect(wrapper.find('.c_icon').exists()).to.equal(true)
  })

  it('hides back icon when isCanBack is false', () => {
    const wrapper = mount(CBanner, {
      propsData: {
        title: '订单详情',
        isCanBack: false
      }
    })

    expect(wrapper.find('.c_icon').exists()).to.equal(false)
  })

  it('calls router back when back icon is clicked', async () => {
    let backCount = 0
    const wrapper = mount(CBanner, {
      mocks: {
        $router: {
          back: () => {
            backCount += 1
          }
        }
      }
    })

    await wrapper.find('.c_icon').trigger('click')

    expect(backCount).to.equal(1)
  })

  it('renders custom default slot instead of fallback title', () => {
    const wrapper = mount(CBanner, {
      propsData: {
        title: '不会展示'
      },
      slots: {
        default: '<strong class="custom-banner">自定义标题</strong>'
      }
    })

    expect(wrapper.find('.custom-banner').exists()).to.equal(true)
    expect(wrapper.text()).to.equal('自定义标题')
  })
})
