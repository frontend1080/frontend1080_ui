<template>

  <button :style="{color:color,'background-color':bgcolor}">

    <slot>默认</slot>
  </button>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'WtsButton',
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
  width: 100px;
  height: 50px;
}

</style>
