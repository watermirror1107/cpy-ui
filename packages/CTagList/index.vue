<script>
import {Tag} from 'ant-design-vue'
import Icon from "../CIcon/index.vue";

export default {
  name: "CTagList",
  props: {
    formData: {
      default: () => {
      },
      type: Object
    },
    formOptions: {
      default: () => [],
      type: Array
    },
    tagFilterArr: {//不显示
      default: () => [],
      type: Array
    }
  },
  model: {
    event: 'change',
    prop: 'formData'
  },
  render(h, context) {
    let keys = Object.keys(this.formData).filter(i => !this.tagFilterArr.includes(i))
    let children =[];
    let cascaderName = [];
    let filterContent = (options,value)=>{
      options.forEach(item=>{
        if(item.value==value){
          if(cascaderName.indexOf(item.label)<0){
            cascaderName.push(item.label)
          } 
        }
        if(item.children&&Array.isArray(item.children)){
          filterContent(item.children,value)
        } 
      })
    }
    keys.forEach(key => {
      let tagChildren = []
      let selectItem = this.formOptions.find(i => ((i.selectKeys&&i.selectKeys.includes(key)) || i.selectKey === key||i.key === key))
      if (selectItem) {
        //name
        tagChildren.push(h('span', {style: {marginRight: '16px'}}, selectItem?.title + ':'))
        //内容
        let content = '';
        let isVisible=false;
        if (this.formData[key] instanceof Array) {
          if(selectItem.selectKeys){  
            let options= selectItem.options.filter(i=>{
              return this.formData[key].includes(key+'-'+i[key])
            }).map(i=>i[key.slice(0,key.length-2)+'Name'])
            content = options.join(' | ')
            isVisible=this.formData[key].length>0 
          }else{
            let options= selectItem.options.filter(i=>this.formData[key].includes(i.id)).map(i=>i.name)
            content = options.join(' | ')
            isVisible=this.formData[key].length>0
          }
           
        } else { 
          //单选多选options数据需要带前缀区分，第三级单选不用 eg: cityId:'cityId-111',cityId:'111'
          if(selectItem.selectKeys){
            if(selectItem.mode=="cascader"){
              if(selectItem.selectKeys.indexOf(key)!==(selectItem.selectKeys.length-1)){
                filterContent(selectItem.options,this.formData[key]);
                content = ''  
                isVisible=false
              }else{
                filterContent(selectItem.options,this.formData[key])
                content = cascaderName.join('-')
                isVisible= cascaderName.length>1 
              }
            }else{
              content = selectItem.options.find(i => (key+'-'+i[key]) == this.formData[key])?.[key.slice(0,key.length-2)+'Name']
              isVisible=(!!this.formData[key]) && this.formData[key] !== ''
            } 
          }else{  
            content = selectItem.options.find(i => i.id == this.formData[key])?.name
            isVisible=(!!this.formData[key]) && this.formData[key] !== ''
          }  
        }
        tagChildren.push(h('span', content)) 
        //删除按钮
        tagChildren.push(h(Icon, { 
          props: {name: 'icon-chuangjianshili_guanbi'},
          nativeOn: {
            click: () => {
              if (this.formData[key] instanceof Array) {
                this.formData[key] = []
              } else {
                if(selectItem.mode==='cascader'){
                  selectItem.selectKeys.forEach(item=>{
                    this.formData[item] = undefined
                  })
                }else{
                  this.formData[key] = undefined
                } 
              }
              this.$emit('close')
            }
          }
        }))
        children.push(h(Tag, {
          props: {
            closable: true,
            visible: isVisible
          }
        }, tagChildren))
      }
    })
    return h('ul', {
      class: 'c_tag_list',
    }, children)
  }
}
</script>

<style lang="less">
.c_tag_list {
  .clear_both();

  .ant-tag {
    background-color: @--cpy-gray-1;
    height: 32px;
    padding: 0 9px;
    font-size: 14px;
    line-height: 32px;
    color: @--cpy-gray-4;
    border: unset;
    float: left;

    .c_icon {
      vertical-align: -3px;
      margin-left: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    .anticon-close {
      display: none;
    }
  }
}
</style>
