<template>
  <div class="c_table">
    <div v-if="isShowHeader" class="c_table_header">
      <div class="c_table_header_left">
        <div class="c_table_action_bar">
          <slot name="actionBar"></slot>
        </div>
        <a-input size="large" v-model="formData.queryName" @change="debounceFresh($event,()=>{},'queryName')"
                 :placeholder="queryNamePlaceholder">
          <icon
              slot="suffix"
              name="icon-sousuo"/>
        </a-input>
        <c-button class="c_table_header_left_refresh" size="large" :disabled="isLocalLoading" type="text"
                  @click="refresh">
          <icon name="icon-chongzhi_shuaxin"></icon>
        </c-button>
        <c-button type="text" class="c_table_header_left_refresh" v-if="isSetColumn" size="large"
                  @click="setColumns">
          <icon name="icon-daohang_shiliguige"></icon>
          <!--      todo 设置图标未提供-->
        </c-button>
      </div>
      <div class="c_table_header_right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <tag-list @close="refresh(true)" class="c_table_tags" v-model="formData" :formOptions="getFormOptions()"
              :tagFilterArr="tagFilterArr"></tag-list>
    <a-table
        :class="('bordered' in property&&!property.bordered)?'c_table_noBorder':''"
        v-on="$listeners"
        :loading="isLocalLoading"
        v-bind="property"
        :columns="$attrs.columns.filter(column=> showColumns.includes(column.key))"
        :dataSource="localDataSource"
        :rowSelection="$attrs.rowSelection || null"
    >
      <template #filterIcon>
        <!--todo 图标未替换-->
        <icon style="width: 16px;outline: unset;margin-left: 4px;" name="icon-qidong"></icon>
      </template>
      <template
          v-for="slot  in slotArr"
          v-slot:[slot]="text,record,index"
      >
        <slot
            :name="slot"
            :text="text"
            :record="record"
            :index="index"
        ></slot>
      </template>
      <template v-if="isExpandedRowRender" v-slot:expandedRowRender="record, index, indent, expanded">
        <slot name="expandedRowRender" :record="record" :index="index" :indent="indent" :expanded="expanded"></slot>
      </template>
      <template
          v-for="nativeTable in nativeTableSlotArr"
          v-slot:[nativeTable]>
        <slot :name="nativeTable"></slot>
      </template>
      <!--      表头过滤-->
      <template v-slot:filterDropdown="{confirm,column}">
        <a-select
            v-if="column.type==='selectMultiple'"
            show-search
            style="width: 180px;"
            :defaultOpen="true"
            :open="true"
            :showArrow="false"
            mode="multiple"
            v-model="formData[column.selectKey||column.key]"
            :getPopupContainer="(triggerNode)=>triggerNode.parentNode"
            :filter-option="(input, option) =>(option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0)"
            :placeholder="column.placeholder||$T('public.search')"
        >
          <a-select-option
              class="multipleOptions"
              v-for="option in column.options"
              :value="option.id"
              :key="option.id">
            {{ option.name }}
          </a-select-option>
          <div slot="dropdownRender" slot-scope="menu">
            <v-nodes :vnodes="menu"/>
            <a-divider style="margin: 4px 0;"/>
            <div
                style="padding: 7px 8px;display:flex;justify-content:space-between;"
                @mousedown="e => e.preventDefault()">
              <a-button type="primary"
                        @click="debounceFresh(formData[column.selectKey||column.key],confirm,column.selectKey||column.key)">
                确定
              </a-button>
              <a-button type="primary" ghost @click="resetFilter(column.selectKey||column.key,confirm)">重置</a-button>
            </div>
          </div>
        </a-select>
        <a-select
            v-else
            style="width: 180px;"
            show-search
            :showArrow="false"
            allowClear
            autoFocus
            v-model="formData[column.selectKey||column.key]"
            :defaultOpen="true"
            :open="true"
            :getPopupContainer="(triggerNode)=>triggerNode.parentNode"
            option-filter-prop="children"
            :filter-option="(input, option) =>(option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0)"
            :placeholder="column.placeholder||$T('public.search')"
            @change="debounceFresh($event,confirm,column.selectKey||column.key)"
        >
          <a-select-option
              v-for="option in column.options"
              :value="option.id"
              :key="option.id">{{ option.name }}
          </a-select-option>
        </a-select>
      </template>
    </a-table>
    <div
        v-if="isShowPagination"
        class="c_table_pagination_box">
      <c-page
          v-bind="{
         ...this.localPagination,
        showSizeChanger: true,
        total: this.total
        }"
          @change=paginationChange
          @showSizeChange=onShowSizeChange></c-page>
    </div>
    <modal :width="480" okText="确定" cancelText="取消" :isVisible="isVisible" title="列表字段设置"
           :cancel="()=>(isVisible=false)" :ok="confirmColumns">
      <a-checkbox-group style="width: 100%;" v-model="midColumns">
        <checkbox v-for="(item,index) in $attrs.columns.map(i=>i.key)" :key="index" class="column-checkbox"
                  :value="item">
          {{ item }}
        </checkbox>
      </a-checkbox-group>
    </modal>
  </div>
</template>
<script>
import {debounce} from "@/utils";
import Icon from "../CIcon";
import TagList from "../CTagList";
import Modal from "../CModal";
import CButton from "../CButton";
import {Checkbox} from "ant-design-vue";
import CPage from '../CPage'

export default {
  name: 'CTable',
  inheritAttrs: false,
  components: {
    Icon,
    Checkbox,
    Modal,
    CButton,
    CPage,
    TagList,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    }
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
        pageSize: 10
      },
      total: 0,
      slotArr: [],
      nativeTableSlotArr: [],
      property: {},
      form: {filterCondition: undefined}
    }
  },
  props: {
    queryNamePlaceholder: {type: String, default: 'placeholder'},//是否可以设置表头
    isShowHeader: {type: Boolean, default: true},//是否显示表格搜索头部等按钮
    isShowPagination: {type: Boolean, default: true},//是否显示分页器
    isSetColumn: {type: Boolean, default: true},//是否可以设置表头
    loopTime: {type: Number},//轮询间隔,建议至少5秒以上
    data: {type: Function},
    formData: {
      type: Object, default: () => {
      }
    },
    tagFilterArr: {type: Array, default: () => ['queryName']},
    dataSource: {type: Array, default: () => []},
    scroll: {default: () => ({x: 930}), type: Object}
  },
  watch: {
    dataSource(nv) {
      if (!this.data) {
        this.localDataSource = nv
      }
    }
  },
  created() {
    if (this?.$route?.path && localStorage.custormColumnObject) {//从缓存里面取
      let userId = this.$store.state.userInfo.id//获取用户ID this.$store.state.userInfo.id
      let arr = JSON.parse(localStorage.custormColumnObject)[userId][this?.$route?.path].split(',')
      this.showColumns = arr
    } else {
      this.showColumns = this.$attrs.columns.map(i => i.key)
    }
  },
  beforeMount() {
    if (!this.$T) {
      this.$T = this.translateText
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
    this.slotArr = [...Object.keys(this.$scopedSlots), ...Object.keys(this.$slots)];
    // 这里去重下，不然自定义表头会出现2个
    this.slotArr = Array.from(new Set(this.slotArr)).filter(item => item !== 'filterDropdown' && item !== 'actionBar' && item !== 'headerRight');//过滤掉1个自定义actionBar和一个filterDropdown
    // 取出列数据里面的slots
    const columnsSlots = this.$attrs.columns.filter(el => el.slots);
    const columnsSlotsValues = columnsSlots.map(el => Object.values(el.slots));
    let nativeTableSlotArr = [];
    columnsSlotsValues.forEach(el => {
      nativeTableSlotArr = nativeTableSlotArr.concat(el);
    });
    this.isExpandedRowRender = this.slotArr.some(el => el === 'expandedRowRender')
    this.slotArr = this.slotArr.filter(el => !nativeTableSlotArr.includes(el) && el !== 'expandedRowRender');//expandedRowRender插槽比较特殊，单独处理
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
      return this.$attrs.columns.filter(i => i.options)
    },
    /**
     * @description:多选的下拉框中的重置按钮
     */
    resetFilter(key, confirm) {
      this.formData[key] = []
      confirm()
      this.refresh(true)
    },
    /**
     * @description:打开设置表头弹窗
     */
    setColumns() {
      this.midColumns = Object.assign([], this.showColumns)
      this.isVisible = true;
    },
    /**
     * @description:确认设置表头，更新表头并保持到localStorage
     */
    confirmColumns() {
      this.showColumns = Object.assign([], this.midColumns)
      if (this.$route) {
        let userId = this.$store.state.userInfo.id//获取用户ID this.$store.state.userInfo.id
        if (localStorage.custormColumnObject) {
          let obj = JSON.parse(localStorage.custormColumnObject)
          obj[userId][this.$route.path] = this.showColumns.join(',')
          localStorage.custormColumnObject = JSON.stringify(obj)
        } else {
          localStorage.custormColumnObject = JSON.stringify({
            [userId]: {
              [this.$route.path]: this.showColumns.join(',')
            }
          })
        }
      }
      this.isVisible = false;
    },
    /**
     * @description:延迟刷新
     */
    debounceFresh: debounce(function (val, confirm, key) {
      confirm()
      this.refresh(true)
      this.$emit('filterChange', val, key)
    }),
    /**
     * @description:兼容处理
     */
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        'public.search': '搜索'
      }
      return textObj[code] || code
    },
    /**
     * @description:展示数据总数
     */
    showTotal(total, range) {
      if (this.$store && this.$store.state && this.$store.state.language === 'en_US') {
        return `Total ${total}`
      } else {
        return `共 ${total} 条`
      }
    },
    /**
     * @description: 计算底部全选按钮位置
     */
    calcSelectAllPosition() {
      this.$nextTick(() => {
        const head = this.$el.querySelector('.ant-table-selection-column .ant-table-header-column');
        if (!head) return;
        const list = this.$el.querySelectorAll('.ant-table-selection-column');
        const actionBar = this.$el.querySelector('.c_table_action_bar');
        if (this.localDataSource.length > 0) {
          const lineDom = window.getComputedStyle(list[1], null);
          const twidth = parseFloat(lineDom.width);
          const padLeft = parseFloat(lineDom['padding-left']);
          const padRight = parseFloat(lineDom['padding-right']);
          const mleft = ((twidth - padLeft - padRight - 16) / 2) + padLeft;
          head.style.left = `${mleft}px`;
          head.style.visibility = 'visible';
          actionBar.style.paddingLeft = `${twidth}px`;
        } else {
          head.style.visibility = 'hidden';
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
        pageNo: 1
      }));
      if (this.data && this.data instanceof Function) {
        this.isLocalLoading = true;
        this.localDataSource = [];
        this.loadData();
      } else {
        this.localDataSource = this.dataSource
      }
    },
    paginationChange(pageNo, pageSize) {
      const params = {
        current: pageNo,
        pageNo,
        pageSize
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
        pageSize
      };
      this.localPagination.current = current;
      this.localPagination.pageNo = current;
      this.localPagination.pageSize = pageSize;
      this.isLocalLoading = true;
      this.localDataSource = [];
      this.loadData(params);
    },
    loadData: debounce(function (params = this.localPagination) {
      this.data(this.localPagination).then((res) => {
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
      }).catch((e) => {
        console.log(e);
      }).finally(() => {
        this.isLocalLoading = false;
      });
    })
  }
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

.multipleOptions {
  padding-right: 0 !important;
  padding-left: 50px;
  text-align: left;
  i {
    border: 1px solid #E6E6E6;
    color: #fff !important;
    left: 22px;
    right: 0;
    width: 16px;
  }
}

.multipleOptions.ant-select-dropdown-menu-item-selected i {
  background-color: #0048FF;
}

.c_table {

  .ant-table-thead {
    background-color: #F7F9FC !important;
  }

  .ant-table-tbody {
    background-color: #fff !important;
  }

  .ant-table-wrapper .ant-table {
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }

  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;

    &_left {
      .ant-input-affix-wrapper {
        width: 240px;
        margin-right: 16px;
        float: left;
      }

      &_refresh {
        margin-right: 16px;
        float: left;
        //border-color:#E6E6E6!important;
        //color: #646464!important;
      }
    }
  }

  &_tags {
    margin-bottom: 16px;
  }

  .ant-table-expanded-row {
    td {
      border: unset
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
    border: 1px solid #e8e8e8;
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
