<template>
  <div id="app">
   <h2>这是app根组件</h2>
   <!-- 在下方可以直接使用你们开发出来的组件查看效果,例如 ：-->
   <yft-dropDown
   :options="options"
    placehoder="-------请选择-------"
   :mutipile = "false"
   :isInput = "false"
   :cascade = "false"
   />

   <!-- <yft-avator
   :src="src"
   alt="请选择图片"
   shape="square"
   size="large"
   /> -->

  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      src: 'https://img2.baidu.com/it/u=3871150760,2588696294&fm=253&fmt=auto&app=138&f=PNG?w=256&h=256',
      options: [
        {
          label: 'Fruits',
          options: ['Apple', 'Banana', 'Mango']
        },
        {
          label: 'Vegetables',
          options: ['Carrot', 'Potato', 'Tomato']
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
