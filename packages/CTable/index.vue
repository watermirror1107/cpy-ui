<template>
  <div class="c_table">
    <a-table
        :scroll="scroll"
        v-on="$listeners"
        :loading="isLocalLoading"
        v-bind="property"
        :columns="$attrs.columns"
        :dataSource="localDataSource"
        :rowSelection="$attrs.rowSelection ? {
        selectedRowKeys: $attrs.rowSelection.selectedRowKeys?$attrs.rowSelection.selectedRowKeys:[],
        onChange:  $attrs.rowSelection.onChange?$attrs.rowSelection.onChange:()=>{},
        getCheckboxProps:  $attrs.rowSelection.getCheckboxProps?$attrs.rowSelection.getCheckboxProps:()=>({props: {disabled: false}}),
      } : null"
    >
      <template
          v-for="name  in slotArr"
          v-slot:[name]="text,record"
      >
        <slot
            :name="name"
            :text="text"
            :record="record"
        ></slot>
      </template>
      <template
          v-for="item in nativeTableSlotArr"
          v-slot:[item]>
        <slot :name="item"></slot>
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
              v-for="item in filterOptions"
              :value="item.id"
              :key="item.id">{{ item.name }}
          </a-select-option>
        </a-select>
      </template>
    </a-table>
    <div
        class="c_table_action_box"
    >
      <div
          class="c_table_action_bar"
          :style="{visibility:localDataSource.length>0?'visible':'hidden'}">
        <slot
            name="actionBar">
        </slot>
      </div>

      <a-pagination
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
    loopTime: {type: Number},//轮询间隔,建议至少5秒以上
    data: {type: Function, required: true},
    filterOptions: {type: Array, default: () => []},
    scroll: {default: () => ({ x: 930 }),type:Object}
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
    this.slotArr = [...Object.keys(this.$scopedSlots), ...Object.keys(this.$slots)];
    // 这里去重下，不然自定义表头会出现2个
    this.slotArr = Array.from(new Set(this.slotArr)).filter(item => item !== 'filterDropdown' && item !== 'actionBar');

    // 取出列数据里面的slots
    const columnsSlots = this.$attrs.columns.filter(el => el.slots);
    const columnsSlotsValues = columnsSlots.map(el => Object.values(el.slots));
    let nativeTableSlotArr = [];
    columnsSlotsValues.forEach(el => {
      nativeTableSlotArr = nativeTableSlotArr.concat(el);
    });
    this.slotArr = this.slotArr.filter(el => !nativeTableSlotArr.includes(el));
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
      let textObj={
        'public.search':'搜索'
      }
      return textObj[code]||code
    },
    /**
     * @description:展示数据总数
     */
    showTotal(total, range) {
      if (this.$store&&this.$store.state && this.$store.state.language === 'en_US') {
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
        const list = this.$el.querySelectorAll('.ant-table-selection-column');
        const actionBar = this.$el.querySelector('.actionBar');
        if (!actionBar) return;
        if (list.length > 1) {
          const lineDom = window.getComputedStyle(list[1], null);
          const twidth = parseFloat(lineDom.width);
          const padLeft = parseFloat(lineDom['padding-left']);
          const padRight = parseFloat(lineDom['padding-right']);
          const mleft = ((twidth - padLeft - padRight - 16) / 2) + padLeft;
          list[0].style.left = `${mleft}px`;
          list[0].style.visibility = 'visible';
          actionBar.style.marginLeft = `${twidth}px`;
        } else if (list.length > 0) {
          list[0].style.visibility = 'hidden';
          actionBar.style.marginLeft = '20px';
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
      this.isLocalLoading = true;
      this.localDataSource = [];
      this.loadData();
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

  /deep/ .ant-table-thead {
    > tr > th {
      border-bottom: unset;
    }

    .ant-table-selection-column {
      position: absolute;
      bottom: -47px;
      left: 14px;
      width: 16px;
      padding-left: 0 !important;
      visibility: hidden;
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

  }
}

</style>
