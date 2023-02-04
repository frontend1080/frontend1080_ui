
<template>
  <div class="dy-uploader-wrapper">
    <div class="dy-uploader-imagelist">
        <div class="dy-uploader-container" @click="(event) => handleFileUploader(event,'click')">
            <slot name="uploader-area"></slot>
            <input type="file" class="dy-file__invisible" ref="file" @change = "(event) => handleFileUploader(event,'change')">
        </div>
    </div>
    <div>
        <slot name="tips"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dy-uploader',
  props: {
    accept: {
      type: String
    },
    size: {
      type: Number
    },
    onSuccess: Function,
    onError: Function
  },
  data () {
    return {
      Files: []
    }
  },
  methods: {
    handleFileUploader (event, type) {
      // eslint-disable-next-line prefer-const
      let handler = {
        click: () => {
          this.$refs.file.click()
        },
        change: (event) => {
          console.log(event.target.files)
          this.Files = event.target.files
        }
      }
      handler[type](event)
    }
  },
  watch: {
    Files (value) {
      // eslint-disable-next-line prefer-const
      let files = Array.from(value)
      if (files.length <= 0) return
      // eslint-disable-next-line prefer-const
      let { size, accept } = this
      if (files.some(file => file.size > size)) {
        this.onError(`超过文件最大限制${size}`)
      }
      if (files.some(file => !~accept.indexOf(file.type))) {
        this.onError(`只接受${accept}类型文件`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./dy-uploader.less";
</style>
