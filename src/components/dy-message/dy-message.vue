<template>
    <transition name="dy-message-fade">
      <div class="dy-message" v-show="visible" :style="computedStyle">
          <div class="dy-message-content">
            {{ message }}
            <span class="close-btn">
              <button @click="closeMessage">×</button>
              <!-- <dy-icon name="icon-test44" @click="closeMessage"></dy-icon> -->
            </span>
          </div>
      </div>
    </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      Top: 0
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      this.visible = true
      document.body.appendChild(this.$el)
    },
    closeMessage () {
      this.visible = false
      console.log(this.visible)
    }
  },
  computed: {
    computedStyle () {
      return {
        top: this.Top + 'px'
      }
    }
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  },
  watch: {
    visible (flag) {
      if (!flag) {
        console.log(flag)
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
