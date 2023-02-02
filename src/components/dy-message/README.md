##  全局提示Message（DYMessage）

### 功能总览

  * 支持全局消息提示
  * 支持不同类型消息提示
  * 支持自动关闭、手动关闭消息提示
  * 支持不同位置显示消息提示

### 相关参数

  | 参数                     | 说明             | 类型        | 可选值                              | 默认值           |
  | ------------------------ | ---------------- | ----------- | ---------------------------------- | ---------------- |
  | `message`              | 消息内容         | `String`  | 如`这是一条消息提示`                         | ``                       |
  | `type`                 | 消息内容类型     | `String`  | `success`、`error` 、`warning`、`info`       | `true`                   |
  | `duration`             | 自动删除时间     | `Number`  | 如 `3000`                                     | `3000`                    |
  | `autoClose`            | 是否自动删除     | `Boolean` | `true`、`false`                              | `true`                   |
  | `position`             | 消息显示位置     | `String`  | `left`、`right` 、`center`                   | `right`                  |

### 使用示例
```
<template>
  <div>
   <button @click="showMessage">点击我</button>
   <button @click="showMessage1">点击我</button>
  </div>
</template>

<script>

export default {
  methods: {
    showMessage () {
      this.$message({
        message: '我是一个message 消息提示',
        duration: 3000,
        autoClose: false,
        position: 'right',
        type: 'success'
      })
    },
    showMessage1 () {
      this.$message({
        message: '我是一个message 消息提示',
        duration: 3000,
        autoClose: true,
        position: 'center',
        type: 'info'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

```
