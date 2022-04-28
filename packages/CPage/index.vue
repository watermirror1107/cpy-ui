<template>
  <div class="cpage-wrap">
    <div class="cpage-pagesize">
      <a-dropdown :trigger="['click']" overlayClassName="dropdownc">
        <a class="sizelink" @click="(e) => e.preventDefault()">
          {{currentPageSize}} <a-icon type="caret-down" /> <span class="unit">条/页</span>
        </a>
        <a-menu slot="overlay" @click="onSize">
          <a-menu-item v-for="opt in pageSizeOpts" :key="opt">
            {{ opt }} 条/页
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="cpage-btn">
      <div class="btn-item" @click="firstPage">
        <a-icon type="step-backward" />
      </div>
      <div class="btn-item" @click="prev">
        <a-icon type="caret-left" />
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
      <div class="btn-item" @click="next">
        <a-icon type="caret-right" />
      </div>
      <div class="btn-item" style="border-right: none" @click="lastPage">
        <a-icon type="step-forward" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CPage',
  props: {
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
  computed: {
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize)
      return allPage === 0 ? 1 : allPage
    },
  },
  methods: {
    changePage(page) {
      if (this.currentPage != page) {
        const pageSize = this.currentPageSize
        this.currentPage = page
        this.$emit('change', page, pageSize)
      }
    },
    prev() {
      const current = this.currentPage
      if (current <= 1) {
        return false
      }
      this.changePage(current - 1)
    },
    next() {
      const current = this.currentPage
      if (current >= this.allPages) {
        return false
      }
      this.changePage(current + 1)
    },
    firstPage() {
      this.changePage(1)
    },
    lastPage() {
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
<style>
.dropdownc .ant-dropdown-menu-item:hover {
   background-color: #0048ff !important;
   color: #fff;
}
</style>
<style lang="less">
.cpage-wrap {
  display: flex;
  align-items: center;
}
.cpage-pagesize {
  display: flex;
  margin-right: 24px;
  .sizelink {
    color: #646464;
  }
  .unit {
    display: inline-block;
    padding-left: 6px;
    color: #969696;
    font-size: 14px;
  }
}

.cpage-btn {
  display: flex;
  align-items: i;
  border: 1px solid #d1dae3;
  color: #646464;
  border-radius: 4px;
  overflow: hidden;
  .btn-item {
    height: 32px;
    width: 32px;
    line-height: 32px;
    text-align: center;
    border-right: 1px solid #d1dae3;
    background: #f7f9fc;
    cursor: pointer;
    &:hover {
      color: #0048ff;
    }
  }
  .input-wrap {
    border: none;
    outline: none;
    width: 48px;
    height: 32px;
    border-right: 1px solid #d1dae3;
    text-align: center;
    line-height: 32px;
  }
  .btn-total-num {
    width: 48px;
    &:hover {
      color: #646464;
    }
  }
}
</style>