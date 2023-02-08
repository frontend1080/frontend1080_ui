<template>
  <div>
    <input
      placeholder="请选择日期时间"
      v-model="dateModel"
      class="date-select__input"
      @click="isShowDatePickerPanel = true"
    >
    <div v-if="isShowDatePickerPanel">
      <date-picker
        v-if="isSelectDate"
        :value="dateData"
        :min-date="minDate"
        :max-date="maxDate"
        :time-data="timeData"
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
import { formatDateFilter } from './LuoDateTimerPicker'
export default {
  name: 'LuoDateTimerPicker',
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
    }
  },
  data () {
    return {
      dateModel: '',
      isShowDatePickerPanel: false,
      isSelectDate: true,
      isSelectTime: false,
      dateData: [],
      timeData: ['00:00:00', '00:00:00']
    }
  },
  created () {
    for (const index in this.value) {
      if (this.value[index].indexOf(' ') > -1) {
        this.dateData.push(this.value[index].slice(0, this.value[0].indexOf(' ')))
        this.timeData = []
        this.timeData.push(this.value[index].slice(this.value[0].indexOf(' ') + 1))
      } else {
        this.dateData.push(this.value[index])
      }
    }
    this.dateModel = this.returnDate
  },
  computed: {
    returnDate () {
      if (this.isAllowSelectArea) {
        if (this.isNeedTime) {
          return `${this.dateData[0]} ${this.timeData[0]} 至 ${this.dateData[1]} ${this.timeData[1]}`
        } else if (this.dateData[1]) {
          return `${this.dateData[0]} 至 ${this.dateData[1]}`
        }
        return this.dateData[0]
      } else if (this.dateData[0]) {
        if (this.isNeedTime) {
          return `${this.dateData[0]} ${this.timeData[0]}`
        }
        return `${this.dateData[0]}`
      }
      return null
    }
    // isCanSelectTime () {
    //   return (this.dateData[0] && this.dateData[1]) || (this.dateData[0] && !this.isAllowSelectArea)
    // }
  },
  methods: {
    // initData () {
    //   let timeStart = null
    //   let timeEnd = null
    //   if (this.value[0] && this.value[0].indexOf(' ') !== -1) {
    //     const emptyIndex = this.value[0].indexOf(' ')
    //     this.dateData[0] = this.value[0].slice(0, emptyIndex)
    //     this.dateData[1] = this.value[1].slice(0, emptyIndex)
    //     timeStart = this.value[0].slice(emptyIndex + 1).split(':')
    //     timeEnd = this.value[1].slice(emptyIndex + 1).split(':')
    //     this.timeData[0].hour = timeStart[0]
    //     this.timeData[1].hour = timeEnd[0]
    //     this.timeData[0].minute = timeStart[1]
    //     this.timeData[1].minute = timeEnd[1]
    //     this.timeData[0].second = timeStart[2]
    //     this.timeData[1].second = timeEnd[2]
    //   } else {
    //     this.dateData[0] = this.value[0]
    //     this.dateData[1] = this.value[1]
    //   }
    // },
    // chooseTime () {
    //   if (this.isCanSelectTime) {
    //     this.isSelectDate = false
    //     this.isSelectTime = true
    //   }
    // },
    // chooseDate () {
    //   this.isSelectDate = true
    //   this.isSelectTime = false
    //   this.renderClickUI()
    // },
    // reRender () {
    //   // 通过开关 loading，来清空已点击选项
    //   this.clearUI()
    //   this.$nextTick().then(() => {
    //     if (this.isAllowFutureDate) {
    //       this.renderFutureNotAllowed()
    //     }
    //     this.renderClickUI()
    //   })
    // },
    // init (year = this.start?.getFullYear(), month = this.start?.getMonth() + 1) {
    //   this.setMonthDate(year, month)
    //   this.reRender()
    // },
    // renderFutureNotAllowed () { // 渲染未来时间不可选
    //   const today = new Date()
    //   const dateDoms = document.getElementsByClassName('date-select__day')
    //   const dateDomsLength = dateDoms.length
    //   for (let i = 0; i < dateDomsLength; i++) {
    //     const dateData = this.monthData[i]
    //     const date = new Date(dateData?.year, dateData?.month - 1, dateData?.showDate)
    //     if (date - today > 0) {
    //       while (i < dateDomsLength) {
    //         const domClassList = dateDoms[i].classList
    //         domClassList.add('date-select__day--disabled')
    //         i++
    //       }
    //     }
    //   }
    // },
    // renderClickUI () { // 通过开始和结束时间，设置页面点击样式
    //   if (!this.start) {
    //     return
    //   }
    //   const [first, last] = [this.monthData[0], this.monthData[this.monthData.length - 1]]
    //   const firstDate = new Date(first.year, first.month - 1, first.showDate)
    //   const lastDate = new Date(last.year, last.month - 1, last.showDate)
    //   if (this.start - lastDate > 0 || (this.end && this.end - firstDate < 0)) {
    //     return
    //   }
    //   // 赋值新的点击、包括中间状态、开始和结束
    //   const dateDoms = document.getElementsByClassName('date-select__day')
    //   for (let i = 0; i < dateDoms.length; i++) {
    //     const dateData = this.monthData[i]
    //     const date = new Date(dateData.year, dateData.month - 1, dateData.showDate)
    //     const domClassList = dateDoms[i].classList
    //     // 只有开始，给开始设置样式
    //     if (!this.end && this.start - date === 0) {
    //       domClassList.add('date-select__day--start')
    //       break
    //     }
    //     if (this.start - date === 0) {
    //       // 当点击相同的
    //       if (this.end === this.start) {
    //         domClassList.remove('date-select__day--start')
    //         this.start = null
    //         this.end = null
    //         this.dateData = []
    //         break
    //       } else {
    //         domClassList.add('date-select__day--start')
    //       }
    //     } else if (this.start - date < 0 && date - this.end < 0) {
    //       domClassList.add('date-select__day--middle')
    //     } else if (this.end - date === 0) {
    //       domClassList.add('date-select__day--end')
    //       break
    //     }
    //   }
    // },
    // judgeDayType (classList) { // 判断当前点击的日期是上个月，这个月，还是当前月份的
    //   let dayType = 'currMonth'
    //   if (classList.contains('prev-month')) {
    //     dayType = 'prevMonth'
    //   } else if (classList.contains('next-month')) {
    //     dayType = 'nextMonth'
    //   }
    //   return dayType
    // },
    // setStartEndDate (dayType, dom) { // 设置开始和结束日期
    //   const day = dom.innerHTML
    //
    //   let clickDate = null
    //   let fixDate = null
    //   switch (dayType) {
    //     case 'currMonth':
    //       fixDate = this.fixMonthToYear(this.year, this.month)
    //       break
    //     case 'prevMonth':
    //       fixDate = this.fixMonthToYear(this.year, this.month - 1)
    //       break
    //     case 'nextMonth':
    //       fixDate = this.fixMonthToYear(this.year, this.month + 1)
    //       break
    //   }
    //   clickDate = new Date(fixDate.year, fixDate.month - 1, day)
    //   if (this.isAllowSelectArea) {
    //     if (!this.start || (this.start && this.end)) {
    //       this.start = clickDate
    //       this.end = null
    //     } else if (this.start - clickDate === 0) {
    //       this.end = this.start
    //     } else if (this.start - clickDate > 0) {
    //       this.end = this.start
    //       this.start = clickDate
    //     } else {
    //       this.end = clickDate
    //     }
    //   } else {
    //     this.start = clickDate
    //     this.end = null
    //   }
    // },
    // setMonthDate (year, month) {
    //   if (!year || !month) { // 若没有传入年月，则默认选择当前年月
    //     const today = new Date()
    //     year = today.getFullYear()
    //     month = today.getMonth() + 1 // 例如想要的是12月，getMonth() 会返回 11
    //   }
    //   const firstDateOfCurrMonth = new Date(year, month - 1, 1) // 获取当月第一天
    //   let weekOfFirstDate = firstDateOfCurrMonth.getDay() // 当月第一天是一周的星期几。那么之前的时间是上个月的
    //   if (weekOfFirstDate === 0) {
    //     weekOfFirstDate = 7
    //   }
    //   // 上个月最后一天相关
    //   const lastDateOfLastMonth = new Date(year, month - 1, 0) // 上个月最后一天 年月日
    //   const lastDayOfLastMonth = lastDateOfLastMonth.getDate() // 上个月最后一天 日
    //   const preMonthDayCount = weekOfFirstDate // 本月第一行，留有上个月的天数。因为是从周日开始的。若 1 号为周二，那么留有上个月的天数为 2（周日、周一）
    //   const lastDateOfCurrMonth = new Date(year, month, 0) // 本月的最后一天 年月日
    //   const lastDayOfCurrMonth = lastDateOfCurrMonth.getDate() // 本月的最后一天 日
    //   // 设置月的范围
    //   let range = 5 * 7
    //   const allDayCount = lastDayOfCurrMonth + preMonthDayCount
    //   if (allDayCount > range) {
    //     range += 7
    //   } else if (allDayCount <= range - 7) {
    //     range -= 7
    //   }
    //   this.monthData = this.getMonthData(range, year, month, preMonthDayCount, lastDayOfLastMonth, lastDayOfCurrMonth)
    //   this.year = year
    //   this.month = month
    // },
    // getMonthData (range, year, month, preMonthDayCount, lastDayOfLastMonth, lastDayOfCurrMonth) {
    //   const ret = []
    //   let date, showDate, currMonth
    //   for (let i = 0; i < range; i++) {
    //     date = i + 1 - preMonthDayCount // 本月的几号
    //     showDate = date
    //     currMonth = month
    //     // 上个月
    //     if (date <= 0) {
    //       currMonth = month - 1
    //       showDate = lastDayOfLastMonth + date // 上个月的第几号
    //     } else if (date > lastDayOfCurrMonth) {
    //       // 下一个月
    //       currMonth = month + 1
    //       showDate = showDate - lastDayOfCurrMonth // 下个月的第几号
    //     }
    //     const fixDate = this.fixMonthToYear(year, currMonth)
    //     const today = new Date()
    //     // 是否是今天
    //     let isToday = false
    //     if (fixDate.year === today.getFullYear() && fixDate.month === today.getMonth() + 1 && date === today.getDate()) {
    //       isToday = true
    //     }
    //     ret.push({
    //       year: fixDate.year,
    //       month: fixDate.month,
    //       date,
    //       showDate,
    //       isToday
    //     })
    //   }
    //   return ret
    // },
    // fixMonthToYear (year, month) {
    //   if (month === 0) { // 若本月为 1 月，则上一月为 12 月
    //     month = 12
    //     year -= 1
    //   }
    //   if (month === 13) { // 若本月为 12 月，则下一月为 1 月
    //     month = 1
    //     year += 1
    //   }
    //   year = year || 0
    //   return { year, month }
    // },
    // clearUI () {
    //   this.loading = false
    //   this.$nextTick(() => {
    //     this.loading = true
    //   })
    // },
    // cancel () {
    //   // 日期重置回当月
    //   this.start = null
    //   this.end = null
    //   this.dateData = []
    //   this.setMonthDate()
    //   this.reRender()
    // },
    // confirm (startTime, endTime) {
    //   this.isShowDatePickerPanel = false
    //   let startDate = null
    //   let endDate = null
    //   if (this.isNeedTime) {
    //     startDate = this.dateData[0] + startTime
    //     endDate = this.dateData[1] + endTime
    //   } else {
    //     startDate = this.dateData[0]
    //     endDate = this.dateData[1]
    //   }
    //   startDate = this.formatDateFilter(startDate, this.format)
    //   endDate = this.formatDateFilter(endDate, this.format)
    //   this.$emit('change', startDate, endDate)
    //   this.dateModel = this.returnDate
    // },
    // updateTime (whichDirect, data) {
    //   const index = whichDirect[0] === 'begin' ? 0 : 1
    //   if (whichDirect[1] === 'h') {
    //     this.timeData[index].hour = data
    //   }
    //   if (whichDirect[1] === 'm') {
    //     this.timeData[index].minute = data
    //   }
    //   if (whichDirect[1] === 's') {
    //     this.timeData[index].second = data
    //   }
    // },
    // formatDateFilter (value, args) {
    //   if (!value) {
    //     return
    //   }
    //   const dt = new Date(value)
    //   if (args === 'yyyy-M-d') { // yyyy-M-d
    //     const year = dt.getFullYear()
    //     const month = dt.getMonth() + 1
    //     const date = dt.getDate()
    //     return `${year}-${month}-${date}`
    //   } else if (args === 'yyyy-M-d H:m:s' || args === 'yyyy-M-d h:m:s') { // yyyy-M-d H:m:s
    //     const year = dt.getFullYear()
    //     const month = dt.getMonth() + 1
    //     const date = dt.getDate()
    //     const hour = dt.getHours()
    //     const minute = dt.getMinutes()
    //     const second = dt.getSeconds()
    //     return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    //   } else if (args === 'yyyy-MM-dd') { // yyyy-MM-dd
    //     const year = dt.getFullYear()
    //     const month = (dt.getMonth() + 1).toString().padStart(2, '0')
    //     const date = dt.getDate().toString().padStart(2, '0')
    //     return `${year}-${month}-${date}`
    //   } else {
    //     // yyyy-MM-dd HH:mm:ss
    //     const year = dt.getFullYear()
    //     const month = (dt.getMonth() + 1).toString().padStart(2, '0')
    //     const date = dt.getDate().toString().padStart(2, '0')
    //     const hour = dt.getHours().toString().padStart(2, '0')
    //     const minute = dt.getMinutes().toString().padStart(2, '0')
    //     const second = dt.getSeconds().toString().padStart(2, '0')
    //     return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    //   }
    // },
    changeTime () {
      this.isSelectDate = true
      this.isSelectTime = false
      this.renderClickUI()
    },
    changeDate (startDate, endDate) {
      this.isSelectDate = true
      this.isSelectTime = false
      this.isShowDatePickerPanel = false
      this.dateData = [formatDateFilter(startDate, this.format), formatDateFilter(endDate, this.format)]
      this.dateModel = this.returnDate
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
    }
  }
}
</script>

<style scoped lang="less">
  @import "@/components/LuoDateTimePicker/component/LuoDateTimePicker.less";
</style>
