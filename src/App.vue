<template>
  <div id="app">
    <h2>这是app根组件</h2>
    <div style="width: 500px;margin: auto;">
      <LuoDateTimerPicker
        v-model="selectData"
        :is-allow-select-area="false"
        :is-need-time="true"
        :format="formatData"
        @change="changeDate"
      />
    </div>
  </div>
</template>

<script>
import LuoDateTimerPicker from './components/LuoDateTimePicker/LuoDateTimePicker'
export default {
  name: 'App',
  component: {
    LuoDateTimerPicker
  },
  data () {
    return {
      selectData: ['2023-01-10 01:08:50', '2023-01-15 12:10:50'],
      formatData: 'yyyy-MM-dd HH:mm:ss'
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
