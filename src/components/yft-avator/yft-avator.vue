<template>
    <div class="avator">
      <img :src="src" :alt="alt" :style="style">
    </div>
  </template>

<script>
export default {
  name: 'YftAvator',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: '请选择图片'
    },
    size: {
      type: String,
      default: 'normal'
    },
    shape: {
      type: String,
      default: 'circle'
    }
  },
  computed: {
    style () {
      let sizeValue = 50
      let borderRadius = 50
      // 修改大小
      if (this.size === 'small') {
        sizeValue = 30
      } else if (this.size === 'large') {
        sizeValue = 80
      }
      // 修改形状
      if (this.shape === 'square') {
        borderRadius = 5
      }
      return {
        width: `${sizeValue}px`,
        height: `${sizeValue}px`,
        borderRadius: `${borderRadius}px`
      }
    }
  }
}
</script>

  <style lang="less" scoped>
  .avator {
    display: inline-block;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
