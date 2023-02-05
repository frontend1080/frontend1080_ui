<template>
  <div class="main">
    <!-- 单选/多选功能 -->
  <div class="dropdown" v-if="!cascade">
      <div class="dropdown-label" @click="showOptions = !showOptions">
        {{selectedOptions.length ? selectedOptions.join(', ') : placeholder}}
        <span v-if="!showOptions" class="arrow">▼</span>
        <span v-else class="arrow">▲</span>
      </div>
      <transition name="show">
        <ul v-if="showOptions" class="options">
          <div v-for="group in options" v-bind:key="group">
            <template v-if="group.label">
              <div class="group-label">{{group.label}}</div>
            </template>
            <li v-for="option in group.options"
            @click="mutipile===false?onlySelected(option):selectOption(option)"
            v-bind:key="option"
            >
            <span v-if="selectedOptions.includes(option)">✓</span> {{option}}
          </li>
        </div>
      </ul>
      </transition>
    </div>

    <!-- 此处实现级联功能 -->
    <div class="dropdown" v-if="cascade">
      <div class="dropdown-label" @click="showLevel1 = !showLevel1">
        {{selectedLevel1.length ? selectedLevel1 : placeholder}}
        <span v-if="!showLevel1" class="arrow">▼</span>
        <span v-else class="arrow">▲</span>
      </div>
      <transition name="show">
        <ul v-if="showLevel1" class="options">
          <li v-for="option1 in options" @click="selectLevel1(option1)" v-bind:key="option1">{{ option1.label }}</li>
        </ul>
      </transition>
    </div>
    <!-- 二级 -->
    <div class="dropdown">
    <div class="dropdown-label" @click="showLevel2 = !showLevel2">
      {{selectedLevel2.length ? selectedLevel2 : placeholder}}
      <span v-if="!showLevel2" class="arrow">▼</span>
      <span v-else class="arrow">▲</span>
    </div>
    <transition name="show">
      <ul v-if="selectedLevel1.length > 0 && showLevel2 === true" class="options">
        <li v-for="option2 in options2" @click="selectLevel2(option2)" v-bind:key="option2">{{ option2 }}</li>
      </ul>
    </transition>
  </div>

  </div>
  </template>

<script>
// import axios from 'axios';
export default {
  name: 'yft-dropDown',
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
    mutipile: {
      type: Boolean,
      default: false
    },
    // 设置级联
    cascade: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showOptions: false, // 记录下拉选择状态
      selectedOptions: [], // 记录当前选项状态
      // 级联
      selectedLevel1: '', // 一级选项
      selectedLevel2: '', // 二级选项
      showLevel1: false,
      showLevel2: false
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
  .main {
    display: flex;
  }
  .dropdown {
    position: relative;
    height: 30px;
    width: 200px;
  }

  .dropdown-label {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    text-align: center;
    border-radius: 5px;
    color:#9a9a9a
  }

  .arrow {
    float: right;
  }

  .options {
    position: absolute;
    /* top: 100%; */
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 10;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 5px;
  }

  .options li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .options li:hover {
    background-color: #eaf2ff;
  }

  .group-label{
    height: 30px;
    background-color: #cccccc;
    text-align: center;
    line-height: 30px;
  }

  .show-enter-active, .show-leave-active {
    transition: opacity .6s;
  }

  .show-enter, .show-leave-to {
    opacity: 0;
  }
  </style>
