<template>
  <div class="c_table_filter_expand" :style="{'width':width+'px','right':`-${width+10+extraRight}px`}">
    <div @click.stop="changeSelect(item)" :class="{'c_table_filter_expand_item_active':(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))}" class="c_table_filter_expand_item" v-for="(item,index) in options" :key="index">
        <span>{{item.name}}</span>
        <c-icon v-show="isHasChild(item)" class="c_table_filter_expand_item_icon" name="icon-fanhui"/>
        <c-icon v-show="!isHasChild(item)&&(isMultiple?ArrayContain(selectId,item.id):(selectId==item.id))" class="c_table_filter_expand_item_icon_yes" style="font-size:10px" name="icon-xuanxiangka_gou"/>
        <template v-if="isHasChild(item)&&item.showChildren">
            <CTableFilterExpand :isMultiple="isMultiple" v-model="selectId"  :options="item.children" :width="width"/>
        </template>
    </div>
  </div>
</template>

<script>
import cIcon from "../CIcon/index.vue";
export default {
    name:'CTableFilterExpand',
    components:{cIcon},
    model: {
        event: 'change',
        prop: 'value'
    },
    props:{
      options:{
        type:Array,
        default:()=>{
            return []
        }
      },
      value:{
        type:[String,Number,Array],
      },
      width:{
        type:Number,
        default:130
      },
      extraRight:{
        type:Number,
        default:0
      },
      isMultiple:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      this.selectId = this.value;
    },
    watch:{
      value:{
        handler(nv) {
           this.selectId = this.value;
        },
      },
      selectId:{
        handler(nv) {
          if(nv!=undefined){
            this.$emit('change',this.selectId)
          }
        },
      }
    },
    data(){
        return{
          selectId:''
        }
    },
    methods:{
      ArrayContain(arr,value){
          if(Array.isArray(arr)&&arr.indexOf(value)>-1){
            return true;
          }
          return false
      },
      ArrayContainIndex(arr,value){
          return arr.indexOf(value)
      },
      isHasChild(childItem){
          if(childItem.children&&childItem.children.length>0){
              return true
          }
          return false
      },
      changeSelect(item){
        if(this.isHasChild(item)){
          this.$set(item,'showChildren',true)
        }else{
          if(this.isMultiple){
            if(this.ArrayContain(this.selectId,item.id)){
              this.selectId.splice(this.ArrayContainIndex(this.selectId,item.id),1)
            }else{
              this.selectId.push(item.id);
            }
          }else{
            this.selectId = item.id
          }
        }
      }
    }
}
</script>

<style lang="less">
.c_table_filter_expand{
  position: absolute;
  top: 0px;
  padding: 8px;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  border-radius: 4px;
  &_item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      padding: 0px 10px;
      &:not(:first-child){
        margin-top:8px;
      }
      
       &_icon{
          font-size: 8px;
          transform: rotate(180deg);
          margin-right: -10px;
      }
      &:hover{
        color: #0048ff;
        cursor: pointer;
        background: #F7F9FC;
        .c_table_filter_expand{
          color: black;
        }
      }
      &_active{
          color: #0048ff;
          background: #F7F9FC;
      }
  }
}
</style>
