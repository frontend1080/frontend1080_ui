// 这种方式实现了全局导入或按需导入
import Wbutton from './w-button'

import Wheader from './w-header'

import YdropDown from './yft-dropDown'

import Yavator from './yft-avator'
// 加上你们自己的导入语句导入自己的组件
const components = {
  Wheader,
  Wbutton,
  YdropDown,
  Yavator
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
  Wbutton,
  YdropDown,
  Yavator
}
