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
          let options= selectItem.options.filter(i=>this.formData[key].includes(i.id)).map(i=>i.name)
          content = options.join(' | ')
          isVisible=this.formData[key].length>0
        } else { 
          if(selectItem.selectKeys){
            content = selectItem.options.find(i => (key+'-'+i[key]) == this.formData[key])?.[key.slice(0,key.length-2)+'Name']
            isVisible=(!!this.formData[key]) && this.formData[key] !== ''
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
                this.formData[key] = undefined
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
  &:after {
    clear: both;
    content: '';
    display: block;
  }

  .ant-tag {
    background-color: #F1F3F5;
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
