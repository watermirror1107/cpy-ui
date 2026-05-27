import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import CTable from '../../packages/CTable/index.vue'
import {APaginationStub, ASelectOptionStub, ASelectStub, ATableStub} from './helpers'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('CTable', () => {
  const stubs = {
    'a-table': ATableStub,
    'a-pagination': APaginationStub,
    'a-select': ASelectStub,
    'a-select-option': ASelectOptionStub
  }

  it('uses local dataSource when no remote data function is provided', async () => {
    const wrapper = mount(CTable, {
      propsData: {
        dataSource: [{id: 1}],
        pagination: false
      },
      attrs: {
        columns: [{title: 'ID', dataIndex: 'id'}]
      },
      stubs
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.localDataSource).to.deep.equal([{id: 1}])
    expect(wrapper.vm.isLocalLoading).to.equal(false)
    expect(wrapper.find('.a-pagination-stub').exists()).to.equal(false)
  })

  it('updates local data when dataSource prop changes', async () => {
    const wrapper = mount(CTable, {
      propsData: {
        dataSource: [{id: 1}]
      },
      attrs: {
        columns: []
      },
      stubs
    })

    await wrapper.setProps({dataSource: [{id: 2}]})

    expect(wrapper.vm.localDataSource).to.deep.equal([{id: 2}])
  })

  it('loads remote data on pagination change', async () => {
    const calls = []
    const wrapper = mount(CTable, {
      propsData: {
        data: params => {
          calls.push({...params})
          return Promise.resolve({
            data: {
              payload: [{id: 3}],
              totalSize: 12
            }
          })
        }
      },
      attrs: {
        columns: []
      },
      stubs
    })

    wrapper.vm.paginationChange(2, 20)
    await wait(850)
    await wrapper.vm.$nextTick()

    expect(calls[0]).to.deep.equal({current: 2, pageNo: 2, pageSize: 20})
    expect(wrapper.vm.localDataSource).to.deep.equal([{id: 3}])
    expect(wrapper.vm.total).to.equal(12)
    expect(wrapper.vm.isLocalLoading).to.equal(false)
  })

  it('resets to first page when refresh receives true', async () => {
    const wrapper = mount(CTable, {
      propsData: {
        data: () => Promise.resolve({data: {payload: [], totalSize: 0}})
      },
      attrs: {
        columns: []
      },
      stubs
    })

    wrapper.setData({
      localPagination: {
        current: 4,
        pageNo: 4,
        pageSize: 10
      }
    })
    wrapper.vm.loadData = () => {}
    wrapper.vm.refresh(true)

    expect(wrapper.vm.localPagination.current).to.equal(1)
    expect(wrapper.vm.localPagination.pageNo).to.equal(1)
  })

  it('formats total text by language', () => {
    const wrapper = mount(CTable, {
      propsData: {
        pagination: false
      },
      attrs: {
        columns: []
      },
      mocks: {
        $store: {
          state: {
            language: 'en_US'
          }
        }
      },
      stubs
    })

    expect(wrapper.vm.showTotal(5)).to.equal('Total 5')
    wrapper.vm.$store.state.language = 'zh_CN'
    expect(wrapper.vm.showTotal(5)).to.equal('共 5 条')
  })

  it('clears table data', () => {
    const wrapper = mount(CTable, {
      propsData: {
        dataSource: [{id: 1}]
      },
      attrs: {
        columns: []
      },
      stubs
    })

    wrapper.vm.clearData()

    expect(wrapper.vm.localDataSource).to.deep.equal([])
    expect(wrapper.vm.isLocalLoading).to.equal(false)
  })
})
