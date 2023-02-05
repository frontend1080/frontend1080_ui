<template>
  <div class="dy-uploader-wrapper">
    <div class="dy-uploader-imagelist">
      <ul class="preview-images-list">
        <li v-for="(file,index) in previewImages" :key="index">
          <span class="preview-delete-icon">
            <dy-icon name="icon-test" @click="previewImage(index)"></dy-icon>
            <dy-icon name="icon-test44" @click="remove(index)"></dy-icon>
          </span>
          <img :src="file.url" alt="">
        </li>
      </ul>
        <div
        class="dy-uploader-container"
        @click="(event) => handleFileUploader(event,'click')"
        >
            <slot name="uploader-area"></slot>
            <input
            type="file"
            class="dy-file__invisible"
            ref="file"
            @change = "(event) => handleFileUploader(event,'change')">
        </div>
    </div>
    <div>
        <slot name="tips"></slot>
    </div>
  </div>
</template>

<script>
import dyIcon from '../dy-icon/dy-icon.vue'
export default {
  components: { dyIcon },
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
      Files: [],
      tempImages: [],
      previewImages: []
    }
  },
  methods: {
    handleFileUploader (event, type) {
      // eslint-disable-next-line prefer-const
      let handler = {
        click: () => {
          this.$refs.file.value = ''
          this.$refs.file.click()
        },
        change: (event) => {
          console.log(event.target.files)
          this.Files = event.target.files
        }
      }
      handler[type](event)
    },
    handleImages (files) {
      console.log('window.URL', window.URL)
      console.log('window.URL.createObjectURL', window.URL.createObjectURL)
      if (window.URL && window.URL.createObjectURL) {
        this.createObjectURL(files)
        console.log(this.tempImages)
      } else {
        this.createBase64Image(files)
      }
    },
    createObjectURL (files) {
      // eslint-disable-next-line prefer-const
      let filesArray = files.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }))
      this.tempImages = filesArray
    },
    createBase64Image (files) {
      const handleFile = function (file) {
        return new Promise((resolve, reject) => {
          // eslint-disable-next-line prefer-const
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = e => {
            resolve(e.target.result)
          }
          // eslint-disable-next-line node/handle-callback-err
          reader.onerror = error => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('文件读取失败').catch((e) => {})
          }
        })
      }
      // eslint-disable-next-line prefer-const
      let filesPromises = files.map(handleFile)
      Promise.all(filesPromises).then(results => {
        this.tempImages = results.map((res, index) => {
          return {
            url: res,
            file: files[index]
          }
        })
      })
    },
    remove (index) {
      this.previewImages.splice(index, 1)
    },
    previewImage (index) {
      console.log(index)
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
        this.onError(`超过文件最大限制${size}k`)
      }
      if (files.some(file => !~accept.indexOf(file.type))) {
        this.onError(`只接受${accept}类型文件`)
      }
      this.handleImages(files)
    },
    tempImages (value) {
      console.log('处理过后的image：')
      console.log(value)
      this.previewImages = [...this.previewImages, ...value]
    }

  }
}
</script>

<style lang="less" scoped>
@import "./dy-uploader.less";
</style>
