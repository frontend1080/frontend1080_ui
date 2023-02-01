<template>
  <div id="app">
   <h2>这是app根组件</h2>
   <!-- 在下方可以直接使用你们开发出来的组件查看效果,例如 ：-->
   <!-- <w-header>标题</w-header>
   <w-button>好好</w-button> -->
   <button @click="showMessage">点击我</button>
   <!-- <dy-icon name="icon-test44"></dy-icon> -->
  </div>
</template>

<script>
// import dyIcon from './components/dy-icon/dy-icon.vue'

export default {
  // components: { dyIcon },
  name: 'App',
  methods: {
    showMessage () {
      this.$message({
        message: '我是一个message 消息提示'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
