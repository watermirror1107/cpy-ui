<template>
  <div id="app">
    <c-btn-group>
      <c-button class="3dawddw" disabled>开机</c-button>
      <c-button>关机</c-button>
      <c-button>重启</c-button>
      <c-button>测试</c-button>
      <c-button>测试</c-button>
    </c-btn-group>
    <c-select
      v-model="selectVal"
      :selectOptions="selectOptions"
      style="width: 300px"
    ></c-select> 
    <c-page :total="100"></c-page>
    <!--    <c-banner title="title"></c-banner>-->
       <c-banner>123</c-banner>
    <!--    <c-banner>-->
    <!--      <p-->
    <!--          v-if="true"-->
    <!--          style="font-size: 16px;margin-left: 10px;">-->
    <!--        123-->
    <!--        <span style="color: #969696;">({{ 456}})</span>-->
    <!--      </p>-->
    <!--    </c-banner>-->  
       <c-button type="text">CTMD</c-button>
       <c-button type="text" disabled>CTMD</c-button>
    <!--    <c-button type="text" ghost>CTMD</c-button>-->
    <!--    <c-button type="text" ghost disabled>CTMD</c-button>-->
    <!--    <c-icon name="icon-shijian"></c-icon>-->
           <c-card  title="click" @more="clickMore">
             <template #more>
               <p style="font-size: 20px;">more</p>
             </template>
             content
           </c-card>
    <!--        <c-card-item :data="{title:'h1',value:'vlaue'}"></c-card-item>-->
    <!--    <div style="width: 100px;margin-top: 100px;margin-left: 200px;">-->
    <!--      <c-ellipsis text="test test test test test test test test test test test test test test"></c-ellipsis>-->
         <c-editable-cell isDisabled emptyPlaceholder="emptyPlaceholder"></c-editable-cell>
    <!--    </div>-->
    <!--  <c-input label="asdf"  v-model="text"></c-input>-->
    <!--    <c-empty></c-empty>-->
    <c-input-number v-model="num" unit="MBBB" size="small"></c-input-number>
        <c-radio-group v-model="num">
          <c-radio value="one">one</c-radio>
          <c-radio value="two">two</c-radio>
        </c-radio-group>
    <!--    <c-nav-header>-->
    <!--      <template #left>left</template>-->
    <!--      <template #right>righ</template>-->
    <!--    </c-nav-header>-->
           <c-range-picker v-model="time" :currentType="2"></c-range-picker>
    <!--        <c-table-form-->
    <!--            v-model="formData"-->
    <!--            :formOptions="formOptions"-->
    <!--            @submit="handleSubmit"-->
    <!--        ></c-table-form>-->
       <c-duration v-model="month"></c-duration>
       <c-duration type="2" v-model="month"></c-duration>
           <c-tabs
               :tabs="imageTypes"
               v-model="tabIndex"></c-tabs>
           <c-tap
               :list="typeList"
               v-model="tabIndex"
               @select-item="changeType"
           ></c-tap>
           <c-form
               ref="form"
               :formOptions="formOptions1"
               v-model="form"
           >
             <template #account>
               <c-input
                  
                   label="account"
                   v-model="form.account">
               </c-input>
             </template>
           </c-form>
    <!--    <button @click="changeType(2)">test debounce</button>-->
       <c-search-select :queryPromise="queryOptions"
                        placeholder="测试一下"
                        v-model="tabIndex"
                        style="width:320px;margin: 0 auto;"
       >
         <p slot='extraContent' style="text-align:center;" @click="clickHandler(1)">extraContent</p>
       </c-search-select>
    <!--    <c-search-select :queryPromise="queryOptions"-->
    <!--                     mode="multiple"-->
    <!--                     :extraParams="{date:'2012'}"-->
    <!--                     placeholder="测试一下"-->
    <!--                     v-model="tabIndex2"-->
    <!--                     style="width:320px;margin: 0 auto;">-->
    <!--    </c-search-select>-->
    <div style="display:flex">
      <c-table-filter/>
      <c-table-filter mode="tree"/>
    </div>
    <c-table
        :formData="formData"
        :formOptions="formOptions"
        selectedRowText="总共%t%个，选中%s%个"
        ref="table"
        :loopTime="10000"
        :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
        :tagFilterArr="['queryName', 'date']"
        :columns="columns"
        :data="queryList"
        rowKey="id"
    >
      <template #headerRight>

      </template>
      <template #id="{ text, record }">
        <a-popover>
          <template #content>
            <c-table :columns="columns" :dataSource="record.children"></c-table>
          </template>
          <span style="color: red">{{ text }}</span>
        </a-popover>
      </template>
      <template #operate="{ record, index }">
        <c-btn-wrap :showNum="5">
          <c-table-btn
              :disabled="isClick"
              text="click1"
              @click="clickHandler1"
          ></c-table-btn>
          <c-table-btn text="click2" @click="clickHandler2"></c-table-btn>
          <c-table-btn text="click3" @click="clickHandler3"></c-table-btn>
          <c-table-btn text="click4" @click="clickHandler4"></c-table-btn>
          <c-table-btn text="click5" @click="clickHandler5"></c-table-btn>
          <c-table-btn text="click6" @click="clickHandler6"></c-table-btn>
          <c-table-btn text="click7" @click="clickHandler7"></c-table-btn>
          <c-table-btn type="danger" text="click8" @click="clickHandler8"></c-table-btn>
          <c-table-btn type="danger" disabled text="click8" @click="clickHandler8"></c-table-btn>
          <c-table-btn disabled text="click9" @click="clickHandler9"></c-table-btn>
          <c-table-btn text="click10" @click="clickHandler10(index)"></c-table-btn>
        </c-btn-wrap>
      </template>
      <template #actionBar>
        <c-btn-group>
          <c-button type="primary" size="small">添加</c-button>
          <c-button icon="icon-kaiji" :size="'large'">1234</c-button>
          <c-button type="warning" icon="icon-kaiji"> 123</c-button>
          <c-button type="warning" icon="icon-kaiji"> 123</c-button>
          <c-button type="warning" disabled="" icon="icon-kaiji"> 123</c-button>
          <c-button type="warning" ghost icon="icon-kaiji"> 123</c-button>
          <c-button type="warning" disabled ghost icon="icon-kaiji"> 123</c-button>
          <c-button type="success" icon="icon-kaiji"> 123</c-button>
          <c-button type="success" disabled icon="icon-kaiji"> 123</c-button>
          <c-button type="success" ghost icon="icon-kaiji"> 123</c-button>
          <c-button type="success" disabled ghost icon="icon-kaiji"> 123</c-button>
          <c-button icon="icon-kaiji" type="danger"> 123</c-button>
          <c-button icon="icon-kaiji" type="danger" disabled=""> 123</c-button>
          <c-button icon="icon-kaiji" type="danger" ghost> 123</c-button>
          <c-button icon="icon-kaiji" type="danger" disabled ghost> 123</c-button>
        </c-btn-group>
      </template>
    </c-table>
    <!-- <c-collapse :activeKey="['c']">
        <c-collapse-panel :key="'a'">
          <p name="header">title1</p>
        </c-collapse-panel>
        <c-collapse-panel :key="'b'" header="title2">2</c-collapse-panel>
        <c-collapse-panel :key="'c'" :disabled="true" header="title3"
          >3</c-collapse-panel
        >
        <c-collapse-panel :key="'d'">
          <template #header>giao</template>
          <template #extra>extra</template>
          <p>giao1</p>
          <p>giao2</p>
        </c-collapse-panel>
      </c-collapse> -->

    <!-- <a-collapse :activeKey="['b']">
      <a-collapse-panel key="a" header="This is panel header 1">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel
        key="b"
        header="This is panel header 2"
        :disabled="false"
      >
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="c" header="This is panel header 3" disabled>
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse> -->
  </div>
</template>

<script>
import {debounce} from "@/utils";
import axios from "axios";
// import CButton from "../packages/CButton";
// import CTable from "../packages/CTable";
// import CBtnWrap from "../packages/CBtnWrap";
// import CBtnGroup from "../packages/CBtnGroup";
// import CTableBtn from "../packages/CTableBtn";
// import CSearchSelect from "../packages/CSearchSelect";
// import CTap from "../packages/CTap";
// import CRangePicker from "../packages/CRangePicker";
// import CTabs from "../packages/CTabs";
// import CTableForm from "../packages/CTableForm";
// import CCard from "../packages/CCard";
// import CCollapse from "../packages/CCollapse";
// import CCollapsePanel from "../packages/CCollapsePanel";
// import CTagList from "../packages/CTagList";
// import CIcon from "../packages/CIcon";
// import CInputNumber from "../packages/CInputNumber";
// import CSelect from "../packages/CSelect";

export default {
  components: {
    // CButton,
    // CIcon,
    // CTable,
    // CBtnWrap,
    // CTableBtn,
    // CSearchSelect,
    // CTap,
    // CRangePicker,
    // CTabs,
    // CTableForm,
    // CCard,
    // CCollapse,
    // CCollapsePanel,
    // CTagList,
    // CInputNumber,
    // CBtnGroup,
    // CSelect,
    // [Collapse.name]: Collapse,
    // [Collapse.Panel.name]: Collapse.Panel,
  },
  data() {
    return {
      activeKey: ["1"],
      number: "",
      isClick: false,
      selectVal: 1,
      selectOptions: [
        {
          val: 1, //
          text: "1个月",
          preIcon: "icon-win_blue",
          hotText: "9折",
        },
      ],
      dataSource: [
        {
          id: 1,
          name: "name",
          content: "content",
          createTime: "2012-12-12",
          children: [
            {
              id: 2,
              name: "name",
              content: "content",
              createTime: "2012-12-12",
            },
          ],
        },
        {
          id: 3,
          name: "name",
          content: "content",
          createTime: "2012-12-12",
          children: [],
        },
      ],
      selectedRowKeys: [], // 勾选的key
      selectedRows: [], // 选中的行数据
      formOptions1: [{key: "account",disabled:true}, {key: "age"}, {key: "name"}],
      form: {
        account: "kong11111111",
        age: 1,
        name: "jason",
      },
      typeList: [
        {
          id: "",
          title: "Allorders",
          type: "totalCount",
          color: "#323232",
          num: 0,
        },
        {
          id: "BillWaitingCharge",
          title: "Pendingorder",
          type: "waitPayCount",
          color: "#FDBE2E",
          num: 0,
        },
        {
          id: "BillPayOrOver",
          title: "Completedorder",
          type: "payedCount",
          color: "#4ED067",
          num: 0,
        },
        {
          id: "BillInvalid",
          title: "Cancelledorder",
          type: "expiredCount",
          color: "#1279F8",
          num: 0,
        },
        {
          id: "BillRefund",
          title: "Refundrecord",
          type: "refundCount",
          color: "#F7665E",
          num: 0,
        },
      ],
      tabIndex: undefined,
      tabIndex2: [],
      imageTypes: [{name: "one"}, {name: "two"}],
      month: 1,
      time: [],
      formData: {
        queryName: "",
        id: 1,
        createTime: [111],
        date: [],
      },
      formOptions: [
        {
          key: "queryName",
          type: "input",
          placeholder: "placeholder",
        },
        {
          key: "name",
          placeholder: "placeholder",
          options: [
            {id: 1, name: "one"},
            {id: 2, name: "two"},
          ],
        },
        {
          key: "createTime",
          // type: 'select',
          placeholder: "placeholder",
          options: [
            {id: 1, name: "one"},
            {id: 2, name: "two"},
          ],
        },
        {
          key: "date",
          type: "range-picker",
          placeholder: ["开始日期1", "结束日期2"],
          mode: ["date", "date"],
          format: "YYYY-MM-DD",
        },
      ],
      num: "111",
      type: 1,
      text: "text",
      dateOptions: [
        {id: 1, name: "10-20"},
        {id: 2, name: "30-40"},
      ],
      dataFilterValue: "",
      // columns: [
      //   {
      //     title: "id",
      //     dataIndex: "id",
      //     key: "id",
      //     fixed: "left",
      //     scopedSlots: { customRender: "id" },
      //     width: 100,
      //   },
      //   {
      //     title: "name",
      //     dataIndex: "name",
      //     key: "name",
      //     width: 100,
      //     type: "selectMultiple",
      //     scopedSlots: {
      //       filterDropdown: "filterDropdown",
      //       filterIcon: "filterIcon",
      //     },
      //     filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
      //     onFilterDropdownVisibleChange: (visible) => {
      //       if (visible) {
      //         this.filterOptions = this.formOptions.find(
      //           (i) => i.key === "name"
      //         ).options;
      //       }
      //     },
      //   },
      //   {
      //     title: "content",
      //     dataIndex: "content",
      //     key: "content",
      //     width: 100,
      //   },
      //   {
      //     title: "createTime",
      //     dataIndex: "createTime",
      //     key: "createTime",
      //     width: 140,
      //     scopedSlots: {
      //       filterDropdown: "filterDropdown",
      //       filterIcon: "filterIcon",
      //     },
      //     filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
      //     onFilterDropdownVisibleChange: (visible) => {
      //       if (visible) {
      //         this.filterOptions = this.formOptions.find(
      //           (i) => i.key === "createTime"
      //         ).options;
      //       }
      //     },
      //   },
      //   {
      //     title: "operate",
      //     key: "operate",
      //     width: 300,
      //     scopedSlots: { customRender: "operate" },
      //   },
      // ],
    };
  },
  computed: {
    columns() {
      if (true) {
        return [
          {
            title: "id",
            dataIndex: "id",
            key: "id",
            fixed: "left",
            width: 100,
            type: "select",
            options: [{id: 1, name: 'name1'}, {id: 2, name: 'name2'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},{id: 1, name: 'name1'},],
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
              customRender: "id",
            },
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                
              }
            },
          },
          {
            title: "id2",
            dataIndex: "id2",
            key: "id2",
            fixed: "left",
            width: 100,
            type: "select",
            selectKeys:['type1','type2'],
            mode:'cascader',
            options:[{value:'',label:'全部'},{value:1,label:'name1',children:[{value:'',label:'全部'},{value:3,label:'name1-name3'}]},{value:2,label:'name2',children:[{value:'',label:'全部'},{value:4,label:'name2-name4'},{value:5,label:'name2-name5'}]}],
            scopedSlots: { 
              filterDropdown: "filterDropdown", 
              filterIcon: "filterIcon", 
              customRender: "id",
            },
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {

              }
            },
          },
          {
            title: "id2",
            dataIndex: "id2",
            key: "id2",
            width: 800,
            type: "select",
            selectKeys:['type1','type2'],
            mode:'cascader',
            options:[{value:'',label:'全部'},{value:1,label:'name1',children:[{value:'',label:'全部'},{value:3,label:'name1-name3'}]},{value:2,label:'name2',children:[{value:'',label:'全部'},{value:4,label:'name2-name4'},{value:5,label:'name2-name5'}]}],
            scopedSlots: { 
              filterDropdown: "filterDropdown", 
              filterIcon: "filterIcon", 
              customRender: "id",
            },
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {

              }
            },
          },
           {
            title: "id2",
            dataIndex: "id2",
            key: "id2",
            width: 300,
            type: "select",
            selectKeys:['type1','type2'],
            mode:'cascader',
            options:[{value:'',label:'全部'},{value:1,label:'name1',children:[{value:'',label:'全部'},{value:3,label:'name1-name3'}]},{value:2,label:'name2',children:[{value:'',label:'全部'},{value:4,label:'name2-name4'},{value:5,label:'name2-name5'}]}],
            scopedSlots: { 
              filterDropdown: "filterDropdown", 
              filterIcon: "filterIcon", 
              customRender: "id",
            },
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {

              }
            },
          },
          {
            title: "name",
            dataIndex: "name",
            key: "name", 
            width: 100,
            //只有第三级单选的的时候不需要前缀拼接ID  也不用selectKeyType
            // type: "select",
            // selectKey:'name',
            //多选
            type: "select",
            // type: "selectMultiple",
            selectKeys:['regionId','cityId','clusterId'],
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
            },
            filterOptionMethod: (val, key = "regionName", key2 = "cityName") => {
              let temp = [];
              //区域名称提取
              [...new Set(val.map(item => {
                return item[key]
              }))].forEach((item, index) => {
                let tempId = val.find(valitem=>{
                    return valitem.regionName == item
                  })
                temp.push({
                  name: item,
                  id: 'regionId-'+tempId.regionId,
                  selectKeyType:'regionId',
                  children: []  
                })
              })
              //区域名称下城市集合
              val.forEach(item => {
                temp.forEach(tempItem => {
                  if (item[key] == tempItem.name) {
                    tempItem.children.push({
                      name: item[key2],
                      id: 'cityId-'+item.cityId,
                      selectKeyType:'cityId',
                      children: [] 
                    });
                  }
                })
              })
              //城市下集群的集合
              val.forEach(item => {
                temp.forEach(tempItem => {
                  tempItem.children.forEach(childItem => {
                    if (childItem.name == item[key2]) {
                      childItem.children.push({
                        name: item.name,
                        id: 'clusterId-'+item.id,
                        selectKeyType:'clusterId'
                      })
                    }
                  })
                })
              })
              return temp;
            },
            options: [ {
              id: 112, 
              clusterId:112,
              name: '113',
              clusterName:'111',
              cityName: '厦门1',
              regionName: '华东',
              regionId:'r1',cityId:'1' 
            }, {id: 222,clusterId:222,clusterName:'111', name: '2222', cityName: '福州', regionName: '华西',regionId:'r2',cityId:'3'},{
              cityId: 1,
              cityName: "常州", 
              clusterId: 27,
              clusterName: "测试机房", 
              id: 27,
              name: "测试机房",
              regionId: 1,
              regionName: "华东",
            }],
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) { 
 
              }
            },
          },
          {
            title: "content",
            dataIndex: "content",
            key: "content",
            width: 200,
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
            },
            filterOptionMethod: (val, key = "regionName", key2 = "cityName") => {
              let temp = [];
              //区域名称提取
              [...new Set(val.map(item => {
                return item[key]
              }))].forEach((item, index) => {
                temp.push({
                  name: item,
                  id: item,
                  children: []
                })
              });
              //区域名称下城市集合
              val.forEach(item => {
                temp.forEach(tempItem => {
                  if (item[key] == tempItem.name) {
                    tempItem.children.push({
                      name: item[key2],
                      id: item[key2],
                      children: []
                    });
                  }
                })
              });
              //城市下集群的集合
              val.forEach(item => {
                temp.forEach(tempItem => {
                  tempItem.children.forEach(childItem => {
                    // debugger;
                    if (childItem.name == item[key2]) {
                      childItem.children.push({
                        name: item.name,
                        id: item.id
                      })
                    }
                  })
                })
              })
              // debugger
              return temp;
            },
            options: [{id: 111, name: '111', cityName: '厦门1', regionName: '华东'}, {
              id: 112,
              name: '113',
              cityName: '厦门2',
              regionName: '华东'
            }, {id: 222, name: '2222', cityName: '福州', regionName: '华西'}],
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {

              }
            },
          },
          {
            title: "createTime",
            dataIndex: "createTime",
            key: "createTime",
            width: 140,
            scopedSlots: {
              filterDropdown: "filterDropdown",
              filterIcon: "filterIcon",
            },
            type: "selectMultiple",
            options: [{id: 111, name: '111'}, {id: 222, name: '222'}],
            filteredValue: this.dataFilterValue ? [this.dataFilterValue] : null,
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {

              }
            },
          },
          {
            fixed:'right',
            title: "operate",
            key: "operate",
            width: 300,
            scopedSlots: {customRender: "operate"},
          },
        ];
      }
    },
  },
  watch: {
    tabIndex(nv) {
      console.log(nv);
    },
  },
  mounted() {
    // this.queryOptions()
    this.$refs.table.refresh();
  },
  methods: {
    addTest() {
      let x = this.$CModal({
        icon: "icon-a-shili_hong",
        title: "test",
        content: "content",
        // cancel: () => {
        //   console.log('closese')
        // },
        ok: () => {
          console.log("ok");
        },
        okText: "Ok",
      });
    },
    consoleRow() {
      console.log(this.selectedRows);
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    handleFilterChange(val, confirm) {
      confirm();
      this.$refs.table.refresh();
    },
    queryOptions() {
      return axios.get("/getoptions?ID=12345");
    },
    queryList(params) {
      // console.log(params);
      console.log('formData',this.formData)
      // const data = Object.assign({}, params, this.formData, result);
      return axios({ 
        url: "/getoptions",
        method: "get",
        params,
      });
    },
    changeType: debounce(function (i) {
      console.log(this.text);
      console.log(i);
    }),
    handleSubmit() {
      console.log(this.formData);
    },
    clickMore() {
      console.log("more");
    },
    clickHandler(text, record) {
      console.log(text);
      console.log(record);
    },
    clickHandler1() {
      this.isClick = true;
      setTimeout(() => {
        this.isClick = false;
      }, 3000);
      console.log(1);
    },
    clickHandler2() {
      console.log(2);
    },
    clickHandler3() {
      console.log(3);
    },
    clickHandler4() {
      console.log(4);
    },
    clickHandler5() {
      console.log(5);
    },
    clickHandler6() {
      console.log(6);
    },
    clickHandler7() {
      console.log(7);
    },
    clickHandler8() {
      console.log(8);
    },
    clickHandler9() {
      this.isClick = true;
      setTimeout(() => {
        this.isClick = false;
      }, 3000);
      console.log(9);
    },
    clickHandler10(index) {
      console.log(10);
    },
    consoleValue(value) {
      console.log(value);
    },
  },
};
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
