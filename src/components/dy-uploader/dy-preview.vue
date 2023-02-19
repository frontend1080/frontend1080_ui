<template>
  <div class="preview-container" :style="computedStyle">
    <img :src="params.url" ref="previewImage" @load="loadImage" alt="">
    <span class="close-btn" @click="close">
        <dy-icon name="icon-test44"></dy-icon>
    </span>
  </div>
</template>

<script>
import dyIcon from '../dy-icon/dy-icon.vue'
export default {
  components: { dyIcon },
  props: {
    params: Object
  },
  data () {
    return {
      computedStyle: null
    }
  },
  methods: {
    loadImage () {
      if (this.$el.offsetHeight >= document.documentElement.clientHeight) {
        this.computedStyle = {
          height: document.documentElement.clientHeight - 100 + 'px',
          overflow: 'auto'
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
@import "./dy-uploader.less";
</style>
