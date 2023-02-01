import Vue from 'vue'
import App from './App.vue'
// 全部导入
// import Allui from '@/components'
import DYMessage from './components/dy-message'
import DYIcon from './components/dy-icon'
Vue.use(DYMessage)
Vue.use(DYIcon)
// Vue.use(Allui)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
