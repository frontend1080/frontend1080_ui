<template>
  <div id="app">
    <h2>这是app根组件</h2>
    <LuoDateTimerPicker
      v-model="selectData"
      :is-allow-select-area="true"
      :is-need-time="true"
      :format="formatData"
      @change="changeDate"
    />
  </div>
</template>

<script>
import LuoDateTimerPicker from './components/LuoDateTimePicker/component/LuoDateTimePicker'
export default {
  name: 'App',
  component: {
    LuoDateTimerPicker
  },
  data () {
    return {
      selectData: ['2023-01-11', '2023-01-15'],
      formatData: 'yyyy-MM-dd'
    }
  },
  methods: {
    changeDate (startTime, endTime) {
      this.selectData[0] = startTime
      this.selectData[1] = endTime
    }
  }
}
</script>

<style lang="less" scoped>

</style>
