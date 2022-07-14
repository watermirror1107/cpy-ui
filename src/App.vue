<template>
  <div id="app">
    <!--    <c-banner title="title"></c-banner>-->
    <!--    <c-banner>123</c-banner>-->
    <!--    <c-banner>-->
    <!--      <p-->
    <!--          v-if="true"-->
    <!--          style="font-size: 16px;margin-left: 10px;">-->
    <!--        123-->
    <!--        <span style="color: #969696;">({{ 456}})</span>-->
    <!--      </p>-->
    <!--    </c-banner>-->
    <!--    <c-button type="text">CTMD</c-button>-->
    <!--    <c-button type="text" disabled>CTMD</c-button>-->
    <!--    <c-button type="text" ghost>CTMD</c-button>-->
    <!--    <c-button type="text" ghost disabled>CTMD</c-button>-->
    <!--    <c-icon name="icon-shijian"></c-icon>-->
    <!--        <c-card  title="click" @more="clickMore">-->
    <!--          <template #more>-->
    <!--            <p style="font-size: 20px;">more</p>-->
    <!--          </template>-->
    <!--          content-->
    <!--        </c-card>-->
    <!--        <c-card-item :data="{title:'h1',value:'vlaue'}"></c-card-item>-->
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
    <!--        <c-range-picker v-model="time" :currentType="2"></c-range-picker>-->
    <!--    <c-table-form-->
    <!--        v-model="formData"-->
    <!--        :formOptions="formOptions"-->
    <!--        @submit="handleSubmit"-->
    <!--    ></c-table-form>-->
    <!--    <c-duration v-model="month"></c-duration>-->
    <!--        <c-tabs-->
    <!--            :tabs="imageTypes"-->
    <!--            v-model="tabIndex"></c-tabs>-->
    <!--        <c-tap-->
    <!--            :list="typeList"-->
    <!--            v-model="tabIndex"-->
    <!--            @select-item="changeType"-->
    <!--        ></c-tap>-->
    <!--        <c-form-->
    <!--            ref="form"-->
    <!--            :formOptions="formOptions1"-->
    <!--            v-model="form"-->
    <!--        >-->
    <!--          <template #account>-->
    <!--            <c-input-->
    <!--                label="account"-->
    <!--                v-model="formData.account">-->
    <!--            </c-input>-->
    <!--          </template>-->
    <!--        </c-form>-->
    <!--    <button @click="changeType(2)">test debounce</button>-->
<!--    <c-search-select :queryPromise="queryOptions"-->
<!--                     placeholder="测试一下"-->
<!--                     v-model="tabIndex"-->
<!--                     style="width:320px;margin: 0 auto;"-->
<!--    >-->
<!--      <p slot='extraContent' style="text-align:center;" @click="clickHandler(1)">extraContent</p>-->
<!--    </c-search-select>-->
    <c-search-select :queryPromise="queryOptions"
                     :extraResult="[{id:'test',name:'test'}]"
                     mode="multiple"
                     :extraParams="{date:'2012'}"
                     placeholder="测试一下"
                     v-model="tabIndex2"
                     style="width:320px;margin: 0 auto;">
    </c-search-select>
    <!--    <c-table-->
    <!--        :bordered="false"-->
    <!--        ref="table"-->
    <!--        :rowSelection="{-->
    <!--            selectedRowKeys: selectedRowKeys,-->
    <!--            onChange: onSelectChange,-->
    <!--          }"-->
    <!--        :filterOptions="filterOptions"-->
    <!--        :columns="columns"-->
    <!--        :loopTime="10000"-->
    <!--        :data="queryList"-->
    <!--        @filterChange="handleFilterChange"-->
    <!--        rowKey="id">-->
    <!--      <template #id="{ text,record }">-->
    <!--        <a-popover>-->
    <!--          <template #content>-->
    <!--            <c-table :columns="columns"-->
    <!--                     :dataSource="record.children"></c-table>-->
    <!--          </template>-->
    <!--          <span style="color:red">{{ text }}</span>-->
    <!--        </a-popover>-->
    <!--      </template>-->
    <!--      <template #operate="{record,index}">-->
    <!--        <c-btn-wrap>-->
    <!--          <c-table-btn-->
    <!--              :disabled="isClick"-->
    <!--              text="click1"-->
    <!--              @click="clickHandler1"-->
    <!--          >-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click2"-->
    <!--              @click="clickHandler2"-->
    <!--          >-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click3"-->
    <!--              @click="clickHandler3"-->
    <!--          >-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click4"-->
    <!--              @click="clickHandler4">-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click5"-->
    <!--              @click="clickHandler5">-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click6"-->
    <!--              @click="clickHandler6">-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click7"-->
    <!--              @click="clickHandler7">-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click8"-->
    <!--              @click="clickHandler8">-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              :disabled="isClick"-->
    <!--              text="click9"-->
    <!--              @click="clickHandler9">-->
    <!--          </c-table-btn>-->
    <!--          <c-table-btn-->
    <!--              text="click10"-->
    <!--              @click="clickHandler10(index)">-->
    <!--          </c-table-btn>-->
    <!--        </c-btn-wrap>-->
    <!--      </template>-->
    <!--      <template #actionBar>-->
    <!--        <c-button @click="consoleRow" icon="icon-shanchu" type="text" disabled>删除</c-button>-->
    <!--      </template>-->
    <!--    </c-table>-->
  </div>
</template>

<script>
import {debounce} from "@/utils";
import axios from 'axios'
import CButton from "../packages/CButton";
import CTable from "../packages/CTable";
import CBtnWrap from "../packages/CBtnWrap";
import CTableBtn from "../packages/CTableBtn";
import CSearchSelect from "../packages/CSearchSelect";
import CTap from "../packages/CTap";
import CRangePicker from "../packages/CRangePicker";
import CTabs from "../packages/CTabs";
import CTableForm from "../packages/CTableForm";
import CCard from "../packages/CCard";

export default {
  components: {
    CButton, CTable, CBtnWrap, CTableBtn, CSearchSelect, CTap, CRangePicker, CTabs, CTableForm, CCard
  },
  data() {
    return {
      isClick: false,
      dataSource: [{
        id: 1,
        name: 'name',
        content: 'content',
        createTime: '2012-12-12',
        children: [{id: 2, name: 'name', content: 'content', createTime: '2012-12-12'}]
      }, {
        id: 3,
        name: 'name',
        content: 'content',
        createTime: '2012-12-12',
        children: []
      }],
      selectedRowKeys: [], // 勾选的key
      selectedRows: [], // 选中的行数据
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
      tabIndex: undefined,
      tabIndex2: [],
      imageTypes: [{name: 'one'}, {name: 'two'}],
      month: 1,
      time: [],
      formData: {
        queryName: '',
        type: undefined,
        date: []
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
        {
          key: 'date',
          type: 'range-picker',
          placeholder: ['开始日期1', '结束日期2'],
          mode: ['date', 'date'],
          format: 'YYYY-MM-DD'
        }
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
          scopedSlots: {customRender: 'id'},
          width: 100
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'content',
          dataIndex: 'content',
          key: 'content',
          width: 100
        },
        {
          title: 'createTime',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 140,
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
    consoleRow() {
      console.log(this.selectedRows)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleFilterChange(val, confirm) {
      confirm();
      this.$refs.table.refresh()
    },
    queryOptions(params) {
      return axios.get('/getoptions', {params})
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
      console.log(record)
    },
    clickHandler1() {
      this.isClick = true
      setTimeout(() => {
        this.isClick = false
      }, 3000)
      console.log(1)
    },
    clickHandler2() {
      console.log(2)
    },
    clickHandler3() {
      console.log(3)
    },
    clickHandler4() {
      console.log(4)
    },
    clickHandler5() {
      console.log(5)
    },
    clickHandler6() {
      console.log(6)
    },
    clickHandler7() {
      console.log(7)
    },
    clickHandler8() {
      console.log(8)
    },
    clickHandler9() {
      this.isClick = true
      setTimeout(() => {
        this.isClick = false
      }, 3000)
      console.log(9)
    },
    clickHandler10(index) {
      console.log(10)
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
