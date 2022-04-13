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
    <!--        <c-button disabled type="success" @click="clickHandler(1)" icon="icon-jingxiang">CTMD</c-button>-->
    <!--                <c-button type="warning" ghost size="large" tip="clickclickclickclick丰">CTMD</c-button>-->
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
    <!--                              <p slot='extraContent' style="text-align:center;" @click="clickHandler(1)">extraContent</p>-->
    <!--    </c-search-select>-->
    <c-table
        ref="table"
        :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
        :filterOptions="filterOptions"
        :columns="columns"
        :dataSource="dataSource"
        @filterChange="handleFilterChange"
        rowKey="id">
      <template #id="{ text }">
        <span>{{ text }}</span>
      </template>
      <template #operate="{record,index}">
        <c-btn-wrap>
          <c-table-btn
              :disabled="isClick"
              text="click1"
              @click="clickHandler1"
          >
          </c-table-btn>
          <c-table-btn
              text="click2"
              @click="clickHandler2"
          >
          </c-table-btn>
          <c-table-btn
              text="click3"
              @click="clickHandler3"
          >
          </c-table-btn>
          <c-table-btn
              text="click4"
              @click="clickHandler4">
          </c-table-btn>
          <c-table-btn
              text="click5"
              @click="clickHandler5">
          </c-table-btn>
          <c-table-btn
              text="click6"
              @click="clickHandler6">
          </c-table-btn>
          <c-table-btn
              text="click7"
              @click="clickHandler7">
          </c-table-btn>
          <c-table-btn
              text="click8"
              @click="clickHandler8">
          </c-table-btn>
          <c-table-btn
              :disabled="isClick"
              text="click9"
              @click="clickHandler9">
          </c-table-btn>
          <c-table-btn
              text="click10"
              @click="clickHandler10(index)">
          </c-table-btn>
        </c-btn-wrap>
      </template>
      <template #actionBar>
        <a-button @click="consoleRow">删除</a-button>
      </template>
    </c-table>
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
    CButton, CTable, CBtnWrap, CTableBtn, CSearchSelect, CTap, CRangePicker, CTabs,CTableForm,CCard
  },
  data() {
    return {
      isClick: false,
      dataSource: [{id: 1, name: 'name', content: 'content', createTime: '2012-12-12'}],
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
          width: 500
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
   this.dataSource= [
      {
        "id": 19,
        "parentId": 0,
        "name": "地区管理",
        "menuCode": "rg",
        "url": "/region",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 2,
        "updateTime": "2021-12-14 16:03:53",
        "createTime": "2021-12-14 15:54:53",
        "children": [
          {
            "id": 60,
            "parentId": 19,
            "name": "创建区域页",
            "menuCode": "rg_p_create",
            "url": "/createRegion",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 16,
            "updateTime": "2021-12-16 14:23:02",
            "createTime": "2021-12-16 14:22:35"
          },
          {
            "id": 56,
            "parentId": 19,
            "name": "区域详情页",
            "menuCode": "rg_p_detail",
            "url": "/regionDetail/:id",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 17,
            "updateTime": "2021-12-16 14:35:03",
            "createTime": "2021-12-16 10:23:04",
            "children": [
              {
                "id": 63,
                "parentId": 56,
                "name": "修改区域名称",
                "menuCode": "rg_p_detail_editname",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 44,
                "updateTime": "2021-12-16 14:35:45",
                "createTime": "2021-12-16 14:35:45"
              }
            ]
          },
          {
            "id": 232,
            "parentId": 19,
            "name": "zone详情",
            "menuCode": "rg_p_zone",
            "url": "/zone",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 19,
            "updateTime": "2022-01-14 11:07:05",
            "createTime": "2022-01-14 11:07:05",
            "children": [
              {
                "id": 237,
                "parentId": 232,
                "name": "创建zone",
                "menuCode": "rg_p_zone_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 206,
                "updateTime": "2022-01-18 11:36:20",
                "createTime": "2022-01-18 11:36:20"
              },
              {
                "id": 238,
                "parentId": 232,
                "name": "同步底层",
                "menuCode": "rg_p_zone_b_asyncExit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 207,
                "updateTime": "2022-01-21 16:01:30",
                "createTime": "2022-01-18 12:01:56"
              },
              {
                "id": 239,
                "parentId": 232,
                "name": "zone编辑",
                "menuCode": "rg_p_zone_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 208,
                "updateTime": "2022-01-18 12:02:24",
                "createTime": "2022-01-18 12:02:24"
              },
              {
                "id": 240,
                "parentId": 232,
                "name": "zone删除",
                "menuCode": "rg_p_zone_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 209,
                "updateTime": "2022-01-18 12:02:50",
                "createTime": "2022-01-18 12:02:50"
              },
              {
                "id": 241,
                "parentId": 232,
                "name": "zone上下架",
                "menuCode": "rg_p_zone_b_changeUpstatus",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 210,
                "updateTime": "2022-01-18 12:03:59",
                "createTime": "2022-01-18 12:03:59"
              },
              {
                "id": 251,
                "parentId": 232,
                "name": "同步计算节点",
                "menuCode": "rg_p_zone_b_asyncComputeNode",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 218,
                "updateTime": "2022-01-21 16:38:48",
                "createTime": "2022-01-21 16:38:48"
              }
            ]
          },
          {
            "id": 233,
            "parentId": 19,
            "name": "物理机详情",
            "menuCode": "rg_p_machine",
            "url": "/machine",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 31,
            "updateTime": "2022-01-14 11:09:27",
            "createTime": "2022-01-14 11:09:27",
            "children": [
              {
                "id": 242,
                "parentId": 233,
                "name": "创建物理机",
                "menuCode": "rg_p_machine_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 211,
                "updateTime": "2022-01-18 12:04:42",
                "createTime": "2022-01-18 12:04:42"
              },
              {
                "id": 243,
                "parentId": 233,
                "name": "修改总量",
                "menuCode": "rg_p_machine_b_editAmount",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 212,
                "updateTime": "2022-01-18 12:06:27",
                "createTime": "2022-01-18 12:06:27"
              },
              {
                "id": 244,
                "parentId": 233,
                "name": "删除物理机",
                "menuCode": "rg_p_machine_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 213,
                "updateTime": "2022-01-18 12:06:53",
                "createTime": "2022-01-18 12:06:53"
              },
              {
                "id": 245,
                "parentId": 233,
                "name": "上下架",
                "menuCode": "rg_p_machine_b_changeUpStatus",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 214,
                "updateTime": "2022-01-18 12:07:38",
                "createTime": "2022-01-18 12:07:38"
              }
            ]
          },
          {
            "id": 235,
            "parentId": 19,
            "name": "物理机gpu配置",
            "menuCode": "rg_p_machineGpu",
            "url": "/machineGpu",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 36,
            "updateTime": "2022-01-18 12:15:44",
            "createTime": "2022-01-14 11:18:43",
            "children": [
              {
                "id": 248,
                "parentId": 235,
                "name": "物理gpu创建",
                "menuCode": "rg_p_machineGpu_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 215,
                "updateTime": "2022-01-18 12:14:22",
                "createTime": "2022-01-18 12:14:22"
              },
              {
                "id": 249,
                "parentId": 235,
                "name": "编辑物理gpu",
                "menuCode": "rg_p_machineGpu_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 216,
                "updateTime": "2022-01-18 12:14:38",
                "createTime": "2022-01-18 12:14:38"
              },
              {
                "id": 250,
                "parentId": 235,
                "name": "删除物理gpu",
                "menuCode": "rg_p_machineGpu_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 217,
                "updateTime": "2022-01-18 12:14:46",
                "createTime": "2022-01-18 12:14:46"
              }
            ]
          },
          {
            "id": 31,
            "parentId": 19,
            "name": "创建区域信息",
            "menuCode": "rg_create_region",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 37,
            "updateTime": "2021-12-14 16:03:47",
            "createTime": "2021-12-14 16:03:47"
          },
          {
            "id": 32,
            "parentId": 19,
            "name": "总量配置",
            "menuCode": "rg_totalset",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 41,
            "updateTime": "2021-12-14 16:04:55",
            "createTime": "2021-12-14 16:04:55"
          },
          {
            "id": 33,
            "parentId": 19,
            "name": "下架",
            "menuCode": "rg_takedown",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 200,
            "updateTime": "2021-12-14 16:05:48",
            "createTime": "2021-12-14 16:05:48"
          },
          {
            "id": 34,
            "parentId": 19,
            "name": "绑定底层账号",
            "menuCode": "rg_bindno",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 201,
            "updateTime": "2021-12-14 16:06:40",
            "createTime": "2021-12-14 16:06:40"
          },
          {
            "id": 35,
            "parentId": 19,
            "name": "资源上限设置",
            "menuCode": "rg_sourceset",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 202,
            "updateTime": "2021-12-14 16:07:08",
            "createTime": "2021-12-14 16:07:08"
          },
          {
            "id": 36,
            "parentId": 19,
            "name": "修改区域信息",
            "menuCode": "rg_changerg",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 203,
            "updateTime": "2021-12-14 16:07:39",
            "createTime": "2021-12-14 16:07:39"
          },
          {
            "id": 37,
            "parentId": 19,
            "name": "删除区域",
            "menuCode": "rg_delete",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 204,
            "updateTime": "2021-12-14 16:08:02",
            "createTime": "2021-12-14 16:08:02"
          },
          {
            "id": 252,
            "parentId": 19,
            "name": "分配实例列表",
            "menuCode": "rg_p_mountedInstance",
            "url": "/mountedInstance",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 219,
            "updateTime": "2022-01-26 11:36:41",
            "createTime": "2022-01-26 11:36:41",
            "children": [
              {
                "id": 253,
                "parentId": 252,
                "name": "删除",
                "menuCode": "rg_p_mountedInstance_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 220,
                "updateTime": "2022-01-26 11:37:17",
                "createTime": "2022-01-26 11:37:17"
              }
            ]
          }
        ]
      },
      {
        "id": 20,
        "parentId": 0,
        "name": "客户管理",
        "menuCode": "us",
        "url": "/user",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 3,
        "updateTime": "2021-12-14 16:04:10",
        "createTime": "2021-12-14 15:55:15",
        "children": [
          {
            "id": 216,
            "parentId": 20,
            "name": "用户硬件资源统计",
            "menuCode": "us_p_hardwareDetail",
            "url": "/hardwareDetail",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 20,
            "updateTime": "2021-12-21 18:22:10",
            "createTime": "2021-12-21 18:22:10"
          },
          {
            "id": 146,
            "parentId": 20,
            "name": "月度账单",
            "menuCode": "us_p_monthlyBill",
            "url": "/monthlyBill/:id",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 21,
            "updateTime": "2021-12-21 15:44:40",
            "createTime": "2021-12-21 15:44:40"
          },
          {
            "id": 145,
            "parentId": 20,
            "name": "余额明细",
            "menuCode": "us_p_balanceDetail",
            "url": "/balanceDetail/:id",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 22,
            "updateTime": "2021-12-21 15:44:09",
            "createTime": "2021-12-21 15:44:09"
          },
          {
            "id": 61,
            "parentId": 20,
            "name": "客户详情页",
            "menuCode": "us_p_detail",
            "url": "/userDetail/:id",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 42,
            "updateTime": "2021-12-16 14:26:47",
            "createTime": "2021-12-16 14:26:47",
            "children": [
              {
                "id": 62,
                "parentId": 61,
                "name": "充值",
                "menuCode": "us_p_detail_charge",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 43,
                "updateTime": "2021-12-16 14:27:58",
                "createTime": "2021-12-16 14:27:58"
              },
              {
                "id": 64,
                "parentId": 61,
                "name": "禁用",
                "menuCode": "us_p_detail_disable",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 45,
                "updateTime": "2021-12-16 14:36:13",
                "createTime": "2021-12-16 14:36:13"
              },
              {
                "id": 65,
                "parentId": 61,
                "name": "设置上限",
                "menuCode": "us_p_detail_setmax",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 46,
                "updateTime": "2021-12-16 14:36:46",
                "createTime": "2021-12-16 14:36:46"
              }
            ]
          },
          {
            "id": 40,
            "parentId": 20,
            "name": "上限设置",
            "menuCode": "us_sourceset",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 125,
            "updateTime": "2021-12-14 16:09:51",
            "createTime": "2021-12-14 16:09:51"
          },
          {
            "id": 39,
            "parentId": 20,
            "name": "禁用",
            "menuCode": "us_disabled",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 126,
            "updateTime": "2021-12-14 16:09:22",
            "createTime": "2021-12-14 16:09:22"
          },
          {
            "id": 38,
            "parentId": 20,
            "name": "管理",
            "menuCode": "us_manage",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 196,
            "updateTime": "2021-12-14 16:09:02",
            "createTime": "2021-12-14 16:09:02"
          },
          {
            "id": 230,
            "parentId": 20,
            "name": "用户订单",
            "menuCode": "us_p_userbills",
            "url": "/userBills/:id",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 199,
            "updateTime": "2022-01-05 14:11:04",
            "createTime": "2022-01-05 14:11:04"
          }
        ]
      },
      {
        "id": 21,
        "parentId": 0,
        "name": "网络管理",
        "menuCode": "nt",
        "url": "/network",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 51,
        "updateTime": "2021-12-24 10:14:20",
        "createTime": "2021-12-14 15:56:03",
        "children": [
          {
            "id": 66,
            "parentId": 21,
            "name": "网络详情",
            "menuCode": "nt_p_detail",
            "url": "/networkDetail",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 23,
            "updateTime": "2021-12-16 14:38:07",
            "createTime": "2021-12-16 14:38:07",
            "children": [
              {
                "id": 67,
                "parentId": 66,
                "name": "添加公网IP",
                "menuCode": "nt_p_detail_addip",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 48,
                "updateTime": "2021-12-16 14:38:38",
                "createTime": "2021-12-16 14:38:38"
              },
              {
                "id": 68,
                "parentId": 66,
                "name": "编辑",
                "menuCode": "nt_p_detail_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 49,
                "updateTime": "2021-12-16 14:39:08",
                "createTime": "2021-12-16 14:39:08"
              },
              {
                "id": 69,
                "parentId": 66,
                "name": "删除",
                "menuCode": "nt_p_detail_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 50,
                "updateTime": "2021-12-16 14:39:23",
                "createTime": "2021-12-16 14:39:23"
              }
            ]
          },
          {
            "id": 41,
            "parentId": 21,
            "name": "管理",
            "menuCode": "nt_manage",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 47,
            "updateTime": "2021-12-14 16:10:30",
            "createTime": "2021-12-14 16:10:30"
          }
        ]
      },
      {
        "id": 101,
        "parentId": 0,
        "name": "资源管理",
        "menuCode": "sm",
        "url": "/sourceManage",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 73,
        "updateTime": "2021-12-16 17:24:13",
        "createTime": "2021-12-16 17:24:13",
        "children": [
          {
            "id": 102,
            "parentId": 101,
            "name": "实例管理",
            "menuCode": "sm_ins",
            "url": "/sourceManage/instance",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 82,
            "updateTime": "2021-12-16 17:24:49",
            "createTime": "2021-12-16 17:24:49",
            "children": [
              {
                "id": 104,
                "parentId": 102,
                "name": "资源测试",
                "menuCode": "sm_ins_add",
                "url": "/sourceManage/addInstance",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 83,
                "updateTime": "2021-12-16 17:26:10",
                "createTime": "2021-12-16 17:26:10"
              },
              {
                "id": 103,
                "parentId": 102,
                "name": "实例详情",
                "menuCode": "sm_ins_p_detail",
                "url": "/sourceManage/instanceDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 84,
                "updateTime": "2021-12-16 17:25:27",
                "createTime": "2021-12-16 17:25:27"
              },
              {
                "id": 147,
                "parentId": 102,
                "name": "重启",
                "menuCode": "sm_ins_b_restart",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 127,
                "updateTime": "2021-12-21 15:50:39",
                "createTime": "2021-12-21 15:50:39"
              },
              {
                "id": 148,
                "parentId": 102,
                "name": "开机",
                "menuCode": "sm_ins_b_start",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 128,
                "updateTime": "2021-12-21 15:51:02",
                "createTime": "2021-12-21 15:51:02"
              },
              {
                "id": 149,
                "parentId": 102,
                "name": "进入桌面",
                "menuCode": "sm_ins_b_remote",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 129,
                "updateTime": "2021-12-21 15:51:17",
                "createTime": "2021-12-21 15:51:17"
              },
              {
                "id": 150,
                "parentId": 102,
                "name": "删除",
                "menuCode": "sm_ins_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 130,
                "updateTime": "2021-12-21 15:51:52",
                "createTime": "2021-12-21 15:51:52"
              },
              {
                "id": 151,
                "parentId": 102,
                "name": "资源测试",
                "menuCode": "sm_ins_b_add",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 131,
                "updateTime": "2021-12-21 15:54:33",
                "createTime": "2021-12-21 15:54:33"
              },
              {
                "id": 217,
                "parentId": 102,
                "name": "同步底层",
                "menuCode": "sm_ins_b_sync",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 197,
                "updateTime": "2021-12-23 14:07:11",
                "createTime": "2021-12-23 14:07:11"
              }
            ]
          },
          {
            "id": 105,
            "parentId": 101,
            "name": "镜像管理",
            "menuCode": "sm_mr",
            "url": "/sourceManage/mirror",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 85,
            "updateTime": "2021-12-16 17:27:04",
            "createTime": "2021-12-16 17:27:04",
            "children": [
              {
                "id": 152,
                "parentId": 105,
                "name": "删除",
                "menuCode": "sm_mr_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 132,
                "updateTime": "2021-12-21 15:56:35",
                "createTime": "2021-12-21 15:56:35"
              }
            ]
          },
          {
            "id": 106,
            "parentId": 101,
            "name": "磁盘管理",
            "menuCode": "sm_vo",
            "url": "/sourceManage/volume",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 86,
            "updateTime": "2021-12-16 17:27:40",
            "createTime": "2021-12-16 17:27:40",
            "children": [
              {
                "id": 107,
                "parentId": 106,
                "name": "磁盘详情",
                "menuCode": "sm_vo_p_detail",
                "url": "/sourceManage/detailVolume",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 87,
                "updateTime": "2021-12-16 17:28:29",
                "createTime": "2021-12-16 17:28:29"
              },
              {
                "id": 153,
                "parentId": 106,
                "name": "删除",
                "menuCode": "sm_vo_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 133,
                "updateTime": "2021-12-21 15:57:34",
                "createTime": "2021-12-21 15:57:34"
              }
            ]
          },
          {
            "id": 108,
            "parentId": 101,
            "name": "快照管理",
            "menuCode": "sm_sna",
            "url": "/sourceManage/snapshot",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 88,
            "updateTime": "2021-12-16 17:29:54",
            "createTime": "2021-12-16 17:29:54",
            "children": [
              {
                "id": 154,
                "parentId": 108,
                "name": "删除",
                "menuCode": "sm_sna_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 134,
                "updateTime": "2021-12-21 15:59:13",
                "createTime": "2021-12-21 15:59:13"
              }
            ]
          },
          {
            "id": 109,
            "parentId": 101,
            "name": "安全组管理",
            "menuCode": "sm_sg",
            "url": "/sourceManage/securityGroup",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 89,
            "updateTime": "2021-12-16 17:32:24",
            "createTime": "2021-12-16 17:31:04",
            "children": [
              {
                "id": 110,
                "parentId": 109,
                "name": "安全组详情",
                "menuCode": "sm_sg_p_detail",
                "url": "/sourceManage/securityGroupDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 90,
                "updateTime": "2021-12-16 17:31:37",
                "createTime": "2021-12-16 17:31:37"
              },
              {
                "id": 155,
                "parentId": 109,
                "name": "删除",
                "menuCode": "sm_sg_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 135,
                "updateTime": "2021-12-21 16:00:02",
                "createTime": "2021-12-21 16:00:02"
              }
            ]
          },
          {
            "id": 111,
            "parentId": 101,
            "name": "网络管理",
            "menuCode": "sm_nw",
            "url": "/sourceManage/network",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 91,
            "updateTime": "2021-12-16 17:33:33",
            "createTime": "2021-12-16 17:33:33",
            "children": [
              {
                "id": 112,
                "parentId": 111,
                "name": "网络详情",
                "menuCode": "sm_nw_p_detail",
                "url": "/sourceManage/networkDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 92,
                "updateTime": "2021-12-16 17:34:38",
                "createTime": "2021-12-16 17:34:38"
              },
              {
                "id": 113,
                "parentId": 111,
                "name": "网络关联实例列表",
                "menuCode": "sm_nw_p_link",
                "url": "/sourceManage/linkInstanceList",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 93,
                "updateTime": "2021-12-16 17:36:44",
                "createTime": "2021-12-16 17:36:44"
              },
              {
                "id": 156,
                "parentId": 111,
                "name": "删除",
                "menuCode": "sm_nw_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 136,
                "updateTime": "2021-12-21 16:02:18",
                "createTime": "2021-12-21 16:02:11"
              }
            ]
          },
          {
            "id": 114,
            "parentId": 101,
            "name": "密钥对管理",
            "menuCode": "sm_key",
            "url": "/sourceManage/keypair",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 94,
            "updateTime": "2021-12-16 17:37:41",
            "createTime": "2021-12-16 17:37:41",
            "children": [
              {
                "id": 115,
                "parentId": 114,
                "name": "密钥对详情",
                "menuCode": "sm_key_p_detail",
                "url": "/sourceManage/keypairDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 95,
                "updateTime": "2021-12-16 17:38:16",
                "createTime": "2021-12-16 17:38:16"
              },
              {
                "id": 157,
                "parentId": 114,
                "name": "删除",
                "menuCode": "sm_key_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 137,
                "updateTime": "2021-12-21 16:04:05",
                "createTime": "2021-12-21 16:04:05"
              }
            ]
          },
          {
            "id": 116,
            "parentId": 101,
            "name": "共享磁盘管理",
            "menuCode": "sm_sv",
            "url": "/sourceManage/sharedVolume",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 96,
            "updateTime": "2021-12-16 17:39:18",
            "createTime": "2021-12-16 17:39:18",
            "children": [
              {
                "id": 117,
                "parentId": 116,
                "name": "共享磁盘详情",
                "menuCode": "sm_sv_p_detail",
                "url": "/sourceManage/sharedVolumeDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 97,
                "updateTime": "2021-12-16 17:40:51",
                "createTime": "2021-12-16 17:40:51"
              },
              {
                "id": 158,
                "parentId": 116,
                "name": "查看详情",
                "menuCode": "sm_sv_b_detail",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 138,
                "updateTime": "2021-12-21 16:05:38",
                "createTime": "2021-12-21 16:05:38"
              },
              {
                "id": 159,
                "parentId": 116,
                "name": "删除",
                "menuCode": "sm_sv_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 139,
                "updateTime": "2021-12-21 16:05:57",
                "createTime": "2021-12-21 16:05:57"
              }
            ]
          }
        ]
      },
      {
        "id": 93,
        "parentId": 0,
        "name": "文档管理",
        "menuCode": "doc",
        "url": "/docManage",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 76,
        "updateTime": "2021-12-16 17:17:11",
        "createTime": "2021-12-16 17:17:11",
        "children": [
          {
            "id": 94,
            "parentId": 93,
            "name": "帮助中心",
            "menuCode": "doc_help",
            "url": "/docManage/helpDocument",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 74,
            "updateTime": "2021-12-16 17:17:35",
            "createTime": "2021-12-16 17:17:35",
            "children": [
              {
                "id": 95,
                "parentId": 94,
                "name": "添加文章",
                "menuCode": "doc_help_p_create",
                "url": "/docManage/createDocument",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 75,
                "updateTime": "2021-12-16 17:18:34",
                "createTime": "2021-12-16 17:18:34"
              },
              {
                "id": 160,
                "parentId": 94,
                "name": "添加文章",
                "menuCode": "doc_help_b_add",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 140,
                "updateTime": "2021-12-21 16:06:53",
                "createTime": "2021-12-21 16:06:53"
              },
              {
                "id": 161,
                "parentId": 94,
                "name": "编辑",
                "menuCode": "doc_help_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 141,
                "updateTime": "2021-12-21 16:07:07",
                "createTime": "2021-12-21 16:07:07"
              },
              {
                "id": 162,
                "parentId": 94,
                "name": "上下架",
                "menuCode": "doc_help_b_push",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 142,
                "updateTime": "2021-12-21 16:09:40",
                "createTime": "2021-12-21 16:07:32"
              },
              {
                "id": 164,
                "parentId": 94,
                "name": "置顶",
                "menuCode": "doc_help_b_top",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 144,
                "updateTime": "2021-12-21 16:07:59",
                "createTime": "2021-12-21 16:07:59"
              },
              {
                "id": 165,
                "parentId": 94,
                "name": "删除",
                "menuCode": "doc_help_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 145,
                "updateTime": "2021-12-21 16:08:12",
                "createTime": "2021-12-21 16:08:12"
              }
            ]
          }
        ]
      },
      {
        "id": 118,
        "parentId": 0,
        "name": "资源配置",
        "menuCode": "sc",
        "url": "/sourceConfig",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 79,
        "updateTime": "2021-12-16 17:41:56",
        "createTime": "2021-12-16 17:41:56",
        "children": [
          {
            "id": 119,
            "parentId": 118,
            "name": "磁盘类型配置",
            "menuCode": "sc_vo",
            "url": "/sourceConfig/volume",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 99,
            "updateTime": "2021-12-16 17:42:15",
            "createTime": "2021-12-16 17:42:15",
            "children": [
              {
                "id": 121,
                "parentId": 119,
                "name": "上架区域",
                "menuCode": "sc_vo_p_region",
                "url": "/ConfigVolumeRegion",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 100,
                "updateTime": "2021-12-16 17:45:23",
                "createTime": "2021-12-16 17:45:23",
                "children": [
                  {
                    "id": 170,
                    "parentId": 121,
                    "name": "编辑",
                    "menuCode": "sc_vo_p_region_b_edit",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 150,
                    "updateTime": "2021-12-21 16:12:26",
                    "createTime": "2021-12-21 16:12:26"
                  },
                  {
                    "id": 171,
                    "parentId": 121,
                    "name": "上下架",
                    "menuCode": "sc_vo_p_region_b_push",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 151,
                    "updateTime": "2021-12-21 16:12:43",
                    "createTime": "2021-12-21 16:12:43"
                  },
                  {
                    "id": 172,
                    "parentId": 121,
                    "name": "删除",
                    "menuCode": "sc_vo_p_region_b_delete",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 152,
                    "updateTime": "2021-12-21 16:12:55",
                    "createTime": "2021-12-21 16:12:55"
                  },
                  {
                    "id": 173,
                    "parentId": 121,
                    "name": "添加绑定区域",
                    "menuCode": "sc_vo_p_region_b_bind",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 153,
                    "updateTime": "2021-12-21 16:16:49",
                    "createTime": "2021-12-21 16:13:09"
                  }
                ]
              },
              {
                "id": 120,
                "parentId": 119,
                "name": "创建磁盘配置",
                "menuCode": "sc_vo_p_create",
                "url": "/sourceConfig/createVolumeConfig",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 101,
                "updateTime": "2021-12-16 17:43:06",
                "createTime": "2021-12-16 17:43:06"
              },
              {
                "id": 166,
                "parentId": 119,
                "name": "创建磁盘类型",
                "menuCode": "sc_vo_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 146,
                "updateTime": "2021-12-21 16:11:05",
                "createTime": "2021-12-21 16:11:05"
              },
              {
                "id": 167,
                "parentId": 119,
                "name": "配置",
                "menuCode": "sc_vo_b_set",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 147,
                "updateTime": "2021-12-21 16:11:24",
                "createTime": "2021-12-21 16:11:24"
              },
              {
                "id": 168,
                "parentId": 119,
                "name": "修改价格",
                "menuCode": "sc_vo_b_change",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 148,
                "updateTime": "2021-12-21 16:11:43",
                "createTime": "2021-12-21 16:11:43"
              },
              {
                "id": 169,
                "parentId": 119,
                "name": "删除",
                "menuCode": "sc_vo_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 149,
                "updateTime": "2021-12-21 16:11:57",
                "createTime": "2021-12-21 16:11:57"
              }
            ]
          },
          {
            "id": 122,
            "parentId": 118,
            "name": "实例规格类型配置",
            "menuCode": "sc_intype",
            "url": "/sourceConfig/instanceType",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 102,
            "updateTime": "2021-12-16 17:46:09",
            "createTime": "2021-12-16 17:46:09",
            "children": [
              {
                "id": 174,
                "parentId": 122,
                "name": "创建实例规格类型",
                "menuCode": "sc_intype_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 154,
                "updateTime": "2021-12-21 16:19:58",
                "createTime": "2021-12-21 16:19:58"
              },
              {
                "id": 175,
                "parentId": 122,
                "name": "修改",
                "menuCode": "sc_intype_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 155,
                "updateTime": "2021-12-21 16:20:14",
                "createTime": "2021-12-21 16:20:14"
              },
              {
                "id": 176,
                "parentId": 122,
                "name": "删除",
                "menuCode": "sc_intype_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 156,
                "updateTime": "2021-12-21 16:20:25",
                "createTime": "2021-12-21 16:20:25"
              }
            ]
          },
          {
            "id": 123,
            "parentId": 118,
            "name": "实例规格配置",
            "menuCode": "sc_in",
            "url": "/sourceConfig/instance",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 103,
            "updateTime": "2021-12-16 17:46:46",
            "createTime": "2021-12-16 17:46:46",
            "children": [
              {
                "id": 124,
                "parentId": 123,
                "name": "上架区域",
                "menuCode": "sc_in_p_region",
                "url": "/configRegion",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 104,
                "updateTime": "2021-12-16 17:47:52",
                "createTime": "2021-12-16 17:47:52",
                "children": [
                  {
                    "id": 181,
                    "parentId": 124,
                    "name": "添加绑定区域",
                    "menuCode": "sc_in_p_region_b_add",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 161,
                    "updateTime": "2021-12-21 16:24:48",
                    "createTime": "2021-12-21 16:24:48"
                  },
                  {
                    "id": 182,
                    "parentId": 124,
                    "name": "上下架",
                    "menuCode": "sc_in_p_region_b_push",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 162,
                    "updateTime": "2021-12-21 16:25:06",
                    "createTime": "2021-12-21 16:25:06"
                  },
                  {
                    "id": 183,
                    "parentId": 124,
                    "name": "删除",
                    "menuCode": "sc_in_p_region_b_delete",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 163,
                    "updateTime": "2021-12-21 16:25:15",
                    "createTime": "2021-12-21 16:25:15"
                  }
                ]
              },
              {
                "id": 125,
                "parentId": 123,
                "name": "创建实例配置",
                "menuCode": "sc_in_p_create",
                "url": "/sourceConfig/createInstanceConfig",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 105,
                "updateTime": "2021-12-16 17:48:49",
                "createTime": "2021-12-16 17:48:49"
              },
              {
                "id": 177,
                "parentId": 123,
                "name": "创建实例规格",
                "menuCode": "sc_in_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 157,
                "updateTime": "2021-12-21 16:22:29",
                "createTime": "2021-12-21 16:22:29"
              },
              {
                "id": 178,
                "parentId": 123,
                "name": "配置",
                "menuCode": "sc_in_b_set",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 158,
                "updateTime": "2021-12-21 16:22:41",
                "createTime": "2021-12-21 16:22:41"
              },
              {
                "id": 179,
                "parentId": 123,
                "name": "修改价格",
                "menuCode": "sc_in_b_change",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 159,
                "updateTime": "2021-12-21 16:23:06",
                "createTime": "2021-12-21 16:23:06"
              },
              {
                "id": 180,
                "parentId": 123,
                "name": "删除",
                "menuCode": "sc_in_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 160,
                "updateTime": "2021-12-21 16:23:20",
                "createTime": "2021-12-21 16:23:20"
              }
            ]
          },
          {
            "id": 126,
            "parentId": 118,
            "name": "镜像配置",
            "menuCode": "sc_mr",
            "url": "/sourceConfig/mirror",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 106,
            "updateTime": "2021-12-16 17:49:34",
            "createTime": "2021-12-16 17:49:34",
            "children": [
              {
                "id": 129,
                "parentId": 126,
                "name": "上架区域",
                "menuCode": "sc_mr_p_region",
                "url": "/configMirrorRegion",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 107,
                "updateTime": "2021-12-16 17:51:55",
                "createTime": "2021-12-16 17:51:55",
                "children": [
                  {
                    "id": 187,
                    "parentId": 129,
                    "name": "添加绑定区域",
                    "menuCode": "sc_mr_p_region_b_add",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 167,
                    "updateTime": "2021-12-21 16:36:55",
                    "createTime": "2021-12-21 16:36:55"
                  },
                  {
                    "id": 188,
                    "parentId": 129,
                    "name": "编辑",
                    "menuCode": "sc_mr_p_region_b_edit",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 168,
                    "updateTime": "2021-12-21 16:37:06",
                    "createTime": "2021-12-21 16:37:06"
                  },
                  {
                    "id": 189,
                    "parentId": 129,
                    "name": "上下架",
                    "menuCode": "sc_mr_p_region_b_push",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 169,
                    "updateTime": "2021-12-21 16:37:18",
                    "createTime": "2021-12-21 16:37:18"
                  },
                  {
                    "id": 190,
                    "parentId": 129,
                    "name": "删除",
                    "menuCode": "sc_mr_p_region_b_delete",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 170,
                    "updateTime": "2021-12-21 16:37:29",
                    "createTime": "2021-12-21 16:37:29"
                  }
                ]
              },
              {
                "id": 127,
                "parentId": 126,
                "name": "创建镜像配置",
                "menuCode": "sc_mr_p_create",
                "url": "/sourceConfig/createMirror",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 108,
                "updateTime": "2021-12-16 17:50:08",
                "createTime": "2021-12-16 17:50:08"
              },
              {
                "id": 128,
                "parentId": 126,
                "name": "镜像详情",
                "menuCode": "sc_mr_p_detail",
                "url": "/sourceConfig/mirrorDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 109,
                "updateTime": "2021-12-16 17:50:52",
                "createTime": "2021-12-16 17:50:52"
              },
              {
                "id": 184,
                "parentId": 126,
                "name": "创建镜像",
                "menuCode": "sc_mr_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 164,
                "updateTime": "2021-12-21 16:30:38",
                "createTime": "2021-12-21 16:30:38"
              },
              {
                "id": 185,
                "parentId": 126,
                "name": "配置",
                "menuCode": "sc_mr_b_set",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 165,
                "updateTime": "2021-12-21 16:30:51",
                "createTime": "2021-12-21 16:30:51"
              },
              {
                "id": 186,
                "parentId": 126,
                "name": "删除",
                "menuCode": "sc_mr_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 166,
                "updateTime": "2021-12-21 16:31:04",
                "createTime": "2021-12-21 16:31:04"
              }
            ]
          },
          {
            "id": 130,
            "parentId": 118,
            "name": "公网价格配置",
            "menuCode": "sc_nw",
            "url": "/sourceConfig/network",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 110,
            "updateTime": "2021-12-16 17:53:03",
            "createTime": "2021-12-16 17:53:03"
          },
          {
            "id": 131,
            "parentId": 118,
            "name": "带宽配置",
            "menuCode": "sc_bw",
            "url": "/sourceConfig/bandwidth",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 111,
            "updateTime": "2021-12-16 17:53:41",
            "createTime": "2021-12-16 17:53:41",
            "children": [
              {
                "id": 132,
                "parentId": 131,
                "name": "创建带宽配置",
                "menuCode": "sc_bw_p_create",
                "url": "/sourceConfig/createBandwidthConfig",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 112,
                "updateTime": "2021-12-16 17:54:10",
                "createTime": "2021-12-16 17:54:10"
              },
              {
                "id": 133,
                "parentId": 131,
                "name": "带宽详情",
                "menuCode": "sc_bw_p_detail",
                "url": "/sourceConfig/bandwidthDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 113,
                "updateTime": "2021-12-16 17:55:05",
                "createTime": "2021-12-16 17:55:05"
              },
              {
                "id": 191,
                "parentId": 131,
                "name": "创建带宽",
                "menuCode": "sc_bw_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 171,
                "updateTime": "2021-12-21 16:53:34",
                "createTime": "2021-12-21 16:53:34"
              },
              {
                "id": 192,
                "parentId": 131,
                "name": "管理",
                "menuCode": "sc_bw_b_set",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 172,
                "updateTime": "2021-12-21 16:56:11",
                "createTime": "2021-12-21 16:56:11"
              },
              {
                "id": 193,
                "parentId": 131,
                "name": "修改价格",
                "menuCode": "sc_bw_b_change",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 173,
                "updateTime": "2021-12-21 16:56:27",
                "createTime": "2021-12-21 16:56:27"
              },
              {
                "id": 194,
                "parentId": 131,
                "name": "删除",
                "menuCode": "sc_bw_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 174,
                "updateTime": "2021-12-21 16:56:43",
                "createTime": "2021-12-21 16:56:43"
              }
            ]
          },
          {
            "id": 134,
            "parentId": 118,
            "name": "共享磁盘配置",
            "menuCode": "sc_sv",
            "url": "/sourceConfig/shareVolume",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 114,
            "updateTime": "2021-12-16 17:55:46",
            "createTime": "2021-12-16 17:55:46"
          },
          {
            "id": 135,
            "parentId": 118,
            "name": "安全组模板配置",
            "menuCode": "sc_sg",
            "url": "/sourceConfig/securityGroup",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 115,
            "updateTime": "2022-01-14 14:00:39",
            "createTime": "2021-12-16 17:56:15",
            "children": [
              {
                "id": 136,
                "parentId": 135,
                "name": "安全组模板详情",
                "menuCode": "sc_sg_p_detail",
                "url": "/sourceConfig/SecurityGroupDetail",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 116,
                "updateTime": "2021-12-16 17:56:59",
                "createTime": "2021-12-16 17:56:59",
                "children": [
                  {
                    "id": 199,
                    "parentId": 136,
                    "name": "添加规则",
                    "menuCode": "sc_sg_p_detail_b_add",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 179,
                    "updateTime": "2021-12-21 17:19:02",
                    "createTime": "2021-12-21 17:19:02"
                  },
                  {
                    "id": 200,
                    "parentId": 136,
                    "name": "修改",
                    "menuCode": "sc_sg_p_detail_b_edit",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 180,
                    "updateTime": "2021-12-21 17:19:16",
                    "createTime": "2021-12-21 17:19:16"
                  },
                  {
                    "id": 201,
                    "parentId": 136,
                    "name": "删除",
                    "menuCode": "sc_sg_p_detail_b_delete",
                    "kind": 2,
                    "status": 1,
                    "memo": "",
                    "sort": 181,
                    "updateTime": "2021-12-21 17:19:27",
                    "createTime": "2021-12-21 17:19:27"
                  }
                ]
              },
              {
                "id": 137,
                "parentId": 135,
                "name": "创建安全组模版配置",
                "menuCode": "sc_sg_p_create",
                "url": "/sourceConfig/createSecurityGroup",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 117,
                "updateTime": "2021-12-16 17:57:55",
                "createTime": "2021-12-16 17:57:55"
              },
              {
                "id": 195,
                "parentId": 135,
                "name": "创建安全组",
                "menuCode": "sc_sg_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 175,
                "updateTime": "2021-12-21 17:17:37",
                "createTime": "2021-12-21 17:17:37"
              },
              {
                "id": 196,
                "parentId": 135,
                "name": "设为默认",
                "menuCode": "sc_sg_b_set",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 176,
                "updateTime": "2021-12-21 17:17:59",
                "createTime": "2021-12-21 17:17:59"
              },
              {
                "id": 197,
                "parentId": 135,
                "name": "编辑",
                "menuCode": "sc_sg_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 177,
                "updateTime": "2021-12-21 17:18:14",
                "createTime": "2021-12-21 17:18:14"
              },
              {
                "id": 198,
                "parentId": 135,
                "name": "删除",
                "menuCode": "sc_sg_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 178,
                "updateTime": "2021-12-21 17:18:27",
                "createTime": "2021-12-21 17:18:27"
              }
            ]
          },
          {
            "id": 236,
            "parentId": 118,
            "name": "GPU规格配置",
            "menuCode": "sc_gpu",
            "url": "/sourceConfig/gpuSpecs",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 118,
            "updateTime": "2022-01-14 11:27:10",
            "createTime": "2022-01-14 11:27:10"
          },
          {
            "id": 138,
            "parentId": 118,
            "name": "默认全局配置",
            "menuCode": "sc_default",
            "url": "/sourceConfig/default",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 205,
            "updateTime": "2021-12-16 17:58:33",
            "createTime": "2021-12-16 17:58:33"
          }
        ]
      },
      {
        "id": 99,
        "parentId": 0,
        "name": "工单管理",
        "menuCode": "worder",
        "url": "/workOrder",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 81,
        "updateTime": "2021-12-16 17:22:23",
        "createTime": "2021-12-16 17:22:23",
        "children": [
          {
            "id": 100,
            "parentId": 99,
            "name": "工单详情",
            "menuCode": "worder_p_detail",
            "url": "/workOrderDetail",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 80,
            "updateTime": "2021-12-16 17:23:18",
            "createTime": "2021-12-16 17:23:18"
          },
          {
            "id": 202,
            "parentId": 99,
            "name": "完结",
            "menuCode": "worder_b_done",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 182,
            "updateTime": "2021-12-21 17:24:16",
            "createTime": "2021-12-21 17:24:16"
          },
          {
            "id": 203,
            "parentId": 99,
            "name": "回复",
            "menuCode": "worder_b_back",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 183,
            "updateTime": "2021-12-21 17:24:38",
            "createTime": "2021-12-21 17:24:38"
          }
        ]
      },
      {
        "id": 96,
        "parentId": 0,
        "name": "订单管理",
        "menuCode": "order",
        "url": "/order",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 98,
        "updateTime": "2021-12-16 17:19:17",
        "createTime": "2021-12-16 17:19:17",
        "children": [
          {
            "id": 97,
            "parentId": 96,
            "name": "订单详情",
            "menuCode": "order_p_detail",
            "url": "/orderDetail",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 77,
            "updateTime": "2021-12-16 17:20:21",
            "createTime": "2021-12-16 17:20:21"
          },
          {
            "id": 98,
            "parentId": 96,
            "name": "退款详情",
            "menuCode": "order_p_refundetail",
            "url": "/refundOrderDetail",
            "kind": 3,
            "status": 1,
            "memo": "",
            "sort": 78,
            "updateTime": "2021-12-16 17:21:04",
            "createTime": "2021-12-16 17:21:04"
          },
          {
            "id": 204,
            "parentId": 96,
            "name": "查看",
            "menuCode": "order_b_see",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 184,
            "updateTime": "2021-12-21 17:38:48",
            "createTime": "2021-12-21 17:38:48"
          },
          {
            "id": 205,
            "parentId": 96,
            "name": "关闭订单",
            "menuCode": "order_b_close",
            "kind": 2,
            "status": 1,
            "memo": "",
            "sort": 185,
            "updateTime": "2021-12-21 17:39:04",
            "createTime": "2021-12-21 17:39:04"
          }
        ]
      },
      {
        "id": 139,
        "parentId": 0,
        "name": "预警管理",
        "menuCode": "wm",
        "url": "/warningManage",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 119,
        "updateTime": "2021-12-20 11:23:47",
        "createTime": "2021-12-20 11:23:47",
        "children": [
          {
            "id": 140,
            "parentId": 139,
            "name": "历史预警",
            "menuCode": "wm_list",
            "url": "/warningManage/list",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 120,
            "updateTime": "2021-12-20 11:24:19",
            "createTime": "2021-12-20 11:24:19",
            "children": [
              {
                "id": 215,
                "parentId": 140,
                "name": "已恢复",
                "menuCode": "wm_list_b_ok",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 195,
                "updateTime": "2021-12-21 17:51:21",
                "createTime": "2021-12-21 17:51:21"
              }
            ]
          },
          {
            "id": 141,
            "parentId": 139,
            "name": "预警策略",
            "menuCode": "wm_rules",
            "url": "/warningManage/rules",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 121,
            "updateTime": "2021-12-20 11:24:52",
            "createTime": "2021-12-20 11:24:52",
            "children": [
              {
                "id": 144,
                "parentId": 141,
                "name": "创建和编辑策略",
                "menuCode": "wm_rules_p_create",
                "url": "/warningManage/createRules",
                "kind": 3,
                "status": 1,
                "memo": "",
                "sort": 124,
                "updateTime": "2021-12-20 11:26:29",
                "createTime": "2021-12-20 11:26:29"
              },
              {
                "id": 213,
                "parentId": 141,
                "name": "删除",
                "menuCode": "wm_rules_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 193,
                "updateTime": "2021-12-21 17:45:44",
                "createTime": "2021-12-21 17:45:44"
              },
              {
                "id": 214,
                "parentId": 141,
                "name": "创建策略",
                "menuCode": "wm_rules_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 194,
                "updateTime": "2021-12-21 17:45:55",
                "createTime": "2021-12-21 17:45:55"
              }
            ]
          },
          {
            "id": 142,
            "parentId": 139,
            "name": "通知组",
            "menuCode": "wm_ngroup",
            "url": "/warningManage/noticeGroup",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 122,
            "updateTime": "2021-12-20 11:25:18",
            "createTime": "2021-12-20 11:25:18",
            "children": [
              {
                "id": 209,
                "parentId": 142,
                "name": "添加组",
                "menuCode": "wm_ngroup_b_add",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 189,
                "updateTime": "2021-12-21 17:43:13",
                "createTime": "2021-12-21 17:43:13"
              },
              {
                "id": 210,
                "parentId": 142,
                "name": "修改",
                "menuCode": "wm_ngroup_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 190,
                "updateTime": "2021-12-21 17:44:50",
                "createTime": "2021-12-21 17:43:23"
              },
              {
                "id": 211,
                "parentId": 142,
                "name": "删除",
                "menuCode": "wm_ngroup_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 191,
                "updateTime": "2021-12-21 17:43:35",
                "createTime": "2021-12-21 17:43:35"
              }
            ]
          },
          {
            "id": 143,
            "parentId": 139,
            "name": "通知对象",
            "menuCode": "wm_nItem",
            "url": "/warningManage/noticeItem",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 123,
            "updateTime": "2021-12-20 11:25:39",
            "createTime": "2021-12-20 11:25:39",
            "children": [
              {
                "id": 206,
                "parentId": 143,
                "name": "添加对象",
                "menuCode": "wm_nItem_b_add",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 186,
                "updateTime": "2021-12-21 17:41:52",
                "createTime": "2021-12-21 17:41:52"
              },
              {
                "id": 207,
                "parentId": 143,
                "name": "修改",
                "menuCode": "wm_nItem_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 187,
                "updateTime": "2021-12-21 17:42:03",
                "createTime": "2021-12-21 17:42:03"
              },
              {
                "id": 208,
                "parentId": 143,
                "name": "删除",
                "menuCode": "wm_nItem_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 188,
                "updateTime": "2021-12-21 17:42:14",
                "createTime": "2021-12-21 17:42:14"
              }
            ]
          }
        ]
      },
      {
        "id": 70,
        "parentId": 0,
        "name": "系统管理",
        "menuCode": "sys",
        "url": "/systemManage",
        "kind": 1,
        "status": 1,
        "memo": "",
        "sort": 198,
        "updateTime": "2021-12-16 14:47:46",
        "createTime": "2021-12-16 14:46:39",
        "children": [
          {
            "id": 72,
            "parentId": 70,
            "name": "管理员列表",
            "menuCode": "sys_manager",
            "url": "/systemManage/manager",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 52,
            "updateTime": "2021-12-16 14:48:46",
            "createTime": "2021-12-16 14:48:46",
            "children": [
              {
                "id": 73,
                "parentId": 72,
                "name": "新增管理员",
                "menuCode": "sys_manager_b_add",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 53,
                "updateTime": "2021-12-16 14:54:53",
                "createTime": "2021-12-16 14:49:43"
              },
              {
                "id": 74,
                "parentId": 72,
                "name": "修改",
                "menuCode": "sys_manager_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 54,
                "updateTime": "2021-12-16 14:55:00",
                "createTime": "2021-12-16 14:50:02"
              },
              {
                "id": 75,
                "parentId": 72,
                "name": "禁用",
                "menuCode": "sys_manager_b_disable",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 55,
                "updateTime": "2021-12-16 14:50:15",
                "createTime": "2021-12-16 14:50:15"
              },
              {
                "id": 76,
                "parentId": 72,
                "name": "更多",
                "menuCode": "sys_manager_b_more",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 56,
                "updateTime": "2021-12-16 14:55:40",
                "createTime": "2021-12-16 14:55:40"
              },
              {
                "id": 77,
                "parentId": 72,
                "name": "重置密码",
                "menuCode": "sys_manager_b_reset",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 57,
                "updateTime": "2021-12-16 14:55:59",
                "createTime": "2021-12-16 14:55:59"
              },
              {
                "id": 78,
                "parentId": 72,
                "name": "删除",
                "menuCode": "sys_manager_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 58,
                "updateTime": "2021-12-16 14:56:14",
                "createTime": "2021-12-16 14:56:14"
              }
            ]
          },
          {
            "id": 79,
            "parentId": 70,
            "name": "角色管理",
            "menuCode": "sys_role",
            "url": "/systemManage/permission",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 59,
            "updateTime": "2021-12-16 14:57:11",
            "createTime": "2021-12-16 14:57:11",
            "children": [
              {
                "id": 80,
                "parentId": 79,
                "name": "添加角色",
                "menuCode": "sys_role_b_add",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 60,
                "updateTime": "2021-12-16 14:57:41",
                "createTime": "2021-12-16 14:57:41"
              },
              {
                "id": 81,
                "parentId": 79,
                "name": "修改",
                "menuCode": "sys_role_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 61,
                "updateTime": "2021-12-16 15:01:14",
                "createTime": "2021-12-16 15:01:14"
              },
              {
                "id": 82,
                "parentId": 79,
                "name": "删除",
                "menuCode": "sys_role_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 62,
                "updateTime": "2021-12-16 15:01:24",
                "createTime": "2021-12-16 15:01:24"
              }
            ]
          },
          {
            "id": 89,
            "parentId": 70,
            "name": "菜单管理",
            "menuCode": "sys_menu",
            "url": "/systemManage/menu",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 63,
            "updateTime": "2021-12-16 15:04:16",
            "createTime": "2021-12-16 15:04:16",
            "children": [
              {
                "id": 90,
                "parentId": 89,
                "name": "创建菜单",
                "menuCode": "sys_menu_b_create",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 70,
                "updateTime": "2021-12-16 15:04:55",
                "createTime": "2021-12-16 15:04:55"
              },
              {
                "id": 91,
                "parentId": 89,
                "name": "修改",
                "menuCode": "sys_menu_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 71,
                "updateTime": "2021-12-16 15:05:07",
                "createTime": "2021-12-16 15:05:07"
              },
              {
                "id": 92,
                "parentId": 89,
                "name": "删除",
                "menuCode": "sys_menu_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 72,
                "updateTime": "2021-12-16 15:05:21",
                "createTime": "2021-12-16 15:05:21"
              }
            ]
          },
          {
            "id": 83,
            "parentId": 70,
            "name": "权限管理",
            "menuCode": "sys_api",
            "url": "/systemManage/api",
            "kind": 1,
            "status": 1,
            "memo": "",
            "sort": 69,
            "updateTime": "2021-12-16 15:04:33",
            "createTime": "2021-12-16 15:01:58",
            "children": [
              {
                "id": 84,
                "parentId": 83,
                "name": "添加分组",
                "menuCode": "sys_api_b_addgroup",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 64,
                "updateTime": "2021-12-16 15:02:30",
                "createTime": "2021-12-16 15:02:30"
              },
              {
                "id": 85,
                "parentId": 83,
                "name": "添加权限",
                "menuCode": "sys_api_b_addapi",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 65,
                "updateTime": "2021-12-16 15:02:50",
                "createTime": "2021-12-16 15:02:50"
              },
              {
                "id": 86,
                "parentId": 83,
                "name": "修改",
                "menuCode": "sys_api_b_edit",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 66,
                "updateTime": "2021-12-16 15:03:03",
                "createTime": "2021-12-16 15:03:03"
              },
              {
                "id": 87,
                "parentId": 83,
                "name": "删除",
                "menuCode": "sys_api_b_delete",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 67,
                "updateTime": "2021-12-16 15:03:14",
                "createTime": "2021-12-16 15:03:14"
              },
              {
                "id": 88,
                "parentId": 83,
                "name": "移动",
                "menuCode": "sys_api_b_move",
                "kind": 2,
                "status": 1,
                "memo": "",
                "sort": 68,
                "updateTime": "2021-12-16 15:03:45",
                "createTime": "2021-12-16 15:03:45"
              }
            ]
          }
        ]
      }
    ]
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
      console.log(index)
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
