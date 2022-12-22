<template>
  <div class="c_table_filter" :style="{width:width+'px'}">
    <template v-if="mode==='tree'">
      <a-input v-model="searchName" :placeholder="$T('alarm.Pleaseenterakeywordtosearch')" @change="inputSearch">
        <a-icon slot="prefix" type="search"/>
      </a-input>
      <div class="c_table_filter_tree">
        <!-- 组件内只显示两级，更多级在expand组件中可做递归组件 -->
        <div v-if="!empty" class="c_table_filter_all" :class="{'c_table_filter_all_active':selectId==''}"
             @click="changeSelect({name:$T('instance.All'),id:''})">
          <span>{{ $T('instance.All') }}</span>
          <c-icon v-show="selectId==''" class="c_table_filter_all_icon" style="font-size:10px"
                  name="icon-xuanxiangka_gou"/>
        </div>
        <template v-for="(item,index) in treeData">
          <div class="c_table_filter_tree_group" v-if="item.showSearch" :key="index">
            <div class="c_table_filter_tree_group_title" @click="expandNextChildren(item)">
                        <span>
                            {{ item.name }}({{ item.children ? item.children.length : 0 }})
                            <c-icon v-if="isHasChild(item)"
                                    :style="{transform:item.nextShow?'rotate(180deg)':'rotate(0deg)'}"
                                    style="font-size:9px;margin-left:5px;transform: rotate(180deg)"
                                    name="icon-xialakuang_jiantou"/>
                        </span>
            </div>
            <template v-if="item.children&&item.children.length>0&&item.nextShow">
              <div @click="changeSelect(childItem)"
                   :class="{'c_table_filter_tree_group_item_active':(isMultiple?ArrayContain(selectId,childItem.id):(selectId==childItem.id))}"
                   class="c_table_filter_tree_group_item"
                   v-for="(childItem,childIndex) in item.children" :key="childItem.id+childIndex">
                <span>{{ childItem.name }}</span>
                <c-icon v-show="isHasChild(childItem)" class="c_table_filter_tree_group_item_icon" name="icon-fanhui"
                        style="transform: rotate(180deg)"/>
                <c-icon
                    v-show="!isHasChild(childItem)&&(isMultiple?ArrayContain(selectId,childItem.id):(selectId==childItem.id))"
                    class="c_table_filter_tree_group_item_icon" style="font-size:10px" name="icon-xuanxiangka_gou"/>
                <template v-if="isHasChild(childItem)&&childItem.showChildren">
                  <CTableFilterExpand :isMultiple="isMultiple" v-model="selectId" :options="childItem.children"
                                      :width="width" :extraRight="10"/>
                </template>
              </div>
            </template>
          </div>
        </template>
        <template v-if="empty">
          <a-empty :image="singleImage" description="暂无数据"/>
        </template>
      </div>
    </template>
    <template v-else-if="mode==='cascader'">
      <div style="position:relative" class="c_table_filter_cascader">
       <a-cascader v-model="selectId" :getPopupContainer="(triggerNode)=>triggerNode.parentNode"  :popupVisible="true" ref="cascader" autoFocus :options="optionsData" @change="cascaderChange" >
       </a-cascader>
      </div>
    </template>
    <template v-else>
      <div style="padding: 8px;">
        <template v-if="isMultiple">
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            全选
          </a-checkbox>
          <a-checkbox-group v-model="selectId"
                            @change="onChange">
            <a-checkbox v-for="item in optionsData"
                        :key="item.id"
                        class="c_table_filter_checkbox"
                        :disabled="item.disabled"
                        :value="item.id">
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </template>
        <template v-else>
          <div v-if="!empty" class="c_table_filter_all" :class="{'c_table_filter_all_active':selectId===''}"
               @click="changeSelect({name:$T('instance.All'),id:''})">
            <span>{{ $T('instance.All') }}</span>
            <c-icon v-show="selectId===''" class="c_table_filter_all_icon" style="font-size:10px"
                    name="icon-xuanxiangka_gou"/>
          </div>
          <div @click="changeSelect(item)"
               :class="{'c_table_filter_item_active':(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))}"
               class="c_table_filter_item" v-for="(item,index) in optionsData" :key="index">
            <span>{{ item.name }}</span>
            <c-icon v-show="(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))" name="icon-xuanxiangka_gou"
                    style="font-size:10px"/>
          </div>
        </template>
      </div>
    </template>
    <div v-if="isMultiple">
      <a-divider style="margin: 4px 0"/>
      <div
          style="
                padding: 7px 8px;
                display: flex;
                justify-content: space-around;
              "
          @mousedown="(e) => e.preventDefault()"
      >
        <a-button
            type="primary"
            ghost
            @click="cancelSelect"
        >
          取消
        </a-button>
        <a-button
            type="primary"
            @click="selectId&&$emit('confirm',selectId)
                ">
          确定
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import cIcon from "../CIcon/index.vue";
import CTableFilterExpand from "./CTableFilterExpand.vue"
import {Empty} from 'ant-design-vue'
export default {
  name: "CTableFilter",
  components: {cIcon, CTableFilterExpand},
  props: {
    value: {type: [String, Number, Array]},
    mode: {type: String, default: "normal"}, // tree 代表树形结构 normal 代表单级数据结构
    isMultiple: {type: Boolean, default: false}, //是否支持多选
    width: {type: Number, default: 200},
    column:{type:Object,default:()=>{
      return {}
    }},

    options: {
      type: Array, default: () => {
        return []
      }
    }
  },
  beforeMount() {
    if (!this.$T) {
      this.$T = this.translateText;
    }
    this.initOptions();
    if (this.isMultiple) {
      this.selectId = Array.isArray(this.value) ? JSON.parse(JSON.stringify(this.value)) : []//引用类型的值需要深拷贝
    } else { 
      this.selectId = this.value || '';//普通类型的值不需要深拷贝
    }
  },
  watch: {
    options: {
      handler() {
        this.initOptions();
      },
      deep: true
    },
    value: {
      handler(nv) {
        this.selectId = nv;
        if (this.isMultiple && this.mode !== 'tree') {
          this.checkAll = this.selectId.length === this.optionsData.length
          this.indeterminate = !!this.selectId.length && this.selectId.length < this.optionsData.length//todo
        }
      },
    },
  },
  data() {
    return {
      searchName: '',
      singleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      selectId: null,
      empty: false,
      indeterminate: false,
      checkAll: false,
      optionsData: [],
      treeData: []
    }
  },
  methods: {
    /**
     * @description:取消选择,清空已选项
     */
    cancelSelect() {
      this.$emit('cancel')
    },
    /**
     * @description:checkbox的change回调
     */
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.optionsData.length
      this.checkAll = checkedList.length === this.optionsData.length;
    },
    /**
     * @description:多选下拉框的全选
     */
    onCheckAllChange(e) {
      Object.assign(this, {
        selectId: e.target.checked ? this.optionsData.map(item => item.id) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        "instance.All": "全部",
        'alarm.Pleaseenterakeywordtosearch': '请输入关键字搜索'
      };
      return textObj[code] || code;
    },
    ArrayContain(arr, value) {
      if (Array.isArray(arr) && arr.indexOf(value) > -1) {
        return true;
      }
      return false
    },
    ArrayContainIndex(arr, value) {
      return arr.indexOf(value)
    },
    initOptions() {
      if (this.mode === 'tree') {
        this.treeData = this.options;
        this.treeData.forEach(item => {
          this.$set(item, 'showSearch', true);
          this.$set(item, 'nextShow', true);
        })
      } else {
        this.optionsData = this.options;
      }
    },
    isHasChild(childItem) {
      if (childItem.children && childItem.children.length > 0) {
        return true
      }
      return false
    },
    cascaderChange(val){
      this.selectId = val
      this.$emit('confirm', this.selectId);
    },
    //选中
    changeSelect(item) {
      if (this.isHasChild(item)) {
        this.closeChildren();
        this.expandChildren(item)
      } else {
        if (this.mode === 'tree') {
          this.closeChildren()
        }
        if (this.isMultiple) {
          if (this.ArrayContain(this.selectId, item.id)) {
            this.selectId.splice(this.ArrayContainIndex(this.selectId, item.id), 1)
          } else {
            this.selectId.push(item.id);
          }
        } else {
          this.selectId = item.id
          if (this.selectId != undefined)   {
            this.$emit('confirm', this.selectId);
          }
        }
      }
    },
    //关闭其他菜单
    closeChildren() {
      this.treeData.forEach(item => {
        if (this.isHasChild(item)) {
          item.children.forEach(childItem => {
            this.$set(childItem, 'showChildren', false)
          })
        }
      })
    },
    //操作下级展开
    expandNextChildren(item) {
      this.$set(item, 'nextShow', !item.nextShow)
    },
    //展开更多级菜单
    expandChildren(childItem) {
      if (this.isHasChild(childItem)) {
        this.$set(childItem, 'showChildren', true)
      }
    },
    //搜索
    inputSearch(e) {
      if (this.searchName) {
        this.treeData.forEach(item => {
          if (item.name == this.searchName || item.name.indexOf(this.searchName) > -1) {
            this.$set(item, 'showSearch', true)
            console.log('parent', item.name)
          } else if (this.isHasChild(item)) {
            let flag = false
            item.children.forEach(childItem => {
              if (childItem.name == this.searchName || childItem.name.indexOf(this.searchName) > -1) {
                console.log('child', childItem.name)
                this.$set(item, 'showSearch', true)
                flag = true;
              }
            })
            if (!flag) {
              this.$set(item, 'showSearch', false)
            }
          } else {
            this.$set(item, 'showSearch', false)
          }
        });
        let count = 0;
        this.treeData.forEach(item => {
          if (item.showSearch == false) {
            count++;
          }
        })
        if (count == this.treeData.length) {
          this.empty = true;
        } else {
          this.empty = false;
        }
      } else {
        this.treeData.forEach(item => {
          this.$set(item, 'showSearch', true)
        });
        this.empty = false;
      }
    }
  }
}
</script>

<style lang="less">
.c_table_filter {
  background: #FFFFFF;
  border-radius: 4px;

  &_cascader{
    .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled), .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover{
      background: #f7f9fc;
      color: #0048ff!important;
      font-weight: normal;
      position: relative;
      // &::after{
      //   display: inline-block;
      //   content: '✓';
      //   // right: 0px; 
      //   margin-left: 10px;
      //   width: 10px;
      //   text-align: center; 
      //   height: 10px;
      //   line-height: 10px;
      //   color: #0048ff;
      //   transform: rotate(16deg);
      // }
    }
    .ant-cascader-menu-item-expand{
      &::after{
        display: none!important;
      }
    }
  }

  .ant-cascader-menu-item{
    color: #000000a6!important;
    min-width: 200px;
    text-align: left;
  }
  .ant-cascader-picker{
   display: none;
  }
  .ant-cascader-menus{
    left: 50%!important;
    top: 0px!important;
  }


  .ant-checkbox-group {
    width: 100%;
  }

  .ant-checkbox-wrapper {
    display: flex;
    line-height: 12px;
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;

    &:hover {
      background-color: #F1F2F6;
    }
  }

  &_all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    cursor: pointer;

    &_active {
      color: #0048ff;
      background: #F7F9FC;
    }
  }

  &_tree {
    padding: 8px;

    &_group {
      &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0px 10px;
        color: #969696;

        &:hover {
          //   color: #0048ff;
          cursor: pointer;
          background: #F7F9FC;
        }
      }

      &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0px 20px;
        position: relative;

        &_active {
          color: #0048ff;
          background: #F7F9FC;
        }

        &_icon {
          font-size: 8px;
          margin-right: -10px;
        }

        &:hover {
          color: #0048ff;
          cursor: pointer;
          background: #F7F9FC;

          .c_table_filter_expand {
            color: black;
          }
        }
      }
    }
  }

  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding: 0px 10px;

    &:hover {
      color: #0048ff;
      cursor: pointer;
      background: #F7F9FC;
    }

    &_active {
      color: #0048ff;
      background: #F7F9FC;
    }
  }
}
</style>
