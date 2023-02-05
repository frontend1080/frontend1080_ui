<template>
  <div id="app">
   <h2>这是app根组件</h2>
   <!-- 在下方可以直接使用你们开发出来的组件查看效果,例如 ：-->
   <!-- <w-header>标题</w-header>
   <w-button>好好</w-button> -->
   <yft-dropDown 
   :options="options"
    placehoder="-------请选择-------" 
   :mutipile = "false"
   :cascade = "false"
   />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      options: [
        {
          label: 'Fruits',
          options: ['Apple', 'Banana', 'Mango']
        },
        {
          label: 'Vegetables',
          options: ['Carrot', 'Potato', 'Tomato']
        }
      ],
    }
  }
}
</script>

<style lang="less" scoped>

</style>
