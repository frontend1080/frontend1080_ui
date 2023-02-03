<template>
  <div id="app">
   <h2>这是app根组件</h2>
   <button @click="showMessage">点击我</button>
   <button @click="showMessage1">点击我</button>
   <dy-icon name="icon-test44"></dy-icon>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    showMessage () {
      this.$message({
        message: '我是一个message 消息提示',
        duration: 3000,
        autoClose: false,
        position: 'right',
        type: 'success'
      })
    },
    showMessage1 () {
      this.$message({
        message: '我是一个message 消息提示',
        duration: 3000,
        autoClose: false,
        position: 'center',
        type: 'info'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
