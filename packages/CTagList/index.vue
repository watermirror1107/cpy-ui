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
    filterColumns: {
      default: () => [],
      type: Array
    },
    tagFilterArr: {//不显示
      default: () => [],
      type: Array
    }
  },
  methods:{
    pushTag(h, {content, title, key,canClearTag,selectColumn}){
      let tagChildren = []
      tagChildren.push(h('span', {style: {marginRight: '16px'}}, (title||'queryName') + ':'))
      tagChildren.push(h('span', content))
      //删除按钮
      if(canClearTag===undefined||canClearTag){
        tagChildren.push(h(Icon, {
          props: {name: 'icon-chuangjianshili_guanbi'},
          nativeOn: {
            click: () => {
              this.$emit('close',key,selectColumn)
            }
          }
        }))
      }
      return tagChildren
    }
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
      let selectColumn = this.filterColumns.find(i => ((i.selectKeys&&i.selectKeys.includes(key)) || i.searchKey === key||i.key === key))
      let content = '';
      let title = '搜索';
      let isVisible=false;
      if (selectColumn) {//在列数据里面的
        title=selectColumn.title
        //内容 
        //如果不是input类型 
        if(selectColumn.searchType!=='input'){
          // console.log(selectColumn.options)
          if (this.formData[key] instanceof Array) {
            let options= selectColumn.options.filter(i=>this.formData[key].includes(i.id)).map(i=>i.name)
            content = options.join(' | ')
            isVisible=this.formData[key].length>0
          } else { 
            if(selectColumn.selectKeys){
              if(selectColumn.selectKeys.indexOf(key)!==(selectColumn.selectKeys.length-1)){
                  filterContent(selectColumn.options,this.formData[key]);
                  content = ''
                  isVisible = false
                }else{ 
                  filterContent(selectColumn.options,this.formData[key])
                  content = cascaderName.join('-');
                  isVisible = cascaderName.length>1 
                }
            }else{
              content = selectColumn.options.find(i => i.id == this.formData[key])?.name
              isVisible=(!!this.formData[key]) && this.formData[key] !== ''
            }
          }
        }else{
          content =this.formData[key]
          isVisible=(!!this.formData[key]) && this.formData[key] !== ''
        }
      }else{//不在列数据里面的
        //queryName
        content=this.formData.queryName
        isVisible=this.formData.queryName!==''&&Boolean(this.formData.queryName)
      }
      children.push(h(Tag, {
        props: {
          closable: true,
          visible: isVisible
        }
      }, this.pushTag(h, {content, title,key,canClearTag:selectColumn?.canClearTag,selectColumn:selectColumn})))
    })
    return h('ul', {
      class: 'c_tag_list',
    }, children)
  }
}
</script>

<style lang="less">
.c_tag_list {
  margin-bottom: 0!important;
  &:after {
    clear: both;
    content: '';
    display: block;
  }

  .ant-tag {
    background-color: #F7F9FC;
    height: 32px;
    padding: 0 9px;
    font-size: 14px;
    line-height: 32px;
    color: #646464;
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
