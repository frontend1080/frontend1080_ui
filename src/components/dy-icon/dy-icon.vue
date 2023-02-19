<template>
  <svg class="icon" aria-hidden="true" @click="handleClick()">
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script>
import './iconfont.js'
export default {
  name: 'DyIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    IconName () {
      return `#icon-${this.name}`
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }

}
</script>

<style type="text/css">
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
