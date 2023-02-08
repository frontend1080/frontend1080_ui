# 组件 yft-dropDown 使用说明
## 功能总览

  * 支持远程搜索
  * 支持多选
  * 支持多级联动选择
  * 支持选项分组

## 相关参数

  | 参数                     | 说明             | 类型        | 可选值                              | 默认值           |
  | ------------------------ | ---------------- | ----------- | ---------------------------------- | ---------------- |
  | `options`              | 选项内容         | `Array`   | `必选`详情看使用示例                         |                          |
  | `placeholder`          | 默认显示内容     | `String`  | 如 `请选择`                                  | `-------请选择-------`                    |
  | `multiple`             | 是否支持多选     | `Boolean` | `true`、`false`                              | `false`                   |
  | `isInput`              | 搜索下拉框     | `Boolean` | `true`、`false`                   | `false`                  |
  | `cascade`              | 是否支持级联     | `Boolean` | `true`、`false`                   | `false`                  |
### 关于options参数：
    1.若使用单选/多选功能：label: 为分组,options:为选项
    1.若使用级联功能：label: 为一级选项,options:为二级选项

## 使用示例
```
<template>
  <div id="app">
   <yft-dropDown 
   :options="options"
    placehoder="-------请选择-------" 
   :multiple = "false"
   :isInput = "false"
   :cascade = "false"
   />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      options: [
        {
          label: 'Fruits',
          options: ['Apple', 'Banana', 'Mango']
        },
        {
          label: 'Vegetables',
          options: ['Carrot', 'Potato', 'Tomato']
        }
      ],
    }
  }
}
</script>

<style lang="less" scoped>

</style>
```