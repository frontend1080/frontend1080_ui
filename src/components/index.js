// 这个文件用于导出所有components目录下的.vue组件，在main.js中已经导入它并全局注册所有组件
// const files = require.context('@/components', true, /_fe$/)
// const components = {}
// files.keys().forEach(key => {
//   components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
// })
// const install = (Vue) => {
//   for (const i in components) {
//     Vue.component(components[i].name, components[i])
//   }
// }

// export default {
//   install,
//   components

// }

// 这种方式实现了全局导入或按需导入
import Wbutton from './w-button'

import Wheader from './w-header'

// 加上你们自己的导入语句导入自己的组件
const components = {
  Wheader,
  Wbutton
}
const install = (Vue) => {
  for (const i in components) {
    Vue.component(components[i].name, components[i])
  }
}
export default {
  install,
  components
}
export {
  Wheader,
  Wbutton
}
