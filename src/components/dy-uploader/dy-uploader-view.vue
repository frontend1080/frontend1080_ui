<template>
    <div>
     <div>
      <dy-uploader accept="image/png, image/jpeg" :size="500*1024" :multiple="true" :on-success="uploadSuccess" :on-error="uploadError">
        <div class="uploader-area" slot="uploader-area">
          <dy-icon name="icon-test17"></dy-icon>
          <div class="dy-uploader--text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <div class="dy-uploader--tip" slot="tips">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </dy-uploader>
     </div>
    </div>
  </template>

<script>
import dyIcon from './components/dy-icon/dy-icon.vue'

export default {
  components: { dyIcon },
  methods: {
    uploadSuccess () {

    },
    uploadError (msg) {
      this.$message({
        message: msg,
        autoClose: false,
        type: 'error'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./components/dy-uploader/dy-uploader.less";
</style>
