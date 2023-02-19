<template>
  <div>
    <input
      placeholder="请选择日期时间"
      v-model="dateModel"
      class="date-select__input"
      :style="css"
      @click="isShowDatePickerPanel = true"
    >
    <div v-if="isShowDatePickerPanel">
      <date-picker
        v-if="isSelectDate"
        :value="dateData"
        :min-date="minDate"
        :max-date="maxDate"
        :time-data="timeData"
        :format="format"
        :is-need-time="isNeedTime"
        :is-allow-select-area="isAllowSelectArea"
        @change-date="changeDate"
        @select-time="selectTime"
      />
      <time-picker
        v-if="isSelectTime"
        :date-data="dateData"
        :time="timeData"
        :is-allow-select-area="isAllowSelectArea"
        @change-time="changeTime"
        @select-date="selectDate"
        @confirm="confirm"
      />
    </div>
  </div>
</template>
<script>
import TimePicker from '@/components/LuoDateTimePicker/component/TimePicker'
import DatePicker from '@/components/LuoDateTimePicker/component/DatePicker'
import { formatDateFilter } from './DateTimePickerJs.js'
export default {
  name: 'LuoDateTimePicker',
  components: { DatePicker, TimePicker },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    isAllowSelectArea: {
      type: Boolean,
      default: true
    },
    isNeedTime: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    minDate: {
      type: Number,
      default: 0
    },
    maxDate: {
      type: Number,
      default: 0
    },
    width: {
      type: String,
      default: '343px'
    },
    height: {
      type: String,
      default: '30px'
    },
    fontSize: {
      type: String,
      default: '17px'
    },
    fontColor: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      dateModel: '',
      result: [],
      isShowDatePickerPanel: false,
      isSelectDate: true,
      isSelectTime: false,
      dateData: [],
      timeData: []
    }
  },
  created () {
    if (!this.value.length) {
      this.dateData.push('1970-01-01')
      this.timeData.push('00:00:00', '00:00:00')
    }
    for (const index in this.value) {
      if (this.value[index].indexOf(' ') > -1) {
        this.dateData.push(this.value[index].slice(0, this.value[0].indexOf(' ')))
        this.timeData.push(this.value[index].slice(this.value[0].indexOf(' ') + 1))
      } else {
        this.dateData.push(this.value[index])
        this.timeData.push('00:00:00', '00:00:00')
      }
    }
    this.dateModel = this.returnDate
  },
  computed: {
    css () {
      return {
        '--width': this.width,
        '--height': this.height,
        '--font-size': this.fontSize,
        '--font-color': this.fontColor
      }
    },
    returnDate () {
      const resultStart = this.dateData[0] + ' ' + this.timeData[0]
      const resultEnd = this.dateData[1] + ' ' + this.timeData[1]
      if (this.isAllowSelectArea) {
        if (this.isNeedTime) {
          if (this.dateData[1]) {
            return `${formatDateFilter(resultStart, this.format)} 至 ${formatDateFilter(resultEnd, this.format)}`
          }
          return formatDateFilter(resultStart, this.format)
        } else if (this.dateData[1]) {
          return `${formatDateFilter(this.dateData[0], this.format)} 至 ${formatDateFilter(this.dateData[1], this.format)}`
        }
        return formatDateFilter(this.dateData[0], this.format)
      } else if (this.dateData[0]) {
        if (this.isNeedTime) {
          return formatDateFilter(resultStart, this.format)
        }
        return formatDateFilter(this.dateData[0], this.format)
      }
      return null
    }
  },
  methods: {
    changeTime () {
      this.isSelectDate = true
      this.isSelectTime = false
      this.renderClickUI()
    },
    changeDate (startDate, endDate) {
      this.dateData = [startDate, endDate]
      this.isSelectDate = true
      this.isSelectTime = false
      this.isShowDatePickerPanel = false
      this.dateModel = this.returnDate
      const resultStart = this.dateData[0] + ' ' + this.timeData[0]
      const resultEnd = this.dateData[1] + ' ' + this.timeData[1]
      this.$emit('change', formatDateFilter(resultStart, this.format), formatDateFilter(resultEnd, this.format))
    },
    selectTime (startDate, endDate) {
      this.isSelectTime = true
      this.isSelectDate = false
      this.dateData = [startDate, endDate]
    },
    selectDate (startTime, endTime) {
      this.isSelectTime = false
      this.isSelectDate = true
      this.timeData = [startTime, endTime]
    },
    confirm (startTime, endTime) {
      this.timeData = [startTime, endTime]
      this.isSelectDate = true
      this.isSelectTime = false
      this.isShowDatePickerPanel = false
      this.dateModel = this.returnDate
      const resultStart = this.dateData[0] + ' ' + this.timeData[0]
      const resultEnd = this.dateData[1] + ' ' + this.timeData[1]
      this.$emit('change', formatDateFilter(resultStart, this.format), formatDateFilter(resultEnd, this.format))
    }
  }
}
</script>

<style scoped lang="less">
  @import "@/components/LuoDateTimePicker/component/LuoDateTimePicker.less";
</style>
