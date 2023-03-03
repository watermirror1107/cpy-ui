<template>
  <div class="cpage-wrap">
    <div class="cpage-total">
      {{ translateText('total',total) }}
    </div>
    <div>
      <div class="cpage-pagesize" v-if="isShowSizeChanger">
        <a-dropdown :trigger="['click']" overlayClassName="dropdownc">
          <a class="sizelink" @click="(e) => e.preventDefault()">
            {{ currentPageSize }} {{ translateText('page') }}
            <a-icon type="caret-down"/>
          </a>
          <a-menu slot="overlay" @click="onSize" :selectedKeys="[currentPageSize]">
            <a-menu-item v-for="opt in pageSizeOpts" :key="opt">
              {{ opt }}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div class="cpage-btn">
        <div class="btn-item" :class="{ 'cpage-btn-disabled' : isFirstPage }" @click="firstPage">
          <a-icon type="step-backward"/>
        </div>
        <div class="btn-item" :class="{ 'cpage-btn-disabled' : isFirstPage }" @click="prev">
          <a-icon type="caret-left"/>
        </div>
        <input
            class="input-wrap"
            type="text"
            :value="currentPage"
            autocomplete="off"
            spellcheck="false"
            @keydown="keyDown"
            @keyup="keyUp"
            @change="keyUp"
        />
        <div class="btn-item btn-total-num">/ {{ allPages }}</div>
        <div class="btn-item" :class="{ 'cpage-btn-disabled' : isLastPage }" @click="next">
          <a-icon type="caret-right"/>
        </div>
        <div class="btn-item" :class="{ 'cpage-btn-disabled' : isLastPage }" style="border-right: none"
             @click="lastPage">
          <a-icon type="step-forward"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CPage',
  props: {
    isShowSizeChanger:{
      type:Boolean,
      default:true
    },
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [10, 20, 30, 40]
      },
    },
  },
  data() {
    return {
      currentPage: this.current,
      currentPageSize: this.pageSize,
    }
  },
  watch: {
    current(nv) {
      if(this.currentPage !== nv) {
        this.currentPage = nv;
      }
    }
  },
  computed: {
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize)
      return allPage === 0 ? 1 : allPage
    },
    isFirstPage() {
      return this.currentPage === 1
    },
    isLastPage() {
      return this.currentPage === this.allPages
    }
  },
  methods: {
    /**
     * @description:翻译兼容
     */
    translateText(key,total) {
      let textObj = {
        'en_US': {
          page: '',
          total:`Total ${total} items`
        },
        'zh_CN': {
          page: '',
          total: `总条数: ${total}`
        },
      }
      return textObj[localStorage.CPY_PORTAL_LANGUAGE||'zh_CN'][key]
    },
    changePage(page) {
      if (this.currentPage != page) {
        const pageSize = this.currentPageSize
        this.currentPage = page
        this.$emit('change', page, pageSize)
      }
    },
    prev() {
      if (this.isFirstPage) return;
      const current = this.currentPage
      if (current <= 1) {
        return false
      }
      this.changePage(current - 1)
    },
    next() {
      if (this.isLastPage) return;
      const current = this.currentPage
      if (current >= this.allPages) {
        return false
      }
      this.changePage(current + 1)
    },
    firstPage() {
      if (this.isFirstPage) return;
      this.changePage(1)
    },
    lastPage() {
      if (this.isLastPage) return;
      this.changePage(this.allPages)
    },
    onSize({key}) {
      this.currentPageSize = key
      const current = this.currentPage
      const size = key
      this.$emit('showSizeChange', current, size)
      this.changePage(1)
    },
    keyDown(e) {
      const key = e.keyCode
      const condition =
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105) ||
          key === 8 ||
          key === 37 ||
          key === 39

      if (!condition) {
        e.preventDefault()
      }
    },
    keyUp(e) {
      const key = e.keyCode
      const val = parseInt(e.target.value)

      if (key === 38) {
        this.prev()
      } else if (key === 40) {
        this.next()
      } else if (key === 13) {
        let page = 1

        if (val > this.allPages) {
          page = this.allPages
        } else if (val <= 0 || !val) {
          page = 1
        } else {
          page = val
        }

        e.target.value = page
        this.changePage(page)
      }
    },
  },
}
</script>
<style lang="less">
.dropdownc .ant-dropdown-menu-item:hover {
  background-color:@--cpy-blue-3!important;
  color: @--cpy-white;
}

.dropdownc .ant-dropdown-menu-item-selected {
  background: @--cpy-gray-9;
  color: @--cpy-black-4;
  font-weight: 600;

}
</style>
<style lang="less">
.cpage-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cpage-total {
  color: @--cpy-gray-3;
}

.cpage-pagesize {
  float: left;
  display: flex;
  margin-right: 12px;
  line-height: 24px;
  height: 24px;
  padding: 0 10px;
  border: 1px solid #ADB0B8;
  border-radius: 4px;
  box-sizing: border-box;
  .sizelink {
    color: #252B3A;
    line-height: 24px;
    >i{
      margin-left: 13px;
    }
  }

  .unit {
    display: inline-block;
    padding-left: 6px;
    color: @--cpy-gray-3;
    font-size: 14px;
  }
}

.cpage-btn {
  float: left;
  display: flex;
  align-items: center;
  border: 1px solid @--cpy-gray-10;
  color: 646464;
  border-radius: 4px;
  overflow: hidden;

  .btn-item {
    height: 22px;
    width: 32px;
    line-height: 22px;
    text-align: center;
    border-right: 1px solid @--cpy-gray-10;
    background: @--cpy-gray-11;
    cursor: pointer;

    &:hover {
      color: @--cpy-blue-3;
    }

    &.cpage-btn-disabled {
      background-color:@--cpy-disabled-color;
      color: @--cpy-disabled-font-color3;

      &:hover {
        color: @--cpy-disabled-font-color3;
      }
    }
  }

  .input-wrap {
    border: none;
    outline: none;
    width: 48px;
    height: 22px;
    border-right: 1px solid @--cpy-gray-10;
    text-align: center;
    line-height: 22px;
  }

  .btn-total-num {
    width: 48px;

    &:hover {
      color: @--cpy-gray-4;
    }
  }
}
</style>
