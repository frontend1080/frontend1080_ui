## 日期选择器（LuoDateTimerPicker）

**功能总览**

* 支持日期、时间、日期时间选择
* 支持日期、时间、日期时间的范围选择
* 支持设定最大/最小不可选日期
* 支持部分 format 参数（附后）

**相关参数: 一定要仔细确认 format 的时间（time）部分是否与使用预期相符。如不需要具体时间信息，建议 format 使用不包含时间的类型。value 的初始绑定值也要符合以上要求。**


**相关参数**

| 参数                     | 说明             | 类型                           | 可选值                | 默认值         | 案例                                                                                        |
| ------------------------ | ---------------- | ------------------------------ | --------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| `value`                | 传入的时间       | 包含两个时间字符串的 `Array` |                       |                | `['2022-01-20', '2022-11-12']` 或<br />`['2022-01-20 12:22:22', '2022-11-12 13:55:55']` |
| `is-allow-select-area` | 是否支持范围选择 | `boolean`                    | `true` 或?`false` | `true`       |                                                                                             |
| `is-need-time`         | 是否支持时间选择 | `boolean`                    | `true` 或?`false` | `true`       |                                                                                             |
| `min-date`             | 最小可选择时间   | `Number`                     | 十位时间戳            | `0`          |                                                                                             |
| `max-date`             | 最大可选择时间   | `Number`                     | 十位时间戳            | `0`          |                                                                                             |
| `format`               | 时间格式化形式   | `string`                     | 如 `yyyy-MM-dd`     | `yyyy-MM-dd` |                                                                                             |
| `width`                | 输入框宽度       | `string`                     |                       | `343px`      | `200px`?`100%`                                                                         |
| `height`               | 输入框高度       | `string`                     |                       | `30px`       | `200px`?`100%`                                                                         |
| `font-size`            | 输入框字号       | `string`                     |                       | `17px`       | `200px`                                                                                   |
| `font-color`           | 输入框字体颜色   | `string`                     |                       | `black`      | `black`                                                                                   |

| format 参数                                        | 说明案例               |
| -------------------------------------------------- | ---------------------- |
| `yyyy-M-d` 或?`yyyy-MM-dd`                     | 2022-5-5 或 2022-05-05 |
| `yyyy-M-d H:m:s` 或?`yyyy-M-d h:m:s`           | 2022-5-4 5:4:3         |
| `yyyy-MM-dd HH:mm:ss` 或?`yyyy-mm-dd hh:mm:ss` | 2022-05-04 00:00:00    |

**事件钩子**

| 事件名称       | 说明             | 回调参数                                                    |
| -------------- | ---------------- | ----------------------------------------------------------- |
| `changeDate` | 选择日期后的回调 | 两个时间（startTime, endTime）, 如无范围选择，则endTime为空 |


**使用案例**

```
<template>
  <div id="app">
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
      selectData: ['2023-01-11 22:22:22', '2023-01-15 22:22:22'],
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

```
