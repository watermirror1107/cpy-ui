<template>
  <div class="c_table">
    <a-table
        :class="('bordered' in property&&!property.bordered)?'c_table_noBorder':''"
        v-on="$listeners"
        :loading="isLocalLoading"
        v-bind="property"
        :columns="$attrs.columns"
        :dataSource="localDataSource"
        :rowSelection="$attrs.rowSelection || null"
    >
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
      <template v-slot:filterDropdown="{ confirm }">
        <a-select
            ref="searchInput"
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
            @change="$emit('filterChange',$event,confirm)"
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
      <div
          class="c_table_action_bar"
          :style="{visibility:localDataSource.length>0?'visible':'hidden'}">
        <slot
            name="actionBar">
        </slot>
      </div>
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

export default {
  name: 'CTable',
  inheritAttrs: false,
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
    pagination: {type: Boolean, default: true},
    loopTime: {type: Number},//轮询间隔,建议至少5秒以上
    data: {type: Function},
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
      this.calcSelectAllPosition();
      this.isLocalLoading = false;
    }
    this.slotArr = [...Object.keys(this.$scopedSlots), ...Object.keys(this.$slots)];
    // 这里去重下，不然自定义表头会出现2个
    this.slotArr = Array.from(new Set(this.slotArr)).filter(item => item !== 'filterDropdown' && item !== 'actionBar');//过滤掉1个自定义actionBar和一个filterDropdown
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
        this.calcSelectAllPosition();
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

  .ant-table-thead {
    .ant-table-selection-column .ant-table-header-column {
      position: absolute;
      bottom: -41px;
      left: 29px;
    }

  }

  &_action_box {
    display: flex;
    margin-top: 10px;
    justify-content: space-between

  }

  &_action_bar {
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
