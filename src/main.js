import Vue from 'vue'
import App from './App.vue'
// 全部导入
import Allui from '@/components'
import DYMessage from '@/components/dy-message'
Vue.use(Allui)
Vue.use(DYMessage)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
