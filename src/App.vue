<template>
  <div id="app">
   <h2>这是app根组件</h2>
   <button @click="showMessage">点击我</button>
   <button @click="showMessage1">点击我</button>
   <dy-icon name="icon-test44"></dy-icon>
   <!-- <div>
    <dy-uploader accept="image/png, image/jpeg" :size="150*1024" :on-success="uploadSuccess" :on-error="uploadError">
      <div class="uploader-area" slot="uploader-area">
        <dy-icon name="icon-test17"></dy-icon>
        <div class="dy-uploader--text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="dy-uploader--tip" slot="tips">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </dy-uploader>
   </div> -->
  </div>
</template>

<script>
import dyIcon from './components/dy-icon/dy-icon.vue'

export default {
  components: { dyIcon },
  name: 'App',
  methods: {
    // uploadSuccess () {

    // },
    // uploadError (msg) {
    //   this.$message({
    //     message: msg,
    //     autoClose: false,
    //     type: 'error'
    //   })
    // }
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
@import "./components/dy-uploader/dy-uploader.less";
</style>
