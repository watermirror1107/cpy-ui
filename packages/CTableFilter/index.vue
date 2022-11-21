<template>
  <div class="c_table_filter" :style="{width:width+'px'}">
    <template v-if="mode==='tree'">
      <!-- <div>{{selectId}}{{selectKeyType}}</div> -->
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
            <div class="c_table_filter_tree_group_title" 
                 :class="{'c_table_filter_tree_group_title_active':(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))}"
                 @click="changeSelect(item,column.selectKeys?true:false)"> 
                <span> 
                    {{ item.name }}({{ item.children ? item.children.length : 0 }})
                    <span v-if="isHasChild(item)"
                          @click.stop="expandNextChildren(item)"
                          style="height: 100%;width:30px;display: inline-block;;text-align: center;line-height: 20px;">
                    <c-icon 
                            :style="{transform:item.nextShow?'rotate(180deg)':'rotate(0deg)'}"
                            style="font-size:10px;transform: rotate(180deg)"
                            name="icon-xialakuang_jiantou"/> 
                    </span>
                </span> 
            </div>
            <template v-if="item.children&&item.children.length>0&&item.nextShow">
              <div @click="changeSelect(childItem,column.selectKeys?true:false)"
                   :class="{'c_table_filter_tree_group_item_active':(isMultiple?ArrayContain(selectId,childItem.id):(selectId==childItem.id))}"
                   class="c_table_filter_tree_group_item"
                   v-for="(childItem,childIndex) in item.children" :key="childItem.id+childIndex">
                <span>{{ childItem.name }}</span>
                <span  @click.stop="changeSelect(childItem)" v-show="isHasChild(childItem)" style="margin-right:-13px;height: 100%;width:30px;display: flex;justify-content: center;align-items: center;">
                <c-icon class="c_table_filter_tree_group_item_icon" name="icon-fanhui"
                        style="transform: rotate(180deg);font-size: 10px;margin-right: 3px;"/> 
                </span>
                <c-icon 
                    v-show="!isHasChild(childItem)&&(isMultiple?ArrayContain(selectId,childItem.id):(selectId==childItem.id))"
                    class="c_table_filter_tree_group_item_icon" style="font-size:10px" name="icon-xuanxiangka_gou"/>
                <template v-if="isHasChild(childItem)&&childItem.showChildren">
                  <CTableFilterExpand :isMultiple="isMultiple" v-model="selectId" :parentSelectKeyType.sync="selectKeyType" :options="childItem.children"
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
    <template v-if="mode==='cascader'">
      <div style="position:relative" class="c_table_filter_cascader">
       <a-cascader :getPopupContainer="(triggerNode)=>triggerNode.parentNode" :popupVisible="true" ref="cascader" autoFocus :options="optionsData" @change="cascaderChange" />
      </div>
    </template>
    <template v-else>
      <div class="c_table_filter_srcoll" style="padding: 8px 2px 8px 8px;">
        <div v-if="!empty" class="c_table_filter_all" :class="{'c_table_filter_all_active':selectId==''}"
             @click="changeSelect({name:$T('instance.All'),id:''})">
          <span>{{ $T('instance.All') }}</span>
          <c-icon v-show="selectId==''" class="c_table_filter_all_icon" style="font-size:10px"
                  name="icon-xuanxiangka_gou"/>
        </div>
        <div @click="changeSelect(item)"
             :class="{'c_table_filter_item_active':(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))}"
             class="c_table_filter_item" v-for="(item,index) in optionsData" :key="index">
          <span>{{ item.name }}</span>
          <c-icon v-show="(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))" name="icon-xuanxiangka_gou"
                  style="font-size:10px"/>
        </div> 
      </div>
    </template> 
    <div v-if="isMultiple">
      <!-- <v-nodes :vnodes="menu"/> -->
      <a-divider style="margin: 4px 0"/>
      <div
          style="
                padding: 7px 8px;
                display: flex;
                justify-content: space-between;
              "
          @mousedown="(e) => e.preventDefault()"
      >
        <c-button
            type="primary"
            @click="selectId&&$emit('confirm',selectId,selectKeyType)" 
        >
          {{ $T("instance.Confirm") }}
        </c-button>
        <c-button
            type="primary"
            ghost
            @click="$emit('restFilter')"
        >
          {{ $T("instance.Reset") }}
        </c-button>
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
    column:{type:Object,default:()=>{
      return {}
    }},
    width: {type: Number, default: 200},
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
  },
  mounted() {
    // 首次加载赋值，不需要刷新
    this.isInitTime = true
    this.initOptions();
    if (this.isMultiple) {
      this.selectId = Array.isArray(this.value) ? JSON.parse(JSON.stringify(this.value))  : []
    } else {
      this.selectId = this.value || '';
    }
    setTimeout(() => {
      this.isInitTime = false
    }, 20);
  },
  watch: {
    options: {
      handler() {
        if(!this.searchName){
          this.initOptions();
        }
      },
      deep: true
    },
    value: {
      handler(nv) {
        this.selectId = nv
      },
    },
    selectId: {
      handler(nv) {
        if (nv != undefined && !this.isMultiple && !this.isInitTime) {
          // console.log(nv,this.selectKeyType)
          this.$emit('confirm', nv,this.selectKeyType);
        }
      },
    } 
  },
  data() {
    return {
      searchName: '',
      singleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      selectId: '',
      //用来定位选择的是哪一级的数据 
      selectKeyType:'',
      empty: false,
      optionsData: [],
      treeData: []
    }
  },
  methods: {
    translateText(code) {
      //console端没有字典翻译兼容
      let textObj = {
        "instance.All": "全部",
        "instance.Confirm": "确定",
        "instance.Reset": "重置",
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
      // console.log(val)
      this.selectKeyType = undefined
      this.selectId = val
    },
    //选中  flag为true标识直接赋值 不进行下层操作
    changeSelect(item,flag = false) {  
      // debugger;
      if(flag){
        if (this.isMultiple) { 
          if (this.ArrayContain(this.selectId, item.id)) {
            this.selectId.splice(this.ArrayContainIndex(this.selectId, item.id), 1)
            if(this.selectId.length==0){
              this.selectKeyType = '';
            }
          } else {
            //只有同级，第一次才允许放置
            if(!this.selectKeyType){
              this.selectId.push(item.id);
              this.selectKeyType = item.selectKeyType
            }else if(this.selectKeyType&&this.selectKeyType==item.selectKeyType){
              this.selectId.push(item.id);
              this.selectKeyType = item.selectKeyType
            }
          } 
        } else {
          this.selectKeyType = item.selectKeyType 
          this.selectId = item.id
        }
      }else{
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
              if(this.selectId.length==0){
                this.selectKeyType = '';
              }
            } else {
              //只有同级，第一次才允许放置
              if(!this.selectKeyType){
                this.selectId.push(item.id);
                this.selectKeyType = item.selectKeyType
              }else if(this.selectKeyType&&this.selectKeyType==item.selectKeyType){
                this.selectId.push(item.id);
                this.selectKeyType = item.selectKeyType
              }
            }
            
          } else {
            this.selectKeyType = item.selectKeyType
            this.selectId = item.id
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
          // console.log(item)
          // console.log(this.isHasChild(item))
          if (item.name == this.searchName || item.name.indexOf(this.searchName) > -1) {
            this.$set(item, 'showSearch', true)
            // console.log('parent', item.name)
          } else if (this.isHasChild(item)) {
            let flag = false
            item.children.forEach(childItem => {
              if (childItem.name == this.searchName || childItem.name.indexOf(this.searchName) > -1) {
                // console.log('child', childItem.name)
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

<style lang="less" scoped>

.c_table_filter_srcoll{
  max-height: 70vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 5px;
    /* 高宽分别对应横竖滚动条的尺寸 */
    height: 5px;
    border-radius: 6px;
  } 


  &::-webkit-scrollbar-thumb:vertical {
    height: 1px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    background: #c8c8c8; //@--main-blue;
  }

  &::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    background: transparent;
  }

}
.c_table_filter {
  background: #FFFFFF;
  // box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  border-radius: 4px;
  &_cascader{
    /deep/ .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled), .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover{
      background: #f7f9fc;
      color: #0048ff;
      font-weight: normal;
    }
  }

  /deep/ .ant-cascader-picker{
    display: none;
  }
  /deep/ .ant-cascader-menus{
    left: 50%!important;
    top: 0px!important;
  }


  &_all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 10px;

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
        &_active {
          color: #0048ff;
          background: #F7F9FC;
        }

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
        margin-top:5px;
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
    margin-top:5px;
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
