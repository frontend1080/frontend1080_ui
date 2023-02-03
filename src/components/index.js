// 这种方式实现了全局导入或按需导入
import Wbutton from './w-button'

import Wheader from './w-header'

// import DYMessage from '@/components/dy-message'

import DYIcon from '@/components/dy-icon'
// 加上你们自己的导入语句导入自己的组件
const components = {
  Wheader,
  Wbutton,
  // DYMessage,
  DYIcon
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
  // DYMessage,
  DYIcon
}
