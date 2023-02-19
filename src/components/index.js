// 这种方式实现了全局导入或按需导入

import LuoDateTimePicker from '@/components/LuoDateTimePicker'

import LuoSideNavigation from '@/components/LuoSideNavigation'

import YftDropdown from './yft-dropDown'

import YftAvator from './yft-avator'

import DyMessage from '@/components/dy-message'

import DyIcon from '@/components/dy-icon'

import DyUploader from './dy-uploader'
// 加上你们自己的导入语句导入自己的组件
const components = {
  YftDropdown,
  YftAvator,
  DyMessage,
  DyIcon,
  DyUploader,
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
  YftDropdown,
  YftAvator,
  DyMessage,
  DyIcon,
  DyUploader,
  LuoDateTimePicker,
  LuoSideNavigation
}
