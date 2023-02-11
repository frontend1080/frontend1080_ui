<template>
  <div id="app">
    <h2>这是app根组件</h2>
   <div style="width: 500px;margin: auto;">
      <luo-date-time-picker
        v-model="selectData"
        :is-allow-select-area="true"
        :is-need-time="true"
        :min-date="1675267200"
        :max-date="1676822400"
        :format="formatData"
        @change="changeDate"
      />
    </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      selectData: ['2023-01-11 22:22:22', '2023-03-15 22:22:22'],
      formatData: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  methods: {
    changeDate (startTime, endTime) {
      console.log(startTime, endTime)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
