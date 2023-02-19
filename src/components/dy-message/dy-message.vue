<template>
    <transition name="dy-message-fade">
      <div class="dy-message" v-show="visible" :class = "computedClass" :style="computedStyle">
          <div class="dy-message-content">
            <span v-if="type">
              <dy-icon :name="computedIconName"></dy-icon>
            </span>
            {{ message }}
            <span class="close-btn" @click="closeMessage">
              <dy-icon name="icon-test44"></dy-icon>
            </span>
          </div>
      </div>
    </transition>
</template>

<script>
import dyIcon from '../dy-icon/dy-icon.vue'
export default {
  name: 'DyMessage',
  components: { dyIcon },
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'right'
    },
    type: {
      type: String,
      validator: value => {
        return ['success', 'error', 'warning', 'info'].includes(value)
      }
    }
  },
  data () {
    return {
      visible: false,
      Top: 0,
      offset: 16
    }
  },
  mounted () {
    if (this.autoClose) {
      this.leaveTime()
    }
    this.show()
  },
  methods: {
    show () {
      this.visible = true
      document.body.appendChild(this.$el)
    },
    closeMessage () {
      this.visible = false
    },
    leaveTime () {
      let timer = setTimeout(() => {
        this.visible = false
      }, this.duration)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timer)
        timer = null
      })
    }
  },
  computed: {
    computedIconName () {
      const ICONS = {
        success: 'icon-test43',
        error: 'icon-test46',
        warning: 'icon-test52',
        info: 'icon-test49'
      }
      return ICONS[this.type]
    },
    computedClass () {
      return {
        [`dy-message--${this.type}`]: this.type
      }
    },
    computedStyle () {
      return {
        top: this.Top + 'px',
        ...this.isLeftRight && {
          [`${this.position}`]: this.offset + 'px'
        },
        ...this.isCenter && {
          left: '50%',
          marginLeft: '-190px'
        }
      }
    },
    isLeftRight () {
      return this.position === 'left' || this.position === 'right'
    },
    isCenter () {
      return this.position === 'center'
    }
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  },
  watch: {
    visible (flag) {
      if (!flag) {
        this.$el.addEventListener('transitionend', () => {
          this.$destroy()
        })
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./dy-message.less";
</style>
