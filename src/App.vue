<template>
  <div id="app">
<!--    <c-banner>123</c-banner>-->
<!--    <c-button icon="icon-jingxiang">CTMD</c-button>-->
<!--    <c-icon name="icon-shijian"></c-icon>-->
<!--    <c-card  title="giao" @more="clickMore">-->
<!--      <template #more>-->
<!--        <p style="font-size: 20px;">more</p>-->
<!--      </template>-->
<!--      adsf-->
<!--    </c-card>-->
<!--    <c-card-item :data="{title:'h1',value:'vlaue'}"></c-card-item>-->
<!--    <div style="width: 100px;margin-top: 100px;margin-left: 200px;">-->
<!--      <c-ellipsis text="test test test test test test test test test test test test test test"></c-ellipsis>-->
<!--      <c-editable-cell emptyPlaceholder="emptyPlaceholder"></c-editable-cell>-->
<!--    </div>-->
<!--  <c-input label="asdf"  v-model="text"></c-input>-->
<!--    <c-empty></c-empty>-->
<!--    <c-input-number v-model="num"></c-input-number>-->
<!--    <c-radio-group v-model="num">-->
<!--      <c-radio value="one">one</c-radio>-->
<!--      <c-radio value="two">two</c-radio>-->
<!--    </c-radio-group>-->
  </div>
</template>

<script>
export default  {

  data(){
    return{
      num:'one',
      type:1,
      text:'text'
    }
  },
  watch:{
    num(nv){
      console.log(nv)
    }
  },
  methods:{
    clickMore(){
      console.log('more')
    }
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  padding: 20px;
  margin-top: 100px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
