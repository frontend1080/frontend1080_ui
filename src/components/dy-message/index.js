import DYMessage from './dy-message.vue'

let instance
const instances = []
const Top = 16
let index = 0
export default {
  install (Vue) {
    function computedTop () {
      return instances.reduce((acc, cul) => {
        return cul.$el.offsetHeight + acc + Top
      }, Top)
    }

    function updateTop (instance) {
      let removeTop = instance.Top
      let i = 0
      console.log(instances)
      for (;i < instances.length; i++) {
        if (instances[i].id === instance.id) {
          break
        }
      }
      instances.splice(i, 1)
      for (;i < instances.length; i++) {
        instances[i].Top = removeTop
        removeTop = instances[i].Top
      }
    }

    function getInstance (options) {
      const Ctor = Vue.extend(DYMessage)

      instance = new Ctor({
        propsData: options
        // el: document.createElement('div')
      }).$mount(document.createElement('div'))

      instance.Top = computedTop()

      instance.id = 'message-' + index++

      instance.$once('close', function () {
        updateTop(instance)
      })
      return instance
    }

    function message (options) {
      const instance = getInstance(options)

      // instance.message = options.message

      document.body.appendChild(instance.$el)

      instances.push(instance)
    }

    Vue.prototype.$message = message
  }
}
