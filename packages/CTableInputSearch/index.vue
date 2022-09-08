<template>
  <div class="wrap">
    <!--    todo 指令式点击外面关闭select-->
    <icon name="icon-shili_shousuo"/>
    <div class="input">
      <!--    todo 展示选择的searchKey-->
      <p v-show="searchKey">{{ columns.find(i => i.searchKey === searchKey || i.key === searchKey).title }}:</p>
      <input ref="input"
             placeholder="多个关键字用竖线“丨”分隔，多个过滤标签"
             v-model="inputValue"
             type="text"
             @click="showSearchKeySelect"
             @input="handleInput"
             @keydown.enter="search">
      <!--      todo 编写一个自己的下拉框-->
      <ul v-show="isShowSearchKey"
          class="input_searchKey_select"
          @change="isShowSearchKey=false"
          :style="{top:selectTop+'px',left:selectLeft+'px'}">
        <!--        todo 过滤已经选择过的 即formData中有值-->
        <li>{选择资源属性进行过滤</li>
        <li v-for="item in getOptions"
            @click="selectSearchKey(item.key)"
            :key="item.key"
            :title="item.title"
            :value="item.key">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <icon v-show="isShowDeleteIcon" name="icon-chuangjianshili_guanbi" class="deleteIcon"/>
  </div>
</template>

<script>
import TagList from "../CTagList";
import Icon from '../CIcon'
import {objectValueIsEmpty} from '../../utils/index'

export default {
  name: "index",
  model: {
    props: 'formData',
    event: 'change'
  },
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    formData: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    Icon,
    TagList
  },
  data() {
    return {
      selectTop: 0,
      selectLeft: 0,
      searchKey: undefined,//没有默认queryName
      inputValue: '',
      isShowSearchKey: false
    }
  },
  computed: {
    /**
     * @description:是过滤条件的key值不为空时候展示删除按钮
     */
    isShowDeleteIcon() {
      let obj = {}
      this.getOptions.forEach(item => {//过滤掉不是用在表格过滤条件，但是又是表格过滤条件中必要的过滤条件
        obj[item.searchKey || item.key] = this.formData[item.searchKey || item.key]
      })
      return !objectValueIsEmpty(obj)
    },
    /**
     * @description:获取可用过滤的条件
     */
    getOptions() {
      return this.columns.filter(i => i.searchType)
    }
  },
  methods: {
    /**
     * @description:过滤掉已经有值的searchKey
     */
    filterSearchKey() {

    },
    /**
     * @description:展示searchKey的select,并且定位到当前input下面
     */
    showSearchKeySelect() {
      if (this.isShowSearchKey) return false
      this.isShowSearchKey = true;
      this.searchKey = undefined;
      this.selectTop = this.$refs.input.offsetTop + 45
      this.selectLeft = this.$refs.input.offsetLeft
    },
    handleInput() {
      if (!this.isShowSearchKey) return false
      //todo 如果过滤类型是select的时候输入不关闭select
      this.isShowSearchKey = false
    },
    /**
     * @description:选择searchKey
     */
    selectSearchKey(key) {
      this.searchKey = key
      this.isShowSearchKey = false
      //todo 没有再次获取到Input焦点
    },
    search() {
      //todo
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  padding: 0 8px;

  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border: 1px solid #CCD1DF;
  background-color: #fff;
  border-radius: 4px;

  &:hover {
    border-color: #216CFD;
  }

  > .c_icon {
    margin-right: 8px;
  }

  .input {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    >p{
      height: 38px;
      line-height: 38px;
      margin-bottom: 0;
    }
    &_searchKey_select {
      width: 200px;
      padding: 8px;
      position: absolute;
      z-index: 99999999999;
      margin-bottom: 0;
      background-color: #fff;

      li {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        height: 32px;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        margin-bottom: 8px;
        padding: 0 8px;
      }

      li:first-child {
        color: #C8C8C8;
      }

      li:nth-child(n+2) {
        cursor: pointer;

        &:hover {
          background-color: #F1F2F6;
        }
      }

      li:last-child {
        margin-bottom: 0;
      }
    }

    > input {
      min-width: 100px;
      flex: 1;
      height: 38px;
      line-height: 38px;
      border: unset;
      outline: none;
    }
  }

  .deleteIcon {
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
