// 这种方式实现了全局导入或按需导入
import Wbutton from './w-button'

import Wheader from './w-header'

import LuoDateTimePicker from '@/components/LuoDateTimePicker'

import LuoSideNavigation from '@/components/LuoSideNavigation'

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
  LuoDateTimePicker,
  LuoSideNavigation
}
const install = (Vue) => {
  for (const i in components) {
    Vue.use(components[i])
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
  LuoDateTimePicker,
  LuoSideNavigation
}
