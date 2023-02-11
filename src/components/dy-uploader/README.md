##  上传Upload（DYUpload）

### 功能总览

  * 支持点击或拖拽上传图片
  * 支持上传后显示图片列表并调整
  * 支持限制上传类型、大小
  * 暂不支持上传至服务器、图片预览

### 相关参数

  | 参数                     | 说明             | 类型        | 可选值                              | 默认值           |
  | ------------------------ | ---------------- | ----------- | ---------------------------------- | ---------------- |
  | `multiple`              | 是否支持多选文件 | `Boolean`  | `true`、`false`                        |     `true`       |
  | `accept`                | 接受上传的文件类型 | `String`  |     -                             |          -          |
  | `size`            | 接受上传的文件最大大小    | `Number` | -                              | -                   |
  | `on-success`             | 文件上传成功时的钩子     | `function()`  | -                   | -                 |
  | `on-error`                 | 文件上传失败时的钩子     | `function()`  | -       | -                   |

#### slot
| name                    | 说明             |
| ------------------------ | ---------------- |
| `tips`              | 提示说明文字 | 

### 使用示例
```
<template>
   <div>
    <dy-uploader accept="image/png, image/jpeg" :size="500*1024" :multiple="true" :on-success="uploadSuccess" :on-error="uploadError">
      <div class="uploader-area" slot="uploader-area">
        <dy-icon name="icon-test17"></dy-icon>
        <div class="dy-uploader--text">将文件拖到此处，或<em>点击上传</em></div>
      </div>
      <div class="dy-uploader--tip" slot="tips">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </dy-uploader>
   </div>
</template>

<script>
import dyIcon from '@/components/dy-icon'
export default {
  components:{dyIcon}
  methods: {
    uploadSuccess () {

    },
    uploadError (msg) {
      this.$message({
        message: msg,
        autoClose: false,
        type: 'error'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./components/dy-uploader/dy-uploader.less";
</style>


```
