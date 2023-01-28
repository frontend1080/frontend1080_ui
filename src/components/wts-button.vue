<template>

  <button :style="{color:color,'background-color':bgcolor}">

    <slot>默认</slot>
  </button>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'wts-button',
  props: {

    color: {
      default: 'red'
    },
    bgcolor: {
      default: 'orange'

    }
  }
}
</script>

<style lang="less" scoped>
button {
  widows: 100px;
  height: 50px;
}

</style>
