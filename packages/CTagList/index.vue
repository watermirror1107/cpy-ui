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
    filterArr: {//不显示
      default: () => [],
      type: Array
    }
  },
  model: {
    event: 'change',
    prop: 'formData'
  },
  render(h, context) {
    let keys = Object.keys(this.formData).filter(i => !this.filterArr.includes(i))
    let children = keys.map(key => {
      let tagChildren = []
      //label
      let selectItem = this.formOptions.find(i => i.key === key)
      if (selectItem) {
        tagChildren.push(h('span', {style: {marginRight: '16px'}}, selectItem?.title + ':'))
      }
      //内容
      let content=''
      if(this.formData[key] instanceof Array){

      }else{
        content=selectItem.options.find(i=>i.value===this.formData[key]).label
      }
      tagChildren.push(h('span',content))
      //删除按钮
      tagChildren.push(h(Icon, {
        props: {name: 'icon-cipanxiangqing_bukeyong'}, nativeOn: {
          click: () => {
            if (this.formData[key] instanceof Array) {
              this.formData[key] = []
            } else {
              this.formData[key] = undefined
            }
          }
        }
      }))
      return h(Tag, {
        props: {
          closable: true,
          visible: (!!this.formData[key]) && this.formData[key] !== ''
        }
      }, tagChildren)
    })
    return h('ul', {
      class: 'c_tag_list',
    }, children)
  }
}
</script>

<style lang="less">
.c_tag_list {
  .ant-tag {
    background-color: #E6E6E6;
    height: 32px;
    padding: 0 9px;
    font-size: 14px;
    line-height: 32px;
    color: #646464;
    border: unset;

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
