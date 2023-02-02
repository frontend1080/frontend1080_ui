/* eslint-disable prefer-const */
import DYMessage from './dy-message.vue'

let instances = []
let Top = 16
let index = 0
export default {
  install (Vue) {
    function computedTop (position) {
      let filterInstances = instances.filter(instance => instance.position === position)
      console.log(filterInstances)
      return filterInstances.reduce((acc, cul) => {
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
        [instances[i].Top, removeTop] = [removeTop, instances[i].Top]
      }
    }

    function getInstance (options) {
      const Ctor = Vue.extend(DYMessage)

      let instance = new Ctor({
        propsData: options
      }).$mount(document.createElement('div'))

      instance.Top = computedTop(instance.position)

      instance.id = 'message-' + index++

      instance.$once('close', function () {
        updateTop(instance)
      })
      return instance
    }

    function message (options) {
      const instance = getInstance(options)

      // instance.message = options.message

      instances.push(instance)
    }

    Vue.prototype.$message = message
  }
}
