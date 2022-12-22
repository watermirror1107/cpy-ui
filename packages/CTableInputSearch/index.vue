<template>
  <div ref="tableInputSearch" class="tableInputSearch">
    <icon name="icon-shili_shousuo" style="transform: rotateY(180deg);color: #323232;"/>
    <tag-list
        @close="deleteTags"
        class="c_table_tags"
        :formData="formData"
        :filterColumns="getFilterColumns()"
    ></tag-list>
    <div class="input">
      <input ref="input"
             placeholder="输入关键字搜索"
             v-model="inputValue"
             type="text"
             @click="showSearchKeySelect"
             @input="handleInput"
             @keydown.enter="search">
      <ul v-show="isShowSearchKeySelect&&getOptions.length>0"
          class="input_searchKey_select"
          :style="{top:selectTop+'px',left:selectLeft+'px'}">
        <li>选择资源属性进行过滤</li>
        <li v-for="item in getOptions"
            @click="selectSearchKey(item.key)"
            :key="item.key"
            :title="item.title"
            :value="item.key">
          {{ item.title }}
        </li>
      </ul>
      <template v-if="isShowFilterSelect">
        <template v-if="getCurrentSearchType.searchType === 'selectMultiple'">
          <div
              class="input_searchKey_select"
              :style="{top:selectTop+'px',left:selectLeft+'px'}"
              >
            <c-table-filter :isMultiple="true" mode="tree"
                            v-if="getCurrentSearchType.filterOptionMethod&&typeof getCurrentSearchType.filterOptionMethod =='function'"
                            :value="filterValue(formData,getCurrentSearchType)"
                            :options="getCurrentSearchType.filterOptionMethod(getCurrentSearchType.options)"
                            @cancel="confirmCloseSelect"
                            @confirm="debounceFresh($event, confirmCloseSelect, getCurrentSearchType.searchKey || getCurrentSearchType.key,getCurrentSearchType)"
                            :column="getCurrentSearchType">
            </c-table-filter>
            <c-table-filter :isMultiple="true"
                            v-if="!getCurrentSearchType.filterOptionMethod"
                            :value="filterValue(formData,getCurrentSearchType)"
                            :options="getCurrentSearchType.options"
                            @cancel="confirmCloseSelect"
                            :mode="getCurrentSearchType.mode || 'normal'"
                            @confirm="debounceFresh($event, confirmCloseSelect, getCurrentSearchType.searchKey || getCurrentSearchType.key,getCurrentSearchType)"
                            :column="getCurrentSearchType"></c-table-filter>
          </div>
        </template>
        <template v-else>
          <div
              class="input_searchKey_select"
              :style="{top:selectTop+'px',left:selectLeft+'px'}"
              v-if="getCurrentSearchType.filterOptionMethod&&typeof getCurrentSearchType.filterOptionMethod =='function'">
            <c-table-filter mode="tree" 
                            :value="filterValue(formData,getCurrentSearchType)"
                            :options="getCurrentSearchType.filterOptionMethod(getCurrentSearchType.options)"
                            @confirm="debounceFresh($event, confirmCloseSelect, getCurrentSearchType.searchKey || getCurrentSearchType.key,getCurrentSearchType)"
                            :column="getCurrentSearchType">
            </c-table-filter>
          </div>
          <div
              class="input_searchKey_select"
              :style="{top:selectTop+'px',left:selectLeft+'px'}"
              v-if="!getCurrentSearchType.filterOptionMethod">
              <!-- :value="formData[getCurrentSearchType.searchKey || getCurrentSearchType.key]" -->
            <c-table-filter :value="filterValue(formData,getCurrentSearchType)"
                            :options="getCurrentSearchType.options"
                            :mode="getCurrentSearchType.mode || 'normal'"
                            @confirm="debounceFresh($event, confirmCloseSelect, getCurrentSearchType.searchKey || getCurrentSearchType.key,getCurrentSearchType)"
                            :column="getCurrentSearchType"></c-table-filter>
          </div>
        </template>
      </template>
    </div>
    <a-popover  overlayClassName="inputClearTip" placement="top">
      <p slot="content" class="content_text">清空</p>
      <icon v-show="isShowDeleteIcon" name="icon-chuangjianshili_guanbi" class="deleteIcon"
            @click.native="clearFormData"/>
    </a-popover>
    <a-popover  overlayClassName="inputClearTip" placement="top">
      <p slot="content" class="content_text">搜索</p>
      <button v-show="inputValue!==''" class="searchBtn" @click="search">
        <icon name="icon-jiantou"></icon>
      </button>
    </a-popover>
  </div>
</template>

<script>
import TagList from "../CTagList";
import Icon from '../CIcon'
import CTableFilter from '../CTableFilter/index.vue';
import {objectValueIsEmpty} from '../../utils/index'

export default {
  name: "index",
  inject: ['refresh', 'debounceFresh','resetFilter'], 
  props: {
    defaultSearchKey: {
      default: 'queryName',
      type: String
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Icon,
    CTableFilter,
    TagList
  },
  data() {
    return {
      selectTop: 0,
      selectLeft: 0,
      searchKey: undefined,
      inputValue: '',
      isShowSearchKeySelect: false,
      isShowFilterSelect: false
    }
  },
  mounted() {
    document.addEventListener('click', this.closeSelect)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeSelect)
  },
  computed: {
    /**
     * @description:是过滤条件的key值不为空时候展示删除按钮
     */
    isShowDeleteIcon() {
      let obj = {queryName: this.formData.queryName}
      this.columns.filter(i => i.searchType).forEach(item => {//过滤掉不是用在表格过滤条件，但是又是表格过滤条件中必要的过滤条件
        obj[item.searchKey || item.key] = this.formData[item.searchKey || item.key]
      })
      return !objectValueIsEmpty(obj)
    },
    /**
     * @description:获取可用过滤的条件,包括已经使用过的
     */
    getOptions() {
      return this.columns.filter(i => {
        const {searchType, searchKey, key} = i
        if (searchType) {
          if (this.formData[searchKey || key] instanceof Array && this.formData[searchKey || key].length === 0) {
            return true
          }
          if (!this.formData[searchKey || key]) {
            return true
          }
        }
      })
    },
    /**
     * @description:获取当前输入的类型是不是input
     */
    getCurrentSearchType() {
      return this.columns.find(i => i.searchKey === this.searchKey || i.key === this.searchKey) || null
    }
  },
  methods: {
    /**
    * @description:确认关闭弹窗
    */
    confirmCloseSelect(){
      // let data = Object.assign({}, this.formData)
      // data[this.searchKey] =
      this.inputValue=''
      this.searchKey=undefined;
      this.isShowFilterSelect=false;
    },
    /**
    * @description:点击判断是否关闭弹窗
    */
    closeSelect(ev) {
      let that = this
      if (!that.$refs.tableInputSearch.contains(ev.target)) {
        that.isShowSearchKeySelect = false
        that.isShowFilterSelect = false
        that.inputValue=''
        that.searchKey=undefined
      }
    },
    /**
     * @description:获取taglist需要的formoptions
     */
    getFilterColumns() {
      return this.columns.filter((i) => i.searchType);
    },
    /**
     * @description:展示searchKey的select,并且定位到当前input下面
     */
    showSearchKeySelect() {
      if (this.isShowSearchKeySelect || this.searchKey) return false
      this.searchKey = undefined;
      this.isShowSearchKeySelect = true;
      //定位下拉框的位置
      this.selectTop = this.$refs.input.offsetTop + 45
      this.selectLeft = this.$refs.input.offsetLeft
    },
    handleInput() {
      //值为空并且是选择了searchKey的时候让Input失去焦点 参考kcp
      if (!this.inputValue&&this.searchKey) {
        this.$refs.input.blur();
        this.searchKey = undefined;
        this.isShowSearchKeySelect = false;
      }
      const selected = this.getCurrentSearchType
      //如果是input类型输入时候要隐藏下拉框，包括queryName
      if (selected && selected.searchType === 'input' || !selected) {
        this.isShowSearchKeySelect = false
      }
    },
    filterValue(value,column){ 
      let temp = '';
      if(column.mode=='cascader'){
        temp = []; 
        column.selectKeys.forEach(item=>{ 
           temp.push(value[item]) // eg:cityId-1 regionId-1
        })
        if(temp.length==2&&(temp[0]=='' || temp[0]==undefined)&&(temp[1]=='' || temp[1]==undefined)){
          temp = ['']
        }
      }else{
        temp = value[column.searchKey || column.key] || ''
      }
      return temp;
    },
    /**
     * @description:选择searchKey
     */
    selectSearchKey(key) {
      this.searchKey = key
      this.isShowSearchKeySelect = false
      this.inputValue = this.columns.find(i => i.searchKey === key || i.key === key).title + ':'
      this.$refs.input.focus()
      if (this.getCurrentSearchType.searchType !== 'input') {
        this.isShowFilterSelect = true;
      }
    },
    search() {
      //不是输入框类型并且不是queryName的不触发
      this.searchKey = this.searchKey || this.defaultSearchKey
      if (this.getCurrentSearchType?.searchType === 'input' || this.searchKey === 'queryName') {
        if (this.inputValue !== '') {
          let data = Object.assign({}, this.formData)
          data[this.searchKey] = this.splitKeyword()
          this.inputValue = ''
          this.$refs.input.blur();
          this.searchKey = undefined
          this.$emit('update:formData', data)
          this.refresh(true)
        }
      }
    },
    /**
    * @description:删除标签
    */
    deleteTags(key,column){ 
      // if(this.searchKey===key){ //todo
      //   this.isShowFilterSelect=false
      //   this.inputValue=''
      // }
      let data = Object.assign({}, this.formData)
      if(column.selectKeys&&Array.isArray(column.selectKeys)){ 
        column.selectKeys.forEach(item=>{
          data[item] = undefined
        }) 
      }
      data[key] = data[key] instanceof Array?[]:undefined
      this.$emit('update:formData', data)
      this.refresh(true)
    },
    /**
     * @description:分割搜索词
     */
    splitKeyword() {
      //判断是否带着:
      let arr = this.inputValue.split(':')
      if (arr.length === 1) {
        return arr[0]
      } else {
        return arr[1]
      }
    },
    /**
     * @description:清空所有过滤条件
     */
    clearFormData() {
      let data = Object.assign({}, this.formData)
      for (const key in data) {
        if (data[key] instanceof Array) {
          data[key] = []
        } else {
          data[key] = undefined
        }
      }
      this.searchKey = undefined
      this.inputValue = ''
      this.$emit('update:formData', data)
      this.refresh(true)
    },
  }
}
</script>

<style lang="less">
.inputClearTip{
  .ant-popover-arrow{
    display: none;
  }
  .ant-popover-inner{
    height: 0;
    >div{
      position: relative;
      top: -25px;
    }
  }
  .content_text{
    padding:5px 6px;color:#fff;background-color:rgba(0,0,0,.6);border-radius: 4px;
    margin-bottom: 0;
  }

}
.tableInputSearch {
  padding: 0 8px;
  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border: 1px solid #CCD1DF;
  background-color: #fff;
  border-radius: 4px;

  .searchBtn {
    height: 24px;
    width: 24px;
    background-color: #216CFD;
    color: #fff;
    border: unset;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

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

    > p {
      height: 38px;
      line-height: 38px;
      margin-bottom: 0;
    }

    &_searchKey_select {
      //width: 200px;
      padding: 8px;
      position: absolute;
      box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.15), 0px 4px 8px 0px rgba(0,0,0,0.1);
      border: 1px solid #CCD1DF;
      z-index: 99999999999;
      margin-bottom: 0;
      background: transparent;
      background-color: white;

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

      .ant-cascader-menus{
        left: -10px!important;
        top: -10px!important;
        .ant-cascader-menu{
          min-width: 220px;
        }
      }
    }

    > input {
      min-width: 100px;
      flex: 1;
      height: 38px;
      line-height: 38px;
      border: unset;
      outline: none;
      &::-webkit-input-placeholder{
        color: #C8C8C8;
      }
    }
  }

  .deleteIcon {
    margin: 0 10px;
    cursor: pointer;
  }
}
</style>
