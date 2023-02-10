## 面包屑导航（LuoSideNavigation）

**功能总览**

* 支持导航栏目的选择
* 支持横向和纵向导航选择
* 支持设置背景色、宽、高等量

**相关参数**

| 参数                      | 说明                        | 类型                                                        | 可选值            | 默认值                       | 案例                                  |
| ------------------------- | --------------------------- | ----------------------------------------------------------- | ----------------- | ---------------------------- | ------------------------------------- |
| `channels`              | 导航栏栏目                  | 包含所有栏目的 `Array`,`title`是栏目名称，`value`是值 |                   |                              | `[{title: '你好',value: 'hello'}}]` |
| `activeChannel`         | 正选中的栏目                | 随计划而定，一般是 `channels`中的 `value`参数           |                   |                              | `hello`                             |
| `layout-way`            | 导航排布方向                | `String`                                                  | `col`或 `row` | `col`                      |                                       |
| `width`                 | 导航栏整体宽度              | `String`                                                  |                   | `null`                     | `200px`?`100%`                   |
| `height`                | 导航栏整体高度              | `String`                                                  |                   | `null`                     | `200px`?`100%`                   |
| `backgroundColor`       | 导航背景色                  | `String`                                                  |                   | `white`                    | `white`?`black`                  |
| `backgroundActiveColor` | 被选中栏目背景色            | `String`                                                  |                   | `rgba(58, 123, 243, 0.78)` | `white`?`black`                  |
| `liWidth`               | `row`横向排布下的栏目宽度 | `String`                                                  |                   | `200px`                    | `200px`?`100%`                   |
| `liHeight`              | `col`横向排布下的栏目高度 | `String`                                                  |                   | `30px`                     | `200px`?`100%`                   |



**事件钩子**

| 事件名称       | 说明             |
| -------------- | ---------------- |
| `to-channel` | 选中栏目后的回调 |

**使用案例**

```javascript
<template>
  <div id="app">
    <luo-side-navigation
      :channels="channels"
      layout-way="col"
      width="200px"
      height="50vh"
      :active-channel="activeChannel"
      @to-channel="toChannel"
    />
  </div>
</template>

<script>
import LuoSideNavigation from '@/components/LuoSideNavigation/LuoSideNavigation'

export default {
  name: 'App',
  components: {
    LuoSideNavigation
  },
  created () {
  },
  data () {
    return {
      channels: [
        {
          title: 'basicSettings',
          value: 'basic-settings'
        },
        {
          title: 'extraSettings',
          value: 'extra-settings'
        },
        {
          title: 'security',
          value: 'security'
        }
      ],
      activeChannel: ''
    }
  },
  methods: {
    toChannel (data) {
      this.activeChannel = data
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
}
</style>
```
