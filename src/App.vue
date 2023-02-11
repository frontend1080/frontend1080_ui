<template>
  <div id="app">
    <h2>这是app根组件</h2>
    <wts-button></wts-button>
    <wts-header></wts-header>
    <dy-icon name="icon-test44"></dy-icon>
    <button @click="showMessage">点击我</button>
  <luo-side-navigation
      :channels="channels"
      layout-way="col"
      width="200px"
      height="50vh"
      :active-channel="activeChannel"
      @to-channel="toChannel"
    />
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
    <yft-avator
   :src="src"
   alt="请选择图片"
   shape="square"
   size="large"
   />
   <yft-dropdown
   :options="options"
    placehoder="-------请选择-------"
   :multiple = "false"
   :isInput = "false"
   :cascade = "false"
   />
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

export default {
  name: 'App',
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
    toChannel (data) {
      this.activeChannel = data
    },
    changeDate (startTime, endTime) {
      console.log(startTime, endTime)
    },
    uploadError (msg) {
      this.$message({
        message: msg,
        autoClose: false,
        type: 'error'
      })
    }
  },
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
      activeChannel: '',
      selectData: ['2023-01-11 22:22:22', '2023-01-15 22:22:22'],
      formatData: 'yyyy-MM-dd HH:mm:ss',
      src: 'https://img2.baidu.com/it/u=3871150760,2588696294&fm=253&fmt=auto&app=138&f=PNG?w=256&h=256'
    }
  }
}
</script>

<style lang="less" scoped>
@import "./components/dy-uploader/dy-uploader.less";
</style>
