<template>
  <div id="app">
<!--    <c-banner title="title"></c-banner>-->
<!--    <c-banner>123</c-banner>-->
    <!--        <c-button disabled type="success" @click="clickHandler(1)" icon="icon-jingxiang">CTMD</c-button>-->
    <!--        <c-button type="danger"  size="large" tip="giao">CTMD</c-button>-->
    <!--    <c-icon name="icon-shijian"></c-icon>-->
    <!--    <c-card  title="giao" @more="clickMore">-->
    <!--      <template #more>-->
    <!--        <p style="font-size: 20px;">more</p>-->
    <!--      </template>-->
    <!--      content-->
    <!--    </c-card>-->
    <!--    <c-card-item :data="{title:'h1',value:'vlaue'}"></c-card-item>-->
    <!--    <div style="width: 100px;margin-top: 100px;margin-left: 200px;">-->
    <!--      <c-ellipsis text="test test test test test test test test test test test test test test"></c-ellipsis>-->
    <!--      <c-editable-cell emptyPlaceholder="emptyPlaceholder"></c-editable-cell>-->
    <!--    </div>-->
    <!--  <c-input label="asdf"  v-model="text"></c-input>-->
    <!--    <c-empty></c-empty>-->
    <!--        <c-input-number v-model="num" size="small"></c-input-number>-->
    <!--    <c-radio-group v-model="num">-->
    <!--      <c-radio value="one">one</c-radio>-->
    <!--      <c-radio value="two">two</c-radio>-->
    <!--    </c-radio-group>-->
    <!--    <c-nav-header>-->
    <!--      <template #left>left</template>-->
    <!--      <template #right>righ</template>-->
    <!--    </c-nav-header>-->
    <!--    <c-range-picker v-model="time" :currentType="2"></c-range-picker>-->
    <!--    <c-table-form-->
    <!--        v-model="formData"-->
    <!--        :formOptions="formOptions"-->
    <!--        @submit="handleSubmit"-->
    <!--    ></c-table-form>-->
    <!--    <c-duration v-model="month"></c-duration>-->
    <!--    <c-tabs-->
    <!--        :tabs="imageTypes"-->
    <!--        :selectIndex.sync="tabIndex"></c-tabs>-->
    <!--    <c-tap-->
    <!--        :list="typeList"-->
    <!--        v-model="tabIndex"-->
    <!--        @select-item="changeType"-->
    <!--    ></c-tap>-->
    <!--    <c-form-->
    <!--        ref="form"-->
    <!--        :formOptions="formOptions1"-->
    <!--        v-model="form"-->
    <!--    >-->
    <!--      <template #account>-->
    <!--        <c-input-->
    <!--            label="account"-->
    <!--            v-model="formData.account">-->
    <!--        </c-input>-->
    <!--      </template>-->
    <!--    </c-form>-->
    <!--    <button @click="changeType(2)">test debounce</button>-->
    <!--                <c-search-select  :queryPromise="queryOptions"-->
    <!--                                  placeholder="测试一下"-->
    <!--                                  v-model="tabIndex"-->
    <!--                                  style="width:320px;margin: 0 auto;"-->
    <!--                >-->
    <!--                    <p slot='extraContent' style="text-align:center;">extraContent</p>-->
    <!--                </c-search-select>-->
    <!--    <c-table ref="table"-->
    <!--             :filterOptions="filterOptions"-->
    <!--             :columns="columns"-->
    <!--             :data="queryList"-->
    <!--             @filterChange="handleFilterChange"-->
    <!--             rowKey="id">-->
    <!--      <template #id="{ text }">-->
    <!--        <span>{{ text }}</span>-->
    <!--      </template>-->
    <!--      <c-btn-wrap slot='operate' slot-scope="{text,record}">-->
    <!--        <c-table-btn-->
    <!--            type="danger"-->
    <!--            tip="giao11"-->
    <!--            @click="clickHandler(text,record)"-->
    <!--        >-->
    <!--        </c-table-btn>-->
    <!--        <c-table-btn-->
    <!--            tip="giao2"-->
    <!--            @click="clickHandler(2)"-->
    <!--        >-->
    <!--        </c-table-btn>-->
    <!--        <c-table-btn-->
    <!--            tip="giao3"-->
    <!--            @click="clickHandler(3)"-->
    <!--        >-->
    <!--        </c-table-btn>-->
    <!--        <c-table-btn-->
    <!--            tip="giao4"-->
    <!--            @click="clickHandler(4)"-->
    <!--        >-->
    <!--          <span style="color:blue">giao4</span>-->
    <!--        </c-table-btn>-->
    <!--      </c-btn-wrap>-->
    <!--    </c-table>-->
  </div>
</template>

<script>
import {debounce} from "@/utils";
import axios from 'axios'

export default {
  data() {
    return {
      formOptions1: [
        {key: 'account'},
        {key: 'age'},
        {key: 'name'}
      ],
      form: {
        account: 'kong',
        age: 1,
        name: 'jason'
      },
      typeList: [
        {
          id: "",
          title: 'Allorders',
          type: "totalCount",
          color: "#323232",
          num: 0,
        },
        {
          id: "BillWaitingCharge",
          title: 'Pendingorder',
          type: "waitPayCount",
          color: "#FDBE2E",
          num: 0,
        },
        {
          id: "BillPayOrOver",
          title: 'Completedorder',
          type: "payedCount",
          color: "#4ED067",
          num: 0,
        },
        {
          id: "BillInvalid",
          title: 'Cancelledorder',
          type: "expiredCount",
          color: "#1279F8",
          num: 0,
        },
        {
          id: "BillRefund",
          title: 'Refundrecord',
          type: "refundCount",
          color: "#F7665E",
          num: 0,
        },
      ],
      tabIndex: 1,
      imageTypes: [{name: 'one'}, {name: 'two'}],
      month: 1,
      time: [],
      formData: {
        queryName: '',
        type: undefined
      },
      filterOptions: [],
      formOptions: [
        {
          key: 'queryName',
          type: 'input',
          placeholder: 'placeholder'
        },
        {
          key: 'type',
          type: 'select',
          placeholder: 'placeholder',
          options: [{value: 1, label: 'one'}, {value: 2, label: 'two'}]
        },
      ],
      num: 'one',
      type: 1,
      text: 'text',
      dateOptions: [
        {id: 1, name: '10-20'},
        {id: 2, name: '30-40'}
      ],
      dataFilterValue: '',
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: {customRender: 'id'}
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'content',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: 'createTime',
          dataIndex: 'createTime',
          key: 'createTime',
          width: '140px',
          scopedSlots: {filterDropdown: 'filterDropdown'},
          filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              this.filterOptions = this.dateOptions;
            }
          }
        },
        {
          title: 'operate',
          key: 'operate',
          width: 300,
          scopedSlots: {customRender: 'operate'}
        }
      ]
    }
  },
  watch: {
    tabIndex(nv) {
      console.log(nv)
    }
  },
  mounted() {
    // this.queryOptions()
    // this.$refs.table.refresh()
  },
  methods: {
    handleFilterChange(val, confirm) {
      confirm();
      this.$refs.table.refresh()
    },
    queryOptions() {
      return axios.get('/getoptions?ID=12345')
    },
    queryList(params) {
      // const data = Object.assign({}, params, this.formData, result);
      return axios({
        url: '/getoptions',
        method: 'get',
        params
      })
    },
    changeType: debounce(function (i) {
      console.log(this.text)
      console.log(i)
    }),
    handleSubmit() {
      console.log(this.formData)
    },
    clickMore() {
      console.log('more')
    },
    clickHandler(text, record) {
      console.log(text)
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

#app {
  padding: 20px;
  margin-top: 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
