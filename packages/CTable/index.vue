<template>
  <div class="c_table">
    <div v-if="isShowHeader" class="c_table_header">
      <div class="c_table_header_left">
        <div class="c_table_action_bar">
          <slot name="actionBar"></slot>
        </div>
        <span v-if="$attrs.rowSelection&&$attrs.rowSelection.selectedRowKeys.length>0">
          {{this.showSelectedText}}
          </span>
      </div>
      <div class="c_table_header_right">
        <slot name="headerRight"></slot>
        <a-input
            :style="{ width: (typeof searchWith === 'string') ? searchWith : `${searchWith}px` }"
            class="c_table_header_right_searchInput"
            v-if="isShowSearch"
            v-model="formData.queryName"
            @change="debounceFresh($event.target.value, () => {}, 'queryName')"
            :placeholder="queryNamePlaceholder"
        >
          <icon slot="prefix" name="icon-shili_shousuo"/>
        </a-input>
        <c-button
            class="c_table_header_right_refresh"
            :disabled="isLocalLoading"
            type="text"
            @click="refresh"
        >
          <icon name="icon-chongzhi_shuaxin"></icon>
        </c-button>
        <c-button
            type="text"
            class="c_table_header_right_refresh"
            v-if="isSetColumn"
            @click="setColumns"
        >
          <icon name="icon-shili_shezhi"></icon>
        </c-button>
      </div>
    </div>
    <tag-list
        v-if="isShowTag"
        @close="refresh(true)"
        class="c_table_tags"
        v-model="formData"
        :formOptions="getFormOptions()"
        :tagFilterArr="tagFilterArr"
    ></tag-list>
    <a-table
        :class="
        'bordered' in property && !property.bordered ? 'c_table_noBorder' : ''
      "
        v-on="$listeners"
        :loading="isLocalLoading"
        v-bind="property"
        :columns="
        $attrs.columns.filter((column) => showColumns.includes(column.key))
      "
        :dataSource="localDataSource"
        :rowSelection="$attrs.rowSelection || null"
    >
      <template #filterIcon>
        <icon
            style="width: 14px; outline: unset; margin-left: 10px"
            name="icon-shili_saixuan"
        ></icon>
      </template>
      <template v-for="slot in slotArr" v-slot:[slot]="text, record, index">
        <slot :name="slot" :text="text" :record="record" :index="index"></slot>
      </template>
      <template
          v-if="isExpandedRowRender"
          v-slot:expandedRowRender="record, index, indent, expanded"
      >
        <slot
            name="expandedRowRender" 
            :record="record"
            :index="index"
            :indent="indent"
            :expanded="expanded"
        ></slot>
      </template>
      <template v-for="nativeTable in nativeTableSlotArr" v-slot:[nativeTable]>
        <slot :name="nativeTable"></slot>
      </template> 
      <!--      表头过滤-->
      <template v-slot:filterDropdown="{ confirm, column }">
        <template v-if="column.type === 'selectMultiple'">
          <template v-if="column.filterOptionMethod&&typeof column.filterOptionMethod =='function'">
            <!-- formData[column.selectKey || column.key] -->
            <c-table-filter @restFilter="resetFilter(column.selectKey || column.key,confirm)" :isMultiple="true"
                            mode="tree" :value="filterValue(formData,column)"
                            :options="column.filterOptionMethod(column.options)"
                            :column="column"
                            @confirm="(val,type)=>{debounceFresh(val, confirm,type || column.selectKey || column.key,column)}">
            </c-table-filter>
          </template>
          <template v-if="!column.filterOptionMethod">
            <c-table-filter @restFilter="resetFilter(column.selectKey || column.key,confirm)" :isMultiple="true"
                            :value="filterValue(formData,column)" :options="column.options"
                            :column="column"
                            @confirm="(val,type)=>{debounceFresh(val, confirm,type || column.selectKey || column.key,column)}"></c-table-filter>
          </template>
          <!-- slot="dropdownRender" slot-scope="menu" -->
        </template>
        <!-- <a-select
            v-if="column.type === 'selectMultiple'"
            show-search
            style="width: 180px"
            :defaultOpen="true"
            :open="true"
            :showArrow="false"
            mode="multiple"
            v-model="formData[column.selectKey || column.key]"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            :filter-option="filterOption"
            :placeholder="column.placeholder || $T('public.search')"
        >
          <template v-if="column.filterOptionMethod&&typeof column.filterOptionMethod =='function'">
            <template v-for="(item,index) in column.filterOptionMethod(column.options)">
              <a-select-opt-group v-if="item.name!=='all'" class="filterGroupItem" :key="index">
                <span slot="label">{{ item.name }}</span>
                <a-select-option
                    class="multipleOptions"
                    v-for="option in item.options"
                    :value="option.id"
                    :key="option.id"
                >
                  {{ option.name }}
                </a-select-option>
              </a-select-opt-group>
              <a-select-option v-else
                               class="multipleOptions"
                               v-for="option in item.options"
                               :value="option.id"
                               :key="option.id"
              >
                {{ option.name }}
              </a-select-option>
            </template>
          </template>
          <template v-if="!column.filterOptionMethod">
            <a-select-option
                class="multipleOptions"
                v-for="option in column.options"
                :value="option.id"
                :key="option.id"
            >
              {{ option.name }}
            </a-select-option>
          </template>

        </a-select> -->
        <template v-else>
          <template v-if="column.filterOptionMethod&&typeof column.filterOptionMethod =='function'">
            <c-table-filter @restFilter="resetFilter(column.selectKey || column.key,confirm)" mode="tree"
                            :value="filterValue(formData,column)"
                            :options="column.filterOptionMethod(column.options)"
                            :column="column"
                            @confirm="(val,type)=>{debounceFresh(val, confirm,type || column.selectKey || column.key,column)}">>
            </c-table-filter>
          </template>
          <template v-if="!column.filterOptionMethod">
            <c-table-filter @restFilter="resetFilter(column.selectKey || column.key,confirm)"
                            :mode="column.mode || 'normal'"
                            :value="filterValue(formData,column)" :options="column.options"
                            :column="column"
                            @confirm="(val,type)=>{debounceFresh(val, confirm,type || column.selectKey || column.key,column)}"></c-table-filter>
          </template> 
        </template>
        <!-- <a-select
            v-else
            style="width: 180px"
            :showArrow="false"
            allowClear
            autoFocus
            v-model="formData[column.selectKey || column.key]"
            :defaultOpen="true"
            :open="true"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            :filter-option="filterOption"
            :placeholder="column.placeholder || $T('public.search')"
            @change="debounceFresh($event, confirm, column.selectKey || column.key)"
        >
          <template v-if="column.filterOptionMethod&&typeof column.filterOptionMethod =='function'">
            <template v-for="(item,index) in column.filterOptionMethod(column.options)">
              <a-select-opt-group v-if="item.name!=='all'" class="filterGroupItem" :key="index">
                <span slot="label">{{ item.name }}</span>
                <a-select-option
                    v-for="option in item.options"
                    :value="option.id"
                    :key="option.id"
                >
                  {{ option.name }}
                </a-select-option>
              </a-select-opt-group>
              <a-select-option v-else
                               v-for="option in item.options"
                               :value="option.id"
                               :key="option.id"
              >
                {{ option.name }}
              </a-select-option>
            </template>
          </template>
          <template v-if="!column.filterOptionMethod">
            <a-select-option
                v-for="option in column.options"
                :value="option.id"
                :key="option.id"
            >
              {{ option.name }}
            </a-select-option>
          </template>
        </a-select> -->
      </template>
    </a-table>
    <div v-if="isShowPagination" class="c_table_pagination_box">
      <c-page
          v-bind="{
          ...this.localPagination,
          showSizeChanger: true,
          total: this.total,
        }"
          @change="paginationChange"
          @showSizeChange="onShowSizeChange" 
      ></c-page>
    </div>
    <modal
        :width="480"
        :okText="$T('instance.Confirm')"
        :cancelText="$T('instance.Cancel')"
        v-model="isVisible"
        :title="$T('public.setColumn')"
        :ok="confirmColumns"
    >
      <a-checkbox-group style="width: 100%" v-model="midColumns">
        <checkbox
            v-for="(item, index) in $attrs.columns"
            :key="index"
            class="column-checkbox"
            :value="item.key"
        >
          {{ item.title }}
        </checkbox>
      </a-checkbox-group>
    </modal>
  </div>
</template>
<script>
import {debounce} from "@/utils";
import Icon from "../CIcon";
import TagList from "../CTagList";
import Modal from "../CModal/index.vue";
import CButton from "../CButton";
import {Checkbox} from "ant-design-vue";
import CPage from "../CPage";
import CTableFilter from '../CTableFilter/index.vue';

export default {
  name: "CTable",
  inheritAttrs: false,
  components: {
    Icon,
    Checkbox,
    Modal,
    CButton,
    CPage,
    TagList,
    CTableFilter,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      showColumns: [],
      midColumns: [],
      isVisible: false,
      isExpandedRowRender: false,
      isLocalLoading: true,
      localDataSource: [],
      localPagination: {
        current: 1,
        pageNo: 1,
        pageSize: 10,
      },
      total: 0,
      slotArr: [],
      nativeTableSlotArr: [],
      property: {},
      form: {filterCondition: undefined},
    };
  },
  props: {
    searchWith: {type: [Number, String], default: 250},
    selectedRowText: {type: String, default: ""}, //选择后的提示信息
    queryNamePlaceholder: {type: String, default: "placeholder"}, //是否可以设置表头
    isShowHeader: {type: Boolean, default: true}, //是否显示表格搜索头部等按钮
    isShowTag: {type: Boolean, default: true}, //是否显示过滤条件
    isShowPagination: {type: Boolean, default: true}, //是否显示分页器
    isShowSearch: {type: Boolean, default: true}, //是否可以搜索
    isSetColumn: {type: Boolean, default: true}, //是否可以设置表头
    loopTime: {type: Number}, //轮询间隔,建议至少5秒以上
    data: {type: Function},
    formData: {
      type: Object,
      default: () => {
      },
    },
    tagFilterArr: {type: Array, default: () => ["queryName"]},
    dataSource: {type: Array, default: () => []},
    scroll: {default: () => ({x: 930}), type: Object},
  },
  watch: {
    dataSource(nv) {
      if (!this.data) {
        this.localDataSource = nv;
      }
    },
  },
  computed:{
    showSelectedText(){
      if(!this.selectedRowText)return `已选中${this.$attrs.rowSelection.selectedRowKeys.length}个`
      return this.selectedRowText.replace(/\%t\%/,this.localDataSource.length).replace(/\%s\%/,this.$attrs.rowSelection.selectedRowKeys.length)
    },
  },
  created() {
    // 读取当前用户设置的列，如果没有则取默认
    try {
      let userId = JSON.parse(localStorage.CPY_PORTAL_USERINFO).userId;
      this.showColumns = JSON.parse(localStorage.custormColumnObject)[userId][
          this?.$route?.path
          ].split(",");
    } catch (error) {
      this.showColumns = this.$attrs.columns.map((i) => i.key);
    }
  },
  beforeMount() {
    if (!this.$T) {
      this.$T = this.translateText;
    }
  },
  mounted() {
    if (window.tableTime) {
      clearTimeout(window.tableTime);
    }
    this.property = {
      ...this.$props,
      ...this.$attrs,
      pagination: false,
    };
    delete this.property?.rowSelection;
    delete this.property?.columns;
    if (this.data) {
      delete this.property?.dataSource;
    } else {
      this.localDataSource = this.dataSource;
      this.isLocalLoading = false;
    }
    this.slotArr = [
      ...Object.keys(this.$scopedSlots),
      ...Object.keys(this.$slots),
    ];
    // 这里去重下，不然自定义表头会出现2个
    this.slotArr = Array.from(new Set(this.slotArr)).filter(
        (item) =>
            item !== "filterDropdown" &&
            item !== "actionBar" &&
            item !== "headerRight"
    ); //过滤掉1个自定义actionBar和一个filterDropdown
    // 取出列数据里面的slots
    const columnsSlots = this.$attrs.columns.filter((el) => el.slots);
    const columnsSlotsValues = columnsSlots.map((el) =>
        Object.values(el.slots)
    );
    let nativeTableSlotArr = [];
    columnsSlotsValues.forEach((el) => {
      nativeTableSlotArr = nativeTableSlotArr.concat(el);
    });
    this.isExpandedRowRender = this.slotArr.some(
        (el) => el === "expandedRowRender"
    );
    this.slotArr = this.slotArr.filter(
        (el) => !nativeTableSlotArr.includes(el) && el !== "expandedRowRender"
    ); //expandedRowRender插槽比较特殊，单独处理
    this.nativeTableSlotArr = nativeTableSlotArr;
  },
  beforeDestroy() {
    if (window.tableTime) {
      clearTimeout(window.tableTime);
    }
  },
  methods: {
    /**
     * @description:获取taglist需要的formoptions
     */
    getFormOptions() {
      return this.$attrs.columns.filter((i) => i.options); 
    },
    /**
     * @description:多选的下拉框中的重置按钮
     */
    resetFilter(key, confirm) {
      this.formData[key] = [];
      confirm();
      this.refresh(true);
    }, 
    filterValue(value,column){
      // debugger;
      let temp = '';
      if(column.selectKeys&&Array.isArray(column.selectKeys)){
        column.selectKeys.forEach(item=>{ 
          if(value[item]){ 
           temp = value[item] // eg:cityId-1 regionId-1
          }
        })
      }else{
        temp = value[column.selectKey || column.key]
      }
      return temp;
    },
    /**
     * @description:打开设置表头弹窗
     */
    setColumns() {
      this.midColumns = Object.assign([], this.showColumns);
      this.isVisible = true;
    },
    /**
     * @description:确认设置表头，更新表头并保持到localStorage
     */
    confirmColumns() {
      this.showColumns = Object.assign([], this.midColumns);
      if (this.$route) {
        let userId = this.$store.state.userInfo.id; //获取用户ID this.$store.state.userInfo.id
        if (localStorage.custormColumnObject) {
          let obj = JSON.parse(localStorage.custormColumnObject);
          if (obj[userId]) {
            obj[userId][this.$route.path] = this.showColumns.join(",");
          } else {
            obj = {
              ...obj,
              [userId]: {
                [this.$route.path]: this.showColumns.join(","),
              },
            }
          }
          ;
          localStorage.custormColumnObject = JSON.stringify(obj);
        } else {
          localStorage.custormColumnObject = JSON.stringify({
            [userId]: {
              [this.$route.path]: this.showColumns.join(","),
            },
          });
        }
      }
      this.isVisible = false;
    },
    /**
     * @description:延迟刷新
     */
    debounceFresh: debounce(function (val, confirm, key,column) {
      // debugger;
      if(column&&column.selectKeys&&Array.isArray(column.selectKeys)&&column.mode!='cascader'){
        confirm()
        column.selectKeys.forEach(item=>{
          //赋值Key给值 其他置空
          if(item==key){
            this.formData[key] = val; 
          }else{
            delete this.formData[item] 
          }
        })
        this.refresh(true);
        this.$emit("filterChange", val, key);
      }else if(column.mode=='cascader'){
        if(Array.isArray(val)){ 
          confirm()
          val.forEach((item,index)=>{
            this.formData[column.selectKeys[index]] = item;
          }) 
          this.refresh(true);
          this.$emit("filterChange", val, key);
        } 
      }else{
        confirm();
        this.formData[key] = val; 
        this.refresh(true);
        this.$emit("filterChange", val, key);
      } 
    }),
    /**
     * @description:兼容处理
     */
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        "public.search": "搜索",
        "public.setColumn": "列表字段设置",
        "instance.Confirm": "确定",
        "instance.Reset": "重置",
        "instance.Cancel": "取消",
      };
      return textObj[code] || code;
    },
    /**
     * @description: 计算底部全选按钮位置
     */
    calcSelectAllPosition() {
      this.$nextTick(() => {
        const head = this.$el.querySelector(
            ".ant-table-selection-column .ant-table-header-column"
        );
        if (!head) return;
        const list = this.$el.querySelectorAll(".ant-table-selection-column");
        const actionBar = this.$el.querySelector(".c_table_action_bar");
        if (this.localDataSource.length > 0) {
          const lineDom = window.getComputedStyle(list[1], null);
          const twidth = parseFloat(lineDom.width);
          const padLeft = parseFloat(lineDom["padding-left"]);
          const padRight = parseFloat(lineDom["padding-right"]);
          const mleft = (twidth - padLeft - padRight - 16) / 2 + padLeft;
          head.style.left = `${mleft}px`;
          head.style.visibility = "visible";
          actionBar.style.paddingLeft = `${twidth}px`;
        } else {
          head.style.visibility = "hidden";
        }
      });
    },
    /**
     * @description:清空表格数据
     */
    clearData() {
      this.localDataSource = [];
      this.isLocalLoading = false;
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool &&
      (this.localPagination = Object.assign({}, this.localPagination, {
        current: 1,
        pageNo: 1,
      }));
      if (this.data && this.data instanceof Function) {
        this.isLocalLoading = true;
        this.localDataSource = [];
        this.loadData();
      } else {
        this.localDataSource = this.dataSource;
      }
    },
    paginationChange(pageNo, pageSize) {
      const params = {
        current: pageNo,
        pageNo,
        pageSize,
      };
      this.localPagination.current = pageNo;
      this.localPagination.pageNo = pageNo;
      this.localPagination.pageSize = pageSize;
      this.isLocalLoading = true;
      this.localDataSource = [];
      this.loadData(params);
    },
    onShowSizeChange(current, pageSize) {
      const params = {
        current,
        pageNo: current,
        pageSize,
      };
      this.localPagination.current = current;
      this.localPagination.pageNo = current;
      this.localPagination.pageSize = pageSize;
      this.isLocalLoading = true;
      this.localDataSource = [];
      this.loadData(params);
    },
    loadData: debounce(function (params = this.localPagination) {
      this.data(this.localPagination)
          .then((res) => {
            const {data} = res;
            this.localDataSource = data.payload || [];
            this.total = data.totalSize;
            const maxPage = Math.ceil(this.total / params.pageSize);
            if (this.total > 0 && maxPage < params.pageNo) {
              this.localPagination.pageNo = maxPage;
              this.localPagination.current = maxPage;
              this.loadData();
            }
            if (this.loopTime >= 5000) {
              if (window.tableTime) {
                clearTimeout(window.tableTime);
              }
              window.tableTime = window.setTimeout(this.loadData, this.loopTime);
            }
          })
          .catch((e) => { 
            console.log(e);
          })
          .finally(() => {
            this.isLocalLoading = false;
          });
    }),
    filterOption(input, option) {
      if (option.tag.indexOf("ASelectOptGroup") > -1) {
        //如果分组名称匹配到就直接完成匹配过滤
        let groupName = option.componentOptions.children[0].children[0].text
        if (groupName.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
          return true
        }
        //分组名称没匹配到获取分组的子节点(根据tag过滤)
        const children = option.componentOptions.children.filter(child => child.tag && child.tag.indexOf('ASelectOption') > -1)
        return children.every(child => {//这里需要所有的子节点都满足匹配分组才出现
          return child.componentOptions.children[0].text
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
        })
      }
      return option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
    }
  },
};
</script>
<style lang="less">
.column-checkbox {
  width: 33%;
  margin-left: 0 !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 29px !important;
}

.filterGroupItem {
  text-align: left;
}

.multipleOptions {
  padding-right: 0 !important;
  padding-left: 50px !important;
  text-align: left;

  i {
    border: 1px solid #e6e6e6;
    color: #fff !important;
    left: 22px;
    right: 0;
    width: 16px;
  }
}

.multipleOptions.ant-select-dropdown-menu-item-selected i {
  background-color: #0048ff;
}

.c_table {
  padding: 10px 0px 0px 0px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background: white;

  .ant-table-thead {
    background-color: #e6e8f1 !important; //#f7f9fc !important;
  }

  .ant-table-thead > tr:first-child > th:first-child {
    border-radius: 0 !important;
  }

  .ant-table-thead > tr:last-child > th:last-child {
    border-radius: 0px !important;
  }

  .ant-table-tbody {
    background-color: #fff !important;
  }

  .ant-table-wrapper .ant-table {
    // border-left: 1px solid #e8e8e8;
    // border-right: 1px solid #e8e8e8;
  }

  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
    padding: 0 20px;

    &_left {
      display: flex;
      align-items: center;

      > span {
        white-space: nowrap;
        display: inline-block;
        line-height: 16px;
        padding: 8px;
        height: 32px;
        background: #F1F3F5;
        font-size: 12px;
        font-weight: 400;
        color: #252B3A;
      }
    }

    &_right {
      display: flex;

      .c_table_header_right_searchInput {
        .ant-input:focus {
          border-color: @--main-blue;
        }

        &:hover .ant-input:not(.ant-input-disabled) {
          border-color: @--main-blue;
        }

        .ant-input:not(:first-child) {
          padding-left: 40px;
        }

        .ant-input-prefix {
          left: 15px;
        }

      }

      &_refresh {
        margin-left: 16px;
        float: left;
        width: 44px;

        &:hover,&:focus {
          border-color: @--main-blue;
          color: @--main-blue;
        }
      }
    }
  }

  &_tags {
    margin-bottom: 16px;
    padding: 0 20px;
  }

  .ant-table-expanded-row {
    td {
      border: unset;
    }
  }

  &_noBorder {
    .ant-table {
      border: unset !important;
    }
  }

  &_pagination_box {
    padding: 16px 24px 16px 15px;
    background-color: #fff;
    // border: 1px solid #e8e8e8;
    border-top: 0;
  }

  &_action_bar {

    .ant-btn {
      margin-right: 16px;

      svg {
        vertical-align: -2px;
        margin-right: 10px;
      }
    }

    .c_button {
      float: left;
    }
  }
}
</style>
