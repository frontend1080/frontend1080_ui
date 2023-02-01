<template>
  <div id="app">
   <h2>这是app根组件</h2>
   <!-- 在下方可以直接使用你们开发出来的组件查看效果,例如 ：-->
   <!-- <w-header>标题</w-header>
   <w-button>好好</w-button> -->
   <yft-dropDown :options="options" :selectOnly = "false"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      options: ['Option 1', 'Option 2', 'Option 3']
    }
  }
}
</script>

<style lang="less" scoped>

</style>
