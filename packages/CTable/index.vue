<template>
  <div class="c_table">
    <div v-if="isShowHeader" class="c_table_header">
      <div class="c_table_header_actionBar" v-if="isShowActionBar">
        <slot name="actionBar"></slot>
        <a-button @click="removeAll">取消选择</a-button>
      </div>
      <div class="c_table_header_content" v-else>
        <c-table-input-search
            v-if="isShowSearch"
            :formData.sync="formData"
            :columns="$attrs.columns"
            @change="debounceFresh($event, () => {}, 'queryName')"
            :placeholder="queryNamePlaceholder"
        >
        </c-table-input-search>
        <c-button
            v-if="isShowFresh"
            class="c_table_header_right_refresh"
            size="large"
            :disabled="isLocalLoading"
            type="text"
            @click="refresh"
        >
          <icon name="icon-chongzhi_shuaxin"></icon>
        </c-button>
        <c-button
            type="text"
            class="c_table_header_right_refresh c_table_right_setColumn"
            v-if="isSetColumn"
            size="large"
            @click="setColumns"
        >
          <icon name="icon-shili_shezhi"></icon>
        </c-button>
      </div>
    </div>
    <a-table
        ref="test"
        :class="
        'bordered' in property && !property.bordered ? 'c_table_noBorder' : ''
      "
        v-on="$listeners"
        :loading="isLocalLoading"
        v-bind="property"
        :columns="columns"
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
        <template v-if="column.searchType === 'selectMultiple'">
          <template v-if="column.filterOptionMethod&&typeof column.filterOptionMethod =='function'">
            <c-table-filter :isMultiple="true"
                            mode="tree"
                            :value="formData[column.searchKey || column.key]"
                            :options="column.filterOptionMethod(column.options)"
                            @cancel="confirm"
                            @confirm="debounceFresh($event, confirm, column.searchKey || column.key)">>
            </c-table-filter>
          </template>
          <template v-if="!column.filterOptionMethod">
            <c-table-filter :isMultiple="true"
                            :value="formData[column.searchKey || column.key]"
                            :options="column.options"
                            @cancel="confirm"
                            @confirm="debounceFresh($event, confirm, column.searchKey || column.key)"></c-table-filter>
          </template>
          <!-- slot="dropdownRender" slot-scope="menu" -->
        </template>
        <!-- <a-select
            v-if="column.searchType === 'selectMultiple'"
            show-search
            style="width: 180px"
            :defaultOpen="true"
            :open="true"
            :showArrow="false"
            mode="multiple"
            :value="formData[column.searchKey || column.key]"
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
        <template v-else-if="column.searchType !== 'input'">
          <template v-if="column.filterOptionMethod&&typeof column.filterOptionMethod =='function'">
            <c-table-filter mode="tree"
                            :value="formData[column.searchKey || column.key]"
                            :options="column.filterOptionMethod(column.options)"
                            @cancel="confirm"
                            @confirm="debounceFresh($event, confirm, column.searchKey || column.key)">>
            </c-table-filter>
          </template>
          <template v-if="!column.filterOptionMethod">
            <c-table-filter :value="formData[column.searchKey || column.key]"
                            :options="column.options"
                            @cancel="confirm"
                            @confirm="debounceFresh($event, confirm, column.searchKey || column.key)"></c-table-filter>
          </template>
        </template>
        <!-- <a-select
            v-else
            style="width: 180px"
            :showArrow="false"
            allowClear
            autoFocus
            :value="formData[column.searchKey || column.key]"
            :defaultOpen="true"
            :open="true"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            :filter-option="filterOption"
            :placeholder="column.placeholder || $T('public.search')"
            @change="debounceFresh($event, confirm, column.searchKey || column.key)"
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
        :title="null"
        :ok="confirmColumns"
    >
      <p class="modal_title">自定义列表字段</p>
      <p class="modal_alert">
        <icon name="icon-a-gongxiangwenjian_"></icon>
        <span>请选择您想显示的列表详细信息，最多选择{{ $attrs.columns.length }}个字段,已勾选:{{
            midColumns.length
          }}个</span>
      </p>
      <a-checkbox-group style="width: 100%" v-model="midColumns">
        <checkbox
            v-for="(item, index) in $attrs.columns"
            :key="index"
            :disabled="item.banHide||false"
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
import CTableInputSearch from "../CTableInputSearch";
import Icon from "../CIcon";
import Modal from "../CModal/index.vue";
import CButton from "../CButton";
import {Checkbox} from "ant-design-vue";
import CPage from "../CPage";
import CTableFilter from '../CTableFilter/index.vue';

export default {
  name: "CTable",
  provide() {
    return {
      refresh: this.refresh,
      debounceFresh: this.debounceFresh,
      resetFilter: this.resetFilter
    }
  },
  inheritAttrs: false,
  components: {
    Icon,
    CTableInputSearch,
    Checkbox,
    Modal,
    CButton,
    CPage,
    CTableFilter,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      formData: {
        queryName: ''
      },
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
    queryNamePlaceholder: {type: String, default: "placeholder"}, //是否可以设置表头
    isShowHeader: {type: Boolean, default: true}, //是否显示表格搜索头部等按钮
    isShowPagination: {type: Boolean, default: true}, //是否显示分页器
    isShowFresh: {type: Boolean, default: false}, //是否可以刷新
    isShowSearch: {type: Boolean, default: true}, //是否可以搜索
    isSetColumn: {type: Boolean, default: true}, //是否可以设置表头
    loopTime: {type: Number}, //轮询间隔,建议至少5秒以上
    data: {type: Function},
    dataSource: {type: Array, default: () => []},
    scroll: {default: () => ({x: 930}), type: Object},
    expandParams: {default: () => ({}), type: Object},
  },
  watch: {
    dataSource(nv) {
      if (!this.data) {
        this.localDataSource = nv;
      }
    },
    formData: {
      handler(nv, ov) {
        let keys=[]
        Object.keys(nv).forEach(key => {
          if (nv[key] instanceof Array && nv[key].length > 0) {
            keys.push(key)
          } else if (!(nv[key] instanceof Array) && nv[key]) {
            keys.push(key)
          }
        })
        this.setSelectedColumnStyle(keys)
      },
      deep: true
    }
  },
  computed: {
    columns() {
      return this.$attrs.columns.filter((column) => this.showColumns.includes(column.key))
    },
    isShowActionBar() {
      return this.$attrs.rowSelection && this.$attrs.rowSelection.selectedRowKeys.length > 0
    }
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
    this.$attrs.columns.forEach(column => {//自动收集需要搜索的字段
      if (column.searchType) {
        let defaultValue = ''
        if (column.searchType === 'selectMultiple') {
          defaultValue = []
        } else if (column.searchType === 'select') {
          defaultValue = undefined
        }
        this.$set(this.formData, column.searchKey || column.key, column.defaultValue || defaultValue)
      }
    })
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
     * @description:设置表头被选中的样式
     */
    setSelectedColumnStyle(keys) {
      // 需要设置表头样式的列
      let indexs =[];
      this.showColumns.forEach((item,index) => {
        if(keys.includes(item)){
          index = index + (this.$attrs.rowSelection ? 1 : 0)//这里序列要根据是否有this.$attrs.rowSelection
          indexs.push(index)
        }
      })
      let els = document.querySelectorAll('.c_table .ant-table-thead th')
      for (const el of els) {
        el.classList.remove('selectColumn')
      }
      for (const index of indexs) {
        els[index].classList.add('selectColumn')
      }
    },
    /**
     * @description:移除所有的选项
     */
    removeAll() {
      this.$refs.test.$children[0].$children[0].$children[0].$children[0].$children[0].$children[0].$children[1]
          .$children[0].$children[1].$children[0].$children[0].$emit('select', 'removeAll')
    },
    /**
     * @description:多选的下拉框中的重置按钮
     */
    resetFilter(key, confirm) {
      this.formData[key] = [];
      confirm();
      this.refresh(true);
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
    debounceFresh: debounce(function (val, confirm, key) {
      // debugger;
      this.formData[key] = val
      confirm();
      this.refresh(true);
      this.$emit("filterChange", val, key);
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
     * @description:展示数据总数
     */
    showTotal(total, range) {
      if (
          this.$store &&
          this.$store.state &&
          this.$store.state.language === "en_US"
      ) {
        return `Total ${total}`;
      } else {
        return `共 ${total} 条`;
      }
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
      // console.log(JSON.stringify(this.formData))
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
      this.data({...this.localPagination, ...this.formData})
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
  margin-bottom: 16px !important;
  height: 20px;
  line-height: 20px;
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

.modal_title {
  padding-bottom: 19px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #323232;
  border-bottom: 1px solid #CCD1DF;
  margin-bottom: 11px;
}

.modal_alert {
  font-size: 14px;
  font-weight: 400;
  color: #216CFD;
  margin-bottom: 17px;
  line-height: 20px;
  background-color: #D3E2FF;
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;

  .c_icon {
    margin-right: 8px;
    margin-top: 3px;
  }
}

.c_table {
  padding: 10px 0 0 0;
  border: 1px solid #e8e8e8;
  background: white;

  .ant-table-thead > tr > th {
    color: #969696 !important
  }

  .ant-table-thead > tr > th.selectColumn {
    color: #323232 !important;

    .ant-table-filter-icon {
      color: #323232 !important;
    }
  }

  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters {
    &:hover {
      color: #323232 !important;

      .ant-table-filter-icon {
        background-color: unset !important;

        &:hover {
          color: #323232 !important;
        }
      }
    }

    .ant-table-filter-open {
      background-color: unset !important;
    }

  }

  .ant-table {
    color: #323232;
  }

  .ant-table-thead {
    background-color: #F2F5FC !important;
  }

  .ant-table-thead > tr:first-child > th:first-child {
    border-radius: 0px !important;
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
    margin: 16px 0;
    padding: 0 20px;
    width: 100%;

    &_actionBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: inherit;
    }

    &_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: inherit;

      > .c_button {
        margin-left: 16px;
      }
    }
  }

  .c_table_right_setColumn:hover {
    color: #323232 !important;
    border: 1px solid #CCD1DF !important;
    background: #F1F2F3 !important;
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
    float: left;
    //margin-left: 70px;

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
