<template>
  <div class="main">
    <!-- 搜索功能 -->
    <template v-if="isInput">
      <div class="dropdown">
        <input  class="dropdown" v-model="query" @input="handleInput" @click="showOptions = !showOptions" placeholder="请输入"/>
        <transition name="show">
          <ul v-if="showOptions" class="options">
            <li v-for="(option,index) in results" :key="index" @click="selectInput(option)">{{ option }}</li>
          </ul>
        </transition>
      </div>
    </template>
    <!-- 级联功能-->
    <template v-else-if="cascade">
      <div class="dropdown" v-if="cascade">
        <div class="dropdown-label" @click="showLevel1 = !showLevel1">
          {{selectedLevel1.length ? selectedLevel1 : placeholder}}
          <span v-if="!showLevel1" class="arrow">▼</span>
          <span v-else class="arrow">▲</span>
        </div>
        <transition name="show">
          <ul v-if="showLevel1" class="options">
            <li v-for="(option1,index) in options" @click="selectLevel1(option1)" v-bind:key="index">{{ option1.label }}</li>
          </ul>
        </transition>
      </div>
      <!-- 二级 -->
      <div class="dropdown" v-if="cascade">
      <div class="dropdown-label" @click="showLevel2 = !showLevel2">
        {{selectedLevel2.length ? selectedLevel2 : placeholder}}
        <span v-if="!showLevel2" class="arrow">▼</span>
        <span v-else class="arrow">▲</span>
      </div>
      <transition name="show">
        <ul v-if="selectedLevel1.length > 0 && showLevel2 === true" class="options">
          <li v-for="(option2,index) in options2" @click="selectLevel2(option2)" v-bind:key="index">{{ option2 }}</li>
        </ul>
      </transition>
    </div>
    </template>
    <!-- 单选/多选功能 -->
    <template v-else>
        <div class="dropdown" v-if="!cascade">
      <div class="dropdown-label" @click="showOptions = !showOptions">
        {{selectedOptions.length ? selectedOptions.join(', ') : placeholder}}
        <span v-if="!showOptions" class="arrow">▼</span>
        <span v-else class="arrow">▲</span>
      </div>
      <transition name="show">
        <ul v-if="showOptions" class="options">
          <div v-for="(group,index) in options" v-bind:key="index">
            <template v-if="group.label">
              <div class="group-label">{{group.label}}</div>
            </template>
            <li v-for="(option,index) in group.options"
            @click="multiple===false?onlySelected(option):selectOption(option)"
            v-bind:key="index"
            >
            <span v-if="selectedOptions.includes(option)">✓</span> {{option}}
          </li>
        </div>
      </ul>
      </transition>
    </div>
    </template>
  </div>
  </template>

<script>
export default {
  name: 'YftDropdown',
  props: {
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: '-------请选择-------'
    },
    // 设置支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 设置搜索
    isInput: {
      type: Boolean,
      default: false
    },
    // 设置级联
    cascade: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showOptions: false, // 记录下拉选择状态
      selectedOptions: [], // 记录当前选项状态
      // 搜索
      query: '',
      results: [],
      // 级联
      selectedLevel1: '', // 一级选项
      selectedLevel2: '', // 二级选项
      showLevel1: false,
      showLevel2: false
    }
  },
  // 搜索回调
  mounted () {
    window.baidu = {
      sug: (json) => {
        this.results = json.s
      }
    }
  },
  // 绑定级联
  computed: {
    options2 () {
      return this.options.find(option1 => option1.label === this.selectedLevel1).options
    }
  },
  methods: {
    onlySelected (option) {
      this.selectedOptions.pop()
      this.selectedOptions.push(option)
    },
    // 多选功能
    selectOption (option) {
      const index = this.selectedOptions.indexOf(option)
      console.log(index)
      if (index === -1) {
        this.selectedOptions.push(option)
      } else {
        this.selectedOptions.splice(index, 1)
      }
    },
    // 搜索功能
    handleInput () {
      this.showOptions = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.search()
      }, 500)
    },
    search () {
      const script = document.createElement('script')
      script.src = `http://suggestion.baidu.com/su?wd=${this.query}&cd=baidu.sug`
      document.body.appendChild(script)
    },
    selectInput (option) {
      this.query = option
      this.showOptions = false
    },
    // 级联功能
    selectLevel1 (option1) {
      this.selectedLevel1 = option1.label
      this.showLevel1 = false
      this.selectedLevel2 = ''
    },
    selectLevel2 (option2) {
      this.selectedLevel2 = option2
      this.showLevel2 = false
    }
  }
}
</script>

  <style lang="less" scoped>
    @import "./yft-dropDown.less";
  </style>
