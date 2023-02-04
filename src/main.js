import Vue from 'vue'
import App from './App.vue'
// 全部导入
import Allui from '@/components'
Vue.use(Allui)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
