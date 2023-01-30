<template>
  <div>
    <input
      placeholder="请选择日期时间"
      v-model="dateModel"
      class="date-select__input"
      @click="showDatePickerPanel"
    >
    <div
      v-if="isShowDatePickerPanel"
      class="date-select"
    >
      <div
        v-show="isSelectDate"
        class="date-select__date"
      >
        <div class="date-select__custom">
          <div class="date-select__custom--value">
            <span
              v-if="dateData.length"
              v-html="returnDate"
            />
            <span
              v-else
              class="date-select__custom-empty"
            >
              请选择日期
            </span>
          </div>
        </div>
        <hr/>
        <div
            v-if="loading"
            class="date-select__header"
          >
            <div class="date-select__header-prev">
              <div
                class="date-select__btn date-select__btn-prev--year"
              >
                &lt;&lt;
              </div>
              <div class="date-select__btn date-select__btn-prev--month">&lt;</div>
            </div>

            <div class="date-select__header-middle">
              {{ year }} 年 {{ month }} 月
            </div>

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
            >
              {{ day }}
            </span>
          </div>
          <hr/>
          <div
            v-if="loading"
            class="date-select__month"
          >
            <div
              :class="['date-select__day',
               'date-select__background',
               i.date < i.showDate && 'prev-month',
               i.date > i.showDate && 'next-month',
               i.isToday && 'date-select__today'
               ]"
              v-for="i in monthData"
              :key="i.date"
            >
              {{ i.showDate }}
            </div>
          </div>
          <hr/>
          <div class="date-select-footer">
            <button
              v-show="isNeedTime"
              :class="['date-select-footer__text',
               !isCanSelectTime && 'date-select-footer__text-disabled'
               ]"
              @click="chooseTime"
            >
              选择时间
            </button>
            <button
              class="date-select-footer__btn"
              @click="cancel"
            >
              此刻
            </button>
            <button
              class="date-select-footer__btn"
              @click="confirm"
            >
              确定
            </button>
          </div>
        </div>
      </div>
      <div
          v-show="isSelectTime"
          class="date-select__time"
        >
          <div class="time-select__panel">
            <div
              :class="['time-select', 'time-select-left']"
            >
              <div class="time-select__date">{{ dateData[0] }}</div>
              <div class="time-select__time">{{ coutLeftTime }}</div>
              <hr/>
              <div class="time-select__scroll">
                <div class="time-select__scroll-num">
                  <div
                    v-for="(h, index) in beginHourDate"
                    :key="index"
                    :class="[
                    timeDate[0].hour === h.hour && 'time-selected'
                    ]"
                    @click="updateTime(['begin', 'h'], h.hour)"
                  >
                    {{ h.hour }}
                  </div>
                </div>
                <div class="time-select__scroll-num">
                  <div
                    v-for="(m, index) in beginMinuteDate"
                    :key="index"
                    :class="[
                  timeDate[0].minute === m.minute && 'time-selected'
                ]"
                    @click="updateTime(['begin', 'm'], m.minute)"
                  >
                    {{ m.minute }}
                  </div>
                </div>
                <div class="time-select__scroll-num">
                  <div
                    v-for="(s, index) in beginSecondDate"
                    :key="index"
                    :class="[
                  timeDate[0].second === s.second && 'time-selected'
                ]"
                    @click="updateTime(['begin', 's'], s.second)"
                  >
                    {{ s.second }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="isAllowSelectArea"
              :class="['time-select', 'time-select-right']"
            >
              <div class="time-select__date">{{ dateData[1] }}</div>
              <div class="time-select__time">{{ coutRightTime }}</div>
              <hr/>
              <div class="time-select__scroll">
                <div class="time-select__scroll-num">
                  <div
                    v-for="(h, index) in endHourDate"
                    :key="index"
                    :class="[
                  timeDate[1].hour === h.hour && 'time-selected'
                ]"
                    @click="updateTime(['end', 'h'], h.hour)"
                  >
                    {{ h.hour }}
                  </div>
                </div>
                <div class="time-select__scroll-num">
                  <div
                    v-for="(m, index) in endMinuteDate"
                    :key="index"
                    :class="[
                  timeDate[1].minute === m.minute && 'time-selected'
                ]"
                    @click="updateTime(['end', 'm'], m.minute)"
                  >
                    {{ m.minute }}
                  </div>
                </div>
                <div class="time-select__scroll-num">
                  <div
                    v-for="(s, index) in endSecondDate"
                    :key="index"
                    :class="[
                  timeDate[1].second === s.second && 'time-selected'
                ]"
                    @click="updateTime(['end', 's'], s.second)"
                  >
                    {{ s.second }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div class="date-select-footer">
            <button
              class="date-select-footer__text"
              @click="chooseDate"
            >
              选择时间
            </button>
            <button
              class="date-select-footer__btn"
              @click="confirm"
            >
              确定
            </button>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LuoDateTimerPicker',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'date'
    },
    // 是否禁用未来时间
    isAllowFutureDate: {
      type: Boolean,
      default: false
    },
    isAllowSelectArea: {
      type: Boolean,
      default: true
    },
    isNeedTime: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  data () {
    return {
      monthData: [],
      week: ['日', '一', '二', '三', '四', '五', '六'],
      hour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23'],
      minuteOrSecond: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
        '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33',
        '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46',
        '47', '48', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58',
        '59'],
      year: '',
      month: '',
      beginHourDate: [],
      beginMinuteDate: [],
      beginSecondDate: [],
      endHourDate: [],
      endMinuteDate: [],
      endSecondDate: [],
      start: null,
      end: null,
      dateData: [],
      timeDate: [{
        hour: '00',
        minute: '00',
        second: '00'
      }, {
        hour: '00',
        minute: '00',
        second: '00'
      }],
      oldDateData: [],
      loading: true,
      isSelectDate: true,
      isSelectTime: false,
      isShowDatePickerPanel: false,
      dateModel: '',
      hasOldDate: false
    }
  },
  created () {
    this.initData()
    this.dateModel = this.returnDate
  },
  watch: {
    hasOldDate: {
      handler (val) {
        if (val) {
          this.initData()
          if (!this.isAllowSelectArea) {
            this.dateData[1] = null
          }
          const [startDateArr, endDateArr] = [this.dateData?.[0]?.split('-'), this.dateData?.[1]?.split('-')]
          this.start = startDateArr == null ? null : new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2])
          this.end = endDateArr == null ? null : new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2])

          this.init()
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
          this.getTimeDate()
          this.addEvent()
        } else {
          this.hasOldDate = false
          this.isSelectDate = true
          this.isSelectTime = false
          this.dateData = []
          this.timeDate = [{
            hour: '00',
            minute: '00',
            second: '00'
          }, {
            hour: '00',
            minute: '00',
            second: '00'
          }]
        }
      }, 5)
    }
  },
  computed: {
    returnDate () {
      if (this.isAllowSelectArea && this.dateData[0] && this.dateData[1]) {
        if (this.isNeedTime) {
          return `${this.dateData[0]} ${this.timeDate[0].hour}:${this.timeDate[0].minute}:${this.timeDate[0].second} 至 ${this.dateData[1]} ${this.timeDate[1].hour}:${this.timeDate[1].minute}:${this.timeDate[1].second}`
        }
        return `${this.dateData[0]} 至 ${this.dateData[1]}`
      } else if (this.dateData[0]) {
        if (this.isNeedTime) {
          return `${this.dateData[0]} ${this.timeDate[0].hour}:${this.timeDate[0].minute}:${this.timeDate[0].second}`
        }
        return `${this.dateData[0]}`
      }
      return null
    },
    isCanSelectTime () {
      return (this.dateData[0] && this.dateData[1]) || (this.dateData[0] && !this.isAllowSelectArea)
    },
    coutLeftTime () {
      return `${this.timeDate[0].hour} : ${this.timeDate[0].minute} : ${this.timeDate[0].second}`
    },
    coutRightTime () {
      return `${this.timeDate[1].hour} : ${this.timeDate[1].minute} : ${this.timeDate[1].second}`
    }
  },
  methods: {
    initData () {
      let timeStart = null
      let timeEnd = null
      const emptyIndex = this.value[0].indexOf(' ')
      if (emptyIndex !== -1) {
        this.dateData[0] = this.value[0].slice(0, emptyIndex)
        this.dateData[1] = this.value[1].slice(0, emptyIndex)
        timeStart = this.value[0].slice(emptyIndex + 1).split(':')
        timeEnd = this.value[1].slice(emptyIndex + 1).split(':')
        this.timeDate[0].hour = timeStart[0]
        this.timeDate[1].hour = timeEnd[0]
        this.timeDate[0].minute = timeStart[1]
        this.timeDate[1].minute = timeEnd[1]
        this.timeDate[0].second = timeStart[2]
        this.timeDate[1].second = timeEnd[2]
      } else {
        this.dateData[0] = this.value[0]
        this.dateData[1] = this.value[1]
      }
    },
    showDatePickerPanel () {
      this.isShowDatePickerPanel = true
    },
    addEvent () {
      const $datePickerDom = document.querySelector('.date-select')
      $datePickerDom.addEventListener(
        'click',
        e => {
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
          ) {
            return
          }
          if (targetClassList.contains('date-select__btn') || targetClassList.contains('start-date') || targetClassList.contains('end-date')) {
            let fixDate = null
            if (targetClassList.contains('date-select__btn-prev--year')) {
              fixDate = this.fixMonthToYear(this.year - 1, this.month)
            } else if (targetClassList.contains('date-select__btn-prev--month')) {
              fixDate = this.fixMonthToYear(this.year, this.month - 1)
            } else if (targetClassList.contains('date-select__btn-next--month')) {
              fixDate = this.fixMonthToYear(this.year, this.month + 1)
            } else if (targetClassList.contains('date-select__btn-next--year')) {
              fixDate = this.fixMonthToYear(this.year + 1, this.month)
            } else {
              // 点击日期跳转到对应日期
              const dateArr = $target.innerHTML.split('-')
              fixDate = this.fixMonthToYear(parseInt(dateArr[0]), parseInt(dateArr[1]))
            }
            this.setMonthDate(fixDate.year, fixDate.month)
          } else if (targetClassList.contains('date-select__day')) {
            const dayType = this.judgeDayType(targetClassList)
            // 设置日期开始和结束时间，并返回设置的状态
            this.setStartEndDate(dayType, $target)
            this.dateData = [this.formatDateFilter(this.start, this.format), this.formatDateFilter(this.end, this.format)]
          }
          this.reRender()
        },
        false
      )
    },
    chooseTime () {
      if (this.isCanSelectTime) {
        this.isSelectDate = false
        this.isSelectTime = true
      }
    },
    chooseDate () {
      this.isSelectDate = true
      this.isSelectTime = false
      this.renderClickUI()
    },
    // 重新渲染
    reRender () {
      // 通过开关 loading，来清空已点击选项
      this.clearUI()
      this.$nextTick().then(() => {
        if (this.isAllowFutureDate) {
          this.renderFutureNotAllowed()
        }
        this.renderClickUI()
      })
    },
    init (year = this.start?.getFullYear(), month = this.start?.getMonth() + 1) {
      this.setMonthDate(year, month)
      this.reRender()
    },
    // 渲染未来时间不可选
    renderFutureNotAllowed () {
      const today = new Date()
      const dateDoms = document.getElementsByClassName('date-select__day')
      const dateDomsLength = dateDoms.length
      for (let i = 0; i < dateDomsLength; i++) {
        const dateData = this.monthData[i]
        const date = new Date(dateData?.year, dateData?.month - 1, dateData?.showDate)
        if (date - today > 0) {
          while (i < dateDomsLength) {
            const domClassList = dateDoms[i].classList
            domClassList.add('date-select__day--disabled')
            i++
          }
        }
      }
    },
    // 通过开始和结束时间，设置页面点击样式
    renderClickUI () {
      // 没点击，则无需渲染
      if (!this.start) {
        return
      }
      // 获取当前渲染日期界面的第一个和最后一个日期
      const [first, last] = [this.monthData[0], this.monthData[this.monthData.length - 1]]
      // 当点击的时间不在开始和结束的范围内,则无需渲染
      const firstDate = new Date(first.year, first.month - 1, first.showDate)
      const lastDate = new Date(last.year, last.month - 1, last.showDate)
      if (this.start - lastDate > 0 || (this.end && this.end - firstDate < 0)) {
        return
      }
      // 赋值新的点击、包括中间状态、开始和结束
      // 遍历每个日期
      const dateDoms = document.getElementsByClassName('date-select__day')
      for (let i = 0; i < dateDoms.length; i++) {
        const dateData = this.monthData[i]
        const date = new Date(dateData.year, dateData.month - 1, dateData.showDate)
        const domClassList = dateDoms[i].classList
        // 只有开始，给开始设置样式
        if (!this.end && this.start - date === 0) {
          domClassList.add('date-select__day--start')
          break
        }
        // 开始和结束
        // 设置开始
        if (this.start - date === 0) {
          // 当点击相同的
          if (this.end === this.start) {
            domClassList.remove('date-select__day--start')
            this.start = null
            this.end = null
            this.dateData = []
            break
          } else {
            // 给开始添加范围样式
            domClassList.add('date-select__day--start', 'select-both')
          }
        } else if (this.start - date < 0 && date - this.end < 0) {
          // 渲染中间的样式
          domClassList.add('date-select__day--middle')
        } else if (this.end - date === 0) {
          // 渲染结束的样式
          domClassList.add('date-select__day--end', 'select-both')
          break
        }
      }
    },
    // 判断当前点击的日期是上个月，这个月，还是当前月份的
    judgeDayType (classList) {
      let dayType = 'currMonth'
      if (classList.contains('prev-month')) {
        dayType = 'prevMonth'
      } else if (classList.contains('next-month')) {
        dayType = 'nextMonth'
      }
      return dayType
    },
    // 设置开始和结束日期
    setStartEndDate (dayType, dom) {
      const day = dom.innerHTML

      let clickDate = null
      let fixDate = null
      switch (dayType) {
        case 'currMonth':
          fixDate = this.fixMonthToYear(this.year, this.month)
          break
        case 'prevMonth':
          fixDate = this.fixMonthToYear(this.year, this.month - 1)
          break
        case 'nextMonth':
          fixDate = this.fixMonthToYear(this.year, this.month + 1)
          break
      }
      clickDate = new Date(fixDate.year, fixDate.month - 1, day)

      // 清空已选的开始和结束，只点击了开始
      if (this.isAllowSelectArea) {
        if (!this.start || (this.start && this.end)) {
          this.start = clickDate
          this.end = null
        } else if (this.start - clickDate === 0) {
          // 开始和结束都在同一天
          this.end = this.start
        } else if (this.start - clickDate > 0) {
          // 交换结束和开始
          this.end = this.start
          this.start = clickDate
        } else {
          // 设置结束
          this.end = clickDate
        }
      } else {
        this.start = clickDate
        this.end = null
      }
    },
    setMonthDate (year, month) {
      // 若没有传入年月，则默认选择当前年月
      if (!year || !month) {
        const today = new Date()
        year = today.getFullYear()
        month = today.getMonth() + 1 // 例如想要的是12月，getMonth() 会返回 11（js 里的 month 总是会比实际的少 1）
      }
      // 当月第一天相关
      const firstDateOfCurrMonth = new Date(year, month - 1, 1) // 获取当月第一天
      let weekOfFirstDate = firstDateOfCurrMonth.getDay() // 当月第一天是一周的星期几。那么之前的时间是上个月的
      // 周日
      if (weekOfFirstDate === 0) {
        weekOfFirstDate = 7
      }
      // 上个月最后一天相关
      const lastDateOfLastMonth = new Date(year, month - 1, 0) // 上个月最后一天 年月日
      const lastDayOfLastMonth = lastDateOfLastMonth.getDate() // 上个月最后一天 日
      const preMonthDayCount = weekOfFirstDate // 本月第一行，留有上个月的天数。因为是从周日开始的。若 1 号为周二，那么留有上个月的天数为 2（周日、周一）
      const lastDateOfCurrMonth = new Date(year, month, 0) // 本月的最后一天 年月日
      const lastDayOfCurrMonth = lastDateOfCurrMonth.getDate() // 本月的最后一天 日
      // 设置月的范围
      let range = 5 * 7
      const allDayCount = lastDayOfCurrMonth + preMonthDayCount
      if (allDayCount > range) {
        // 会有 6 行
        range += 7
      } else if (allDayCount <= range - 7) {
        // 只有 4 行
        range -= 7
      }
      this.monthData = this.getMonthData(range, year, month, preMonthDayCount, lastDayOfLastMonth, lastDayOfCurrMonth)
      this.year = year
      this.month = month
    },
    getMonthData (range, year, month, preMonthDayCount, lastDayOfLastMonth, lastDayOfCurrMonth) {
      const ret = []
      let date, showDate, currMonth
      for (let i = 0; i < range; i++) {
        date = i + 1 - preMonthDayCount // 本月的几号
        showDate = date
        currMonth = month
        // 上个月
        if (date <= 0) {
          currMonth = month - 1
          showDate = lastDayOfLastMonth + date // 上个月的第几号
        } else if (date > lastDayOfCurrMonth) {
          // 下一个月
          currMonth = month + 1
          showDate = showDate - lastDayOfCurrMonth // 下个月的第几号
        }
        const fixDate = this.fixMonthToYear(year, currMonth)
        const today = new Date()
        // 是否是今天
        let isToday = false
        if (fixDate.year === today.getFullYear() && fixDate.month === today.getMonth() + 1 && date === today.getDate()) {
          isToday = true
        }
        ret.push({
          year: fixDate.year,
          month: fixDate.month,
          date,
          showDate,
          isToday
        })
      }
      return ret
    },
    fixMonthToYear (year, month) {
      // 若本月为 1 月，则上一月为 12 月
      if (month === 0) {
        month = 12
        year -= 1
      }
      // 若本月为 12 月，则下一月为 1 月
      if (month === 13) {
        month = 1
        year += 1
      }
      year = year || 0
      return { year, month }
    },
    formatDate (date) {
      if (!date) {
        return date
      }
      return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      }`
    },
    // 重新渲染日历
    clearUI () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    cancel () {
      if (this.atomic) {
        this.confirmData('', this.oldDateData)
      } else {
        // 日期重置回当月
        this.start = null
        this.end = null
        this.dateData = []
        this.setMonthDate()
        this.reRender()
      }
    },
    confirm () {
      this.isShowDatePickerPanel = false
      let startDate = null
      let endDate = null
      if (this.isNeedTime) {
        startDate = this.dateData[0] + ' ' + this.timeDate[0].hour + ':' + this.timeDate[0].minute + ':' + this.timeDate[0].second
        endDate = this.dateData[1] + ' ' + this.timeDate[1].hour + ':' + this.timeDate[1].minute + ':' + this.timeDate[1].second
      } else {
        startDate = this.dateData[0]
        endDate = this.dateData[1]
      }
      startDate = this.formatDateFilter(startDate, this.format)
      endDate = this.formatDateFilter(endDate, this.format)
      this.$emit('change', startDate, endDate)
      this.dateModel = this.returnDate
    },
    getTimeDate () {
      const isNowHour = [false, false]
      const isNowMin = [false, false]
      const isNowSecond = [false, false]
      for (const h of this.hour) {
        if (this.timeDate[0] && this.timeDate[0].hour === h) {
          isNowHour[0] = true
        }
        if (this.timeDate[1] && this.timeDate[1].hour === h) {
          isNowHour[1] = true
        }
        this.beginHourDate.push({
          isNow: isNowHour[0],
          hour: h
        })
        this.endHourDate.push({
          isNow: isNowHour[1],
          hour: h
        })
      }
      for (const m of this.minuteOrSecond) {
        if (this.timeDate[0] && this.timeDate[0].minute === m) {
          isNowMin[0] = true
        }
        if (this.timeDate[1] && this.timeDate[1].minute === m) {
          isNowMin[1] = true
        }
        this.beginMinuteDate.push({
          isNow: isNowMin[0],
          minute: m
        })
        this.endMinuteDate.push({
          isNow: isNowMin[1],
          minute: m
        })
      }
      for (const s of this.minuteOrSecond) {
        if (this.timeDate[0] && this.timeDate[0].second === s) {
          isNowSecond[0] = true
        }
        if (this.timeDate[1] && this.timeDate[1].second === s) {
          isNowSecond[1] = true
        }
        this.beginSecondDate.push({
          isNow: isNowSecond[0],
          second: s
        })
        this.endSecondDate.push({
          isNow: isNowSecond[1],
          second: s
        })
      }
    },
    updateTime (whichDirect, data) {
      const index = whichDirect[0] === 'begin' ? 0 : 1
      if (whichDirect[1] === 'h') {
        this.timeDate[index].hour = data
      }
      if (whichDirect[1] === 'm') {
        this.timeDate[index].minute = data
      }
      if (whichDirect[1] === 's') {
        this.timeDate[index].second = data
      }
    },
    formatDateFilter (value, args) {
      const dt = new Date(value)
      if (args === 'yyyy-M-d') { // yyyy-M-d
        const year = dt.getFullYear()
        const month = dt.getMonth() + 1
        const date = dt.getDate()
        return `${year}-${month}-${date}`
      } else if (args === 'yyyy-M-d H:m:s' || args === 'yyyy-M-d h:m:s') { // yyyy-M-d H:m:s
        const year = dt.getFullYear()
        const month = dt.getMonth() + 1
        const date = dt.getDate()
        const hour = dt.getHours()
        const minute = dt.getMinutes()
        const second = dt.getSeconds()
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`
      } else if (args === 'yyyy-MM-dd') { // yyyy-MM-dd
        const year = dt.getFullYear()
        const month = (dt.getMonth() + 1).toString().padStart(2, '0')
        const date = dt.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${date}`
      } else {
        // yyyy-MM-dd HH:mm:ss
        const year = dt.getFullYear()
        const month = (dt.getMonth() + 1).toString().padStart(2, '0')
        const date = dt.getDate().toString().padStart(2, '0')
        const hour = dt.getHours().toString().padStart(2, '0')
        const minute = dt.getMinutes().toString().padStart(2, '0')
        const second = dt.getSeconds().toString().padStart(2, '0')
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "@/components/LuoDateTimePicker/LuoDateTimePicker.less";
</style>
