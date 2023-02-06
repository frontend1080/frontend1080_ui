<template>
    <div>
     <button @click="showMessage">点击我</button>
     <button @click="showMessage1">点击我</button>
     <dy-icon name="icon-test44"></dy-icon>
    </div>
  </template>

<script>
import dyIcon from './components/dy-icon/dy-icon.vue'

export default {
  components: { dyIcon },
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
