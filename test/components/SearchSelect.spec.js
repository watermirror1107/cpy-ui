import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CSearchSelect from '../../packages/CSearchSelect/index.vue'
import {ASelectOptionStub, ASelectStub, ATooltipStub} from './helpers'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('CSearchSelect', () => {
  const stubs = {
    'a-select': ASelectStub,
    'a-select-option': ASelectOptionStub,
    'a-tooltip': ATooltipStub
  }

  it('loads initial options with extra params and extra result', async () => {
    const calls = []
    const wrapper = mount(CSearchSelect, {
      propsData: {
        value: 'extra',
        extraParams: {region: 'cn'},
        extraResult: [{id: 'extra', name: '额外选项'}],
        queryPromise: params => {
          calls.push(params)
          return Promise.resolve({
            data: {
              payload: [{id: 'a', name: '选项A'}],
              totalSize: 1
            }
          })
        }
      },
      stubs
    })

    await wrapper.vm.$nextTick()
    await wait(0)

    expect(calls[0]).to.deep.equal({pageNo: 0, pageSize: 10, queryName: '', region: 'cn'})
    expect(wrapper.vm.selectId).to.equal('extra')
    expect(wrapper.vm.loadedList).to.deep.equal([{id: 'extra', name: '额外选项'}, {id: 'a', name: '选项A'}])
  })

  it('deduplicates loaded options', () => {
    const wrapper = mount(CSearchSelect, {
      propsData: {
        queryPromise: () => Promise.resolve({data: {payload: [], totalSize: 0}})
      },
      stubs
    })

    wrapper.vm.addList([{id: 1, name: 'A'}, {id: 1, name: 'A2'}, {id: 2, name: 'B'}])

    expect(wrapper.vm.loadedList).to.deep.equal([{id: 1, name: 'A'}, {id: 2, name: 'B'}])
  })

  it('emits selected item info and value on change', () => {
    const wrapper = mount(CSearchSelect, {
      propsData: {
        value: 'a',
        queryPromise: () => Promise.resolve({data: {payload: [], totalSize: 0}})
      },
      stubs
    })

    wrapper.setData({
      selectId: 'a',
      options: [{id: 'a', name: '选项A'}]
    })
    wrapper.vm.valueChange()

    expect(wrapper.emitted('itemInfo')[0]).to.deep.equal([{id: 'a', name: '选项A'}])
    expect(wrapper.emitted('change')[0]).to.deep.equal(['a'])
  })

  it('loads next page when popup scroll reaches bottom', () => {
    const wrapper = mount(CSearchSelect, {
      propsData: {
        queryPromise: () => Promise.resolve({data: {payload: [], totalSize: 30}})
      },
      stubs
    })

    wrapper.setData({totalSize: 30, selectCurPage: 1})
    wrapper.vm.queryData = () => {
      wrapper.vm.isSelectLoading = false
      wrapper.vm.$emit('queried-next-page')
    }
    wrapper.vm.popupScroll({
      target: {
        clientHeight: 100,
        scrollTop: 80,
        scrollHeight: 200
      }
    })

    expect(wrapper.vm.selectCurPage).to.equal(2)
    expect(wrapper.emitted('queried-next-page')).to.have.lengthOf(1)
  })

  it('searches options with debounced query', async () => {
    const calls = []
    const wrapper = mount(CSearchSelect, {
      propsData: {
        queryPromise: params => {
          calls.push(params)
          return Promise.resolve({
            data: {
              payload: [{id: 's', name: '搜索结果'}],
              totalSize: 1
            }
          })
        }
      },
      stubs
    })

    wrapper.vm.searchOptions('abc')
    await wait(850)
    await wrapper.vm.$nextTick()

    expect(calls.some(item => item.queryName === 'abc' && item.pageNo === 1)).to.equal(true)
    expect(wrapper.vm.options).to.deep.equal([{id: 's', name: '搜索结果'}])
  })
})
