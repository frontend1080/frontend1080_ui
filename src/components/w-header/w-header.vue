<template>
  <div class="myheader">

    <slot> header组件</slot>
  </div>
</template>

<script>
export default {
  name: 'w-header'
}
</script>

<style lang="less" scoped>
.myheader{
  background-color: red;
  color:aqua;
  line-height: 50px;
  text-align: center;
  height:50px;
}
</style>
