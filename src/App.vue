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

  </div>
</template>

<script>
export default  {
  components: {},

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
