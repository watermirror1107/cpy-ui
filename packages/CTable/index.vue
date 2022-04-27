<template>
  <!--  todo 添加刷新按钮，添加设置表头按钮，改动actionBar，修改权限复选框位置，修改分页的UI，添加row-click,添加单选和多选搜索的下拉表格过滤类型,修改表头的样式-->
  <div class="c_table">
    <div class="c_table_header">
      <div class="c_table_header_left">
        <div class="c_table_action_bar">
          <slot name="actionBar"></slot>
        </div>
        <a-input size="large" v-model="formData.queryName"
                 :placeholder="formOptions.find(i=>i.key==='queryName').placeholder"
                 @change="refresh(true)">
          <icon
              slot="suffix"
              name="icon-sousuo"/>
        </a-input>
        <c-button class="c_table_header_left_refresh" size="large" :disabled="isLocalLoading" type="text"
                  @click="refresh(true)">
          <icon name="icon-chongzhi_shuaxin"></icon>
        </c-button>
        <c-button type="text" class="c_table_header_left_refresh" v-if="isSetColumn" size="large"
                  @click="$emit('setColumn')">
          <icon name="icon-daohang_shiliguige"></icon>
          <!--      todo 设置图标未提供-->
        </c-button>
      </div>
      <div class="c_table_header_right">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <tag-list class="c_table_tags" v-model="formData" :formOptions="formOptions"
              :filterArr="['queryName','date']"></tag-list>
    <a-table
        :class="('bordered' in property&&!property.bordered)?'c_table_noBorder':''"
        v-on="$listeners"
        :loading="isLocalLoading"
        v-bind="property"
        :columns="$attrs.columns"
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
      <template v-slot:filterDropdown="{ confirm ,column}">
        <a-select
            v-if="column.type==='selectMultiple'"
            show-search
            v-model="formData[column.key]"
            style="width: 180px;"
            :defaultOpen="true"
            :open="true"
            :showArrow="false"
            mode="multiple"
            :getPopupContainer="(triggerNode)=>triggerNode.parentNode"
            :filter-option="(input, option) =>(option.componentOptions.children[1].text.toLowerCase().indexOf(input.toLowerCase()) >= 0)"
            :placeholder="$T('public.search')"
        >
          <a-select-option
              class="multipleOptions"
              v-for="option in filterOptions"
              :value="option.id"
              :key="option.id">
            {{ option.name }}
          </a-select-option>
          <div slot="dropdownRender" slot-scope="menu">
            <v-nodes :vnodes="menu"/>
            <a-divider style="margin: 4px 0;"/>
            <div
                style="padding: 7px 8px;"
                @mousedown="e => e.preventDefault()"
            >
              <a-button style="margin-right: 8px;" type="primary" @click="debounceFresh($event,confirm)">确定</a-button>
              <a-button type="primary" ghost @change="debounceFresh($event,confirm)">重置</a-button>
            </div>
          </div>
        </a-select>
        <a-select
            v-else
            v-model="formData[column.key]"
            style="width: 180px;"
            show-search
            :showArrow="false"
            allowClear
            autoFocus
            :defaultOpen="true"
            :open="true"
            :getPopupContainer="(triggerNode)=>triggerNode.parentNode"
            option-filter-prop="children"
            :filter-option="(input, option) =>(option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0)"
            :placeholder="$T('public.search')"
            @change="debounceFresh($event,confirm)"
        >
          <a-select-option
              v-for="option in filterOptions"
              :value="option.id"
              :key="option.id">{{ option.name }}
          </a-select-option>
        </a-select>
      </template>
    </a-table>
    <div
        class="c_table_action_box">
      <a-pagination
          v-if="pagination"
          v-bind="{
         ...this.localPagination,
        showSizeChanger: true,
        total: this.total
        }"
          :showTotal="showTotal"
          @change=paginationChange
          @showSizeChange=onShowSizeChange
      />
    </div>
  </div>
</template>
<script>
import {debounce} from "@/utils";
import Icon from "../CIcon";
import TagList from "../CTagList";
import CButton from "../CButton";

export default {
  name: 'CTable',
  inheritAttrs: false,
  components: {
    Icon,
    CButton,
    TagList,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    }
  },
  data() {
    return {
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
    isSetColumn: {type: Boolean, default: true},//是否可以设置表头
    pagination: {type: Boolean, default: true},
    loopTime: {type: Number},//轮询间隔,建议至少5秒以上
    data: {type: Function},
    formData: {
      type: Object, default: () => {
      }
    },
    formOptions: {type: Array, default: () => []},
    filterOptions: {type: Array, default: () => []},
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
  beforeMount() {
    if (!this.$T) {
      this.$T = this.translateText
    }
  },
  mounted() {
    //todo 判断是否有存储的columns
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
     * @description:延迟刷新
     */
    debounceFresh: debounce(function (ev, confirm) {
      this.$emit('filterChange', ev, confirm)
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
.c_table {
  padding-bottom: 24px;

  .ant-table-thead {
    background-color: #F7F9FC !important;
  }

  &_header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

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


  &_action_box {
    margin-top: 10px;
    width: 100%;
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
