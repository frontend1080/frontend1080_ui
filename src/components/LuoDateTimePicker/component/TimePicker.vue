<template>
  <div class="date-select">
    <div class="date-select__time">
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
                    timeData[0].hour === h.hour && 'time-selected'
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
                  timeData[0].minute === m.minute && 'time-selected'
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
                  timeData[0].second === s.second && 'time-selected'
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
                  timeData[1].hour === h.hour && 'time-selected'
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
                  timeData[1].minute === m.minute && 'time-selected'
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
                  timeData[1].second === s.second && 'time-selected'
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
          @click="selectDate"
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
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    dateData: {
      type: Array,
      default: () => []
    },
    time: {
      type: Array,
      default: () => []
    },
    isAllowSelectArea: {
      type: Boolean,
      default: false
    }
  },
  created () {
    const startTime = this.time[0].split(':')
    const endTime = this.time[1].split(':')
    this.timeData.push({
      hour: startTime[0],
      minute: startTime[1],
      second: startTime[2]
    }, {
      hour: endTime[0],
      minute: endTime[1],
      second: endTime[2]
    })
    this.getTimeDate()
  },
  computed: {
    coutLeftTime () {
      return `${this.timeData[0].hour} : ${this.timeData[0].minute} : ${this.timeData[0].second}`
    },
    coutRightTime () {
      return `${this.timeData[1].hour} : ${this.timeData[1].minute} : ${this.timeData[1].second}`
    }
  },
  data () {
    return {
      beginHourDate: [],
      beginMinuteDate: [],
      beginSecondDate: [],
      endHourDate: [],
      endMinuteDate: [],
      endSecondDate: [],
      hour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23'],
      minuteOrSecond: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
        '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33',
        '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46',
        '47', '48', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58',
        '59'],
      timeData: []
    }
  },
  methods: {
    updateTime (whichDirect, data) {
      const index = whichDirect[0] === 'begin' ? 0 : 1
      if (whichDirect[1] === 'h') {
        this.timeData[index].hour = data
      }
      if (whichDirect[1] === 'm') {
        this.timeData[index].minute = data
      }
      if (whichDirect[1] === 's') {
        this.timeData[index].second = data
      }
    },
    selectDate () {
      const startTime = this.timeData[0].hour + ':' + this.timeData[0].minute + ':' + this.timeData[0].second
      const endTime = this.timeData[1].hour + ':' + this.timeData[1].minute + ':' + this.timeData[1].second
      this.$emit('select-date', startTime, endTime)
    },
    confirm () {
      const startTime = this.timeData[0].hour + ':' + this.timeData[0].minute + ':' + this.timeData[0].second
      const endTime = this.timeData[1].hour + ':' + this.timeData[1].minute + ':' + this.timeData[1].second
      this.$emit('confirm', startTime, endTime)
    },
    getTimeDate () {
      for (const h of this.hour) {
        this.beginHourDate.push({
          hour: h
        })
        this.endHourDate.push({
          hour: h
        })
      }
      for (const m of this.minuteOrSecond) {
        this.beginMinuteDate.push({
          minute: m
        })
        this.endMinuteDate.push({
          minute: m
        })
      }
      for (const s of this.minuteOrSecond) {
        this.beginSecondDate.push({
          second: s
        })
        this.endSecondDate.push({
          second: s
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "@/components/LuoDateTimePicker/component/LuoDateTimePicker.less";
</style>
