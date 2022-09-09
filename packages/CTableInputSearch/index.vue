<template>
  <div ref="tableInputSearch" class="tableInputSearch">
    <icon name="icon-shili_shousuo"/>
    <tag-list
        @close="refresh(true)"
        class="c_table_tags"
        v-model="formData"
        :formOptions="getFormOptions()"
    ></tag-list>
    <div class="input">
      <input ref="input"
             placeholder="多个关键字用竖线“丨”分隔，多个过滤标签"
             v-model="inputValue"
             type="text"
             @click="showSearchKeySelect"
             @input="handleInput"
             @keydown.enter="search">
      <ul v-show="isShowSearchKeySelect"
          class="input_searchKey_select"
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
    <button v-show="inputValue!==''" class="searchBtn" @click="search">
      <icon name="icon-shilixiangqing_fanhui"></icon>
    </button>
    <icon v-show="isShowDeleteIcon" name="icon-chuangjianshili_guanbi" class="deleteIcon"/>
  </div>
</template>

<script>
import TagList from "../CTagList";
import Icon from '../CIcon'
import {objectValueIsEmpty} from '../../utils/index'

export default {
  name: "index",
  inject:['refresh'],
  model: {
    props: 'formData',
    event: 'change'
  },
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
    TagList
  },
  data() {
    return {
      selectTop: 0,
      selectLeft: 0,
      searchKey: undefined,
      inputValue: '',
      isShowSearchKeySelect: false
    }
  },
  mounted() {
    document.addEventListener('click',this.closeSelect)
  },
  beforeDestroy() {
    document.removeEventListener('click',this.closeSelect)
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
    closeSelect(ev){
      let that=this
        if(!that.$refs.tableInputSearch.contains(ev.target)){
          that.isShowSearchKeySelect=false
        }
    },
    /**
     * @description:获取taglist需要的formoptions
     */
    getFormOptions() {
      return this.columns.filter((i) => i.searchType);
    },
    /**
     * @description:过滤掉已经有值的searchKey
     */
    filterSearchKey() {

    },
    /**
     * @description:展示searchKey的select,并且定位到当前input下面
     */
    showSearchKeySelect() {
      if(this.isShowSearchKeySelect )return false
      this.searchKey = undefined;
      this.isShowSearchKeySelect = true;
      //定位下拉框的位置
      this.selectTop = this.$refs.input.offsetTop + 45
      this.selectLeft = this.$refs.input.offsetLeft
    },
    handleInput() {
      //值为空让Input失去焦点
      if(!this.inputValue){
        this.$refs.input.blur();
        this.searchKey = undefined;
        this.isShowSearchKeySelect = false;
      }
      const selected = this.columns.find(i => i.searchKey === this.searchKey || i.key === this.searchKey)
      if (selected && selected.searchType === 'input' || !selected) {
        this.isShowSearchKeySelect = false
      }
    },
    /**
     * @description:选择searchKey
     */
    selectSearchKey(key) {
      this.searchKey = key
      this.isShowSearchKeySelect = false
      this.inputValue = this.columns.find(i => i.searchKey === key || i.key === key).title + ':'
      this.$refs.input.focus()
      //todo 根据不同的searchType
    },
    search() {
      this.searchKey = this.searchKey || this.defaultSearchKey
      let data = Object.assign({}, this.formData)
      data[this.searchKey] = this.inputValue
      this.inputValue=''
      this.$refs.input.blur();
      console.log('searchKey',this.searchKey)
      this.$emit('update:formData',data)
      console.log(this.formData)
    },
    /**
     * @description:分割搜索词
     */
    splitKeyword() {
      //判断是否带着:
      let arr=this.searchKey.split(':')
      if(arr.length===1){

      }else{

      }
    }
  }
}
</script>

<style lang="less">
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

    .c_icon {
      transform: rotateY(180deg);
    }
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
