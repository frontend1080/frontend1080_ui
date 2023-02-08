const formatDateFilter = function (value, args) {
  if (!value) {
    return
  }
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
const judgeDayType = function (classList) { // 判断当前点击的日期是上个月，这个月，还是当前月份的
  let dayType = 'currMonth'
  if (classList.contains('prev-month')) {
    dayType = 'prevMonth'
  } else if (classList.contains('next-month')) {
    dayType = 'nextMonth'
  }
  return dayType
}
const getMonthData = function (range, year, month, preMonthDayCount, lastDayOfLastMonth, lastDayOfCurrMonth) {
  const ret = []
  let date, showDate, currMonth
  for (let i = 0; i < range; i++) {
    date = i + 1 - preMonthDayCount // 本月的几号
    showDate = date
    currMonth = month
    if (date <= 0) {
      currMonth = month - 1
      showDate = lastDayOfLastMonth + date // 上个月的第几号
    } else if (date > lastDayOfCurrMonth) {
      currMonth = month + 1
      showDate = showDate - lastDayOfCurrMonth // 下个月的第几号
    }
    const fixDate = fixMonthToYear(year, currMonth)
    const today = new Date()
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
}
const fixMonthToYear = function (year, month) {
  if (month === 0) { // 若本月为 1 月，则上一月为 12 月
    month = 12
    year -= 1
  }
  if (month === 13) { // 若本月为 12 月，则下一月为 1 月
    month = 1
    year += 1
  }
  year = year || 0
  return { year, month }
}
const setStartEndDate = function (dayType, dom, vm) { // 设置开始和结束日期
  const day = dom.innerHTML
  let clickDate = null
  let fixDate = null
  switch (dayType) {
    case 'currMonth':
      fixDate = fixMonthToYear(vm.year, vm.month)
      break
    case 'prevMonth':
      fixDate = fixMonthToYear(vm.year, vm.month - 1)
      break
    case 'nextMonth':
      fixDate = fixMonthToYear(vm.year, vm.month + 1)
      break
  }
  clickDate = new Date(fixDate.year, fixDate.month - 1, day)
  if (vm.isAllowSelectArea) {
    if (!vm.start || (vm.start && vm.end)) {
      vm.start = clickDate
      vm.end = null
    } else if (vm.start - clickDate === 0) {
      vm.end = vm.start
    } else if (vm.start - clickDate > 0) {
      vm.end = vm.start
      vm.start = clickDate
    } else {
      vm.end = clickDate
    }
  } else {
    vm.start = clickDate
    vm.end = null
  }
}
const setMonthDate = function (year, month, vm) {
  if (!year || !month) { // 若没有传入年月，则默认选择当前年月
    const today = new Date()
    year = today.getFullYear()
    month = today.getMonth() + 1 // 例如想要的是12月，getMonth() 会返回 11
  }
  const firstDateOfCurrMonth = new Date(year, month - 1, 1) // 获取当月第一天
  let weekOfFirstDate = firstDateOfCurrMonth.getDay() // 当月第一天是一周的星期几。那么之前的时间是上个月的
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
    range += 7
  } else if (allDayCount <= range - 7) {
    range -= 7
  }
  vm.monthData = getMonthData(range, year, month, preMonthDayCount, lastDayOfLastMonth, lastDayOfCurrMonth)
  vm.year = year
  vm.month = month
}
export {
  formatDateFilter,
  judgeDayType,
  getMonthData,
  fixMonthToYear,
  setStartEndDate,
  setMonthDate
}
