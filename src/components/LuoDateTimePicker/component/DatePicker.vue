<template>
  <div class="date-select">
    <div class="date-select__date">
      <div class="date-select__custom">
        <div class="date-select__custom--value">
          <span v-if="dateData.length" v-html="returnDate"/>
          <span v-else class="date-select__custom-empty"> 请选择日期 </span>
        </div>
      </div>
      <hr/>
      <div v-if="loading" class="date-select__header">
        <div class="date-select__header-prev">
          <div class="date-select__btn date-select__btn-prev--year">&lt;&lt;</div>
          <div class="date-select__btn date-select__btn-prev--month">&lt;</div>
        </div>
        <div class="date-select__header-middle"> {{ year }} 年 {{ month }} 月 </div>
        <div class="date-select__header-next">
          <div class="date-select__btn date-select__btn-next--month">&gt;</div>
          <div class="date-select__btn date-select__btn-next--year">&gt;&gt;</div>
        </div>
      </div>
      <div class="date-select__body">
        <div class="date-select__weeks">
        <span
          class="date-select__week"
          v-for="day in week"
          :key="day"
        > {{ day }} </span>
        </div>
        <hr/>
        <div v-if="loading" class="date-select__month">
          <div
            :class="['date-select__day',
              'date-select__background',
              i.date < i.showDate && 'prev-month',
              i.date > i.showDate && 'next-month',
              i.isToday && 'date-select__today'
            ]"
            v-for="i in monthData"
            :key="i.date"
          > {{ i.showDate }} </div>
        </div>
        <hr/>
        <div class="date-select-footer">
          <button
            :disabled="isAllowSelectArea && !dateData[1]"
            v-show="isNeedTime"
            :class="['date-select-footer__text',
           !isCanSelectTime && 'date-select-footer__text-disabled'
           ]"
            @click="$emit('select-time', dateData[0], dateData[1])"
          > 选择时间 </button>
          <button class="date-select-footer__btn" @click="cancel"> 此刻 </button>
          <button class="date-select-footer__btn" @click="$emit('change-date', dateData[0], dateData[1])"> 确定 </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateFilter, judgeDayType, fixMonthToYear, setStartEndDate, setMonthDate } from './DateTimePickerJs'
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    timeData: {
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
  computed: {
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
    },
    isCanSelectTime () {
      return (this.dateData[0] && this.dateData[1]) || (this.dateData[0] && !this.isAllowSelectArea)
    }
  },
  created () {
    this.initData()
  },
  watch: {
    hasOldDate: {
      handler (val) {
        if (val) {
          this.cancel()
          this.addEvent()
          if (!this.isAllowSelectArea) {
            this.dateData[1] = null
          }
          this.dateData.push(this.value[0], this.value[1])
          const [startDateArr, endDateArr] = [this.dateData?.[0]?.split('-'), this.dateData?.[1]?.split('-')]
          this.start = startDateArr == null ? null : new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2])
          this.end = endDateArr == null ? null : new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2])
        }
      },
      immediate: true
    },
    isShowDatePickerPanel (val) {
      setTimeout(() => {
        if (val) {
          if (this.value) {
            this.hasOldDate = true
          }
          this.cancel()
          this.addEvent()
        } else {
          this.hasOldDate = false
          this.dateData = []
        }
      }, 5)
    }
  },
  data () {
    return {
      monthData: [],
      week: ['日', '一', '二', '三', '四', '五', '六'],
      year: '',
      month: '',
      start: null,
      end: null,
      dateData: [],
      oldDateData: [],
      loading: true,
      isShowDatePickerPanel: false,
      hasOldDate: false,
      isAllowFutureDate: true
    }
  },
  methods: {
    initData () {
      if (this.value) {
        this.hasOldDate = true
      }
    },
    addEvent () {
      const $datePickerDom = document.querySelector('.date-select')
      $datePickerDom.addEventListener('click', e => {
        e.stopPropagation()
        const $target = e.target
        const targetClassList = $target.classList
        if (
          (!targetClassList.contains('date-select__btn') &&
              !targetClassList.contains('date-select__day') &&
              !targetClassList.contains('start-date') &&
              !targetClassList.contains('end-date')) ||
            targetClassList.contains('date-select__btn--disabled') ||
            targetClassList.contains('date-select__day--disabled')
        ) { return }
        if (targetClassList.contains('date-select__btn') || targetClassList.contains('start-date') || targetClassList.contains('end-date')) {
          let fixDate = null
          if (targetClassList.contains('date-select__btn-prev--year')) {
            fixDate = fixMonthToYear(this.year - 1, this.month)
          } else if (targetClassList.contains('date-select__btn-prev--month')) {
            fixDate = fixMonthToYear(this.year, this.month - 1)
          } else if (targetClassList.contains('date-select__btn-next--month')) {
            fixDate = fixMonthToYear(this.year, this.month + 1)
          } else if (targetClassList.contains('date-select__btn-next--year')) {
            fixDate = fixMonthToYear(this.year + 1, this.month)
          } else {
            // 点击日期跳转到对应日期
            const dateArr = $target.innerHTML.split('-')
            fixDate = fixMonthToYear(parseInt(dateArr[0]), parseInt(dateArr[1]))
          }
          setMonthDate(fixDate.year, fixDate.month, this)
        } else if (targetClassList.contains('date-select__day')) {
          const dayType = judgeDayType(targetClassList)
          setStartEndDate(dayType, $target, this)
          this.dateData = [formatDateFilter(this.start, 'yyyy-MM-dd'), formatDateFilter(this.end, 'yyyy-MM-dd')]
        }
        this.reRender()
      },
      false
      )
    },
    reRender () {
      this.clearUI()
      this.$nextTick().then(() => {
        if (this.isAllowFutureDate) {
          this.renderFutureNotAllowed()
        }
        this.renderClickUI()
      })
    },
    renderFutureNotAllowed () { // 渲染未来时间不可选
      const dateDoms = document.getElementsByClassName('date-select__day')
      for (let i = 0; i < dateDoms.length; i++) {
        const dateData = this.monthData[i]
        const date = new Date(dateData?.year, dateData?.month - 1, dateData?.showDate)
        if (this.minDate > 0) {
          if (date.getTime() / 1000 < this.minDate) {
            const domClassList = dateDoms[i].classList
            domClassList.add('date-select__day--disabled')
          }
        }
        if (this.maxDate > 0) {
          if (date.getTime() / 1000 > this.maxDate) {
            const domClassList = dateDoms[i].classList
            domClassList.add('date-select__day--disabled')
          }
        }
      }
    },
    renderClickUI () { // 通过开始和结束时间，设置页面点击样式
      if (!this.start) { return }
      const [first, last] = [this.monthData[0], this.monthData[this.monthData.length - 1]]
      const firstDate = new Date(first.year, first.month - 1, first.showDate)
      const lastDate = new Date(last.year, last.month - 1, last.showDate)
      if (this.start - lastDate > 0 || (this.end && this.end - firstDate < 0)) { return }
      const dateDoms = document.getElementsByClassName('date-select__day')
      for (let i = 0; i < dateDoms.length; i++) {
        const dateData = this.monthData[i]
        const date = new Date(dateData.year, dateData.month - 1, dateData.showDate)
        const domClassList = dateDoms[i].classList
        if (!this.end && this.start - date === 0) {
          domClassList.add('date-select__day--start')
          break
        }
        if (this.start - date === 0) {
          if (this.end === this.start) {
            domClassList.remove('date-select__day--start')
            this.start = null
            this.end = null
            this.dateData = []
            break
          } else {
            domClassList.add('date-select__day--start')
          }
        } else if (this.start - date < 0 && date - this.end < 0) {
          domClassList.add('date-select__day--middle')
        } else if (this.end - date === 0) {
          domClassList.add('date-select__day--end')
          break
        }
      }
    },
    clearUI () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    cancel () {
      this.start = null
      this.end = null
      this.dateData = []
      setMonthDate(null, null, this)
      this.reRender()
    }
  }
}
</script>

<style scoped lang="less">
  @import "@/components/LuoDateTimePicker/component/LuoDateTimePicker.less";
</style>
