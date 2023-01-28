// 这个文件用于导出所有components目录下的.vue组件，在main.js中已经导入它并全局注册所有组件
const files = require.context('@/components', true, /\.vue$/)
const components = {}
files.keys().forEach(key => {
  components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
const install = (Vue) => {
  for (const i in components) {
    Vue.component(components[i].name, components[i])
  }
}

export default {
  install,
  components

}
