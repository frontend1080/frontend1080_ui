# 组件 yft-avator 使用说明
## 功能总览
  * 支持形状修改
  * 支持大小修改

## 相关参数

  | 参数                     | 说明             | 类型        | 可选值                              | 默认值           |
  | ------------------------ | ---------------- | ----------- | ---------------------------------- | ---------------- |
  | `src`                    | 头像路径         | `String`   | `必选`                         |                          |
  | `alt`                    | 默认显示内容     | `String`  | 如 `请选择`                                  | `请选择图片`           |
  | `shape`                  | 头像形状         | `String` | `square`、`circle`                   | `circle`                  |
  | `size`                   | 头像大小         | `String` | `large`、`small`                     | `normal`                  |

## 使用示例
```
<template>
  <yft-avator
   :src="src"
   alt="请选择图片"
   shape="square"
   size="large"
   />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
        src: 'https://img2.baidu.com/it/u=3871150760,2588696294&fm=253&fmt=auto&app=138&f=PNG?w=256&h=256',
    }
  }
}
</script>

<style lang="less" scoped>

</style>
```
