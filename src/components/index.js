// 这种方式实现了全局导入或按需导入
import Wbutton from './w-button_fe'

import Wheader from './w-header_fe'

import LuoDateTimePicker from '@/components/LuoDateTimePicker/component/LuoDateTimePicker'

// 加上你们自己的导入语句导入自己的组件
const components = {
  Wbutton,
  Wheader,
  LuoDateTimePicker
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
  LuoDateTimePicker
}
