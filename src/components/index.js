// 这种方式实现了全局导入或按需导入
import Wbutton from './w-button_fe'

import Wheader from './w-header_fe'

import LuoDateTimePicker from '@/components/LuoDateTimePicker/component/LuoDateTimePicker'

import YdropDown from './yft-dropDown'

import Yavator from './yft-avator'

import DYMessage from '@/components/dy-message'

import DYIcon from '@/components/dy-icon'

import DYUploader from './dy-uploader'
// 加上你们自己的导入语句导入自己的组件
const components = {
  Wheader,
  Wbutton,
  YdropDown,
  Yavator,
  DYMessage,
  DYIcon,
  DYUploader,
  LuoDateTimePicker
}
const install = (Vue) => {
  for (const i in components) {
    if (components[i].name !== 'dy-message') {
      Vue.component(components[i].name, components[i])
    } else { Vue.use(components[i]) }
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
  Yavator,
  DYMessage,
  DYIcon,
  DYUploader,
  LuoDateTimePicker
}
