<template>
  <div class="dropdown">
    <div class="dropdown-label" @click="showOptions = !showOptions">
      {{ selectedOption }}
      <span v-if="!showOptions" class="arrow">▼</span>
      <span v-else class="arrow">▲</span>
    </div>
    <!-- 点击现实选项 -->
    <transition name="show">
      <ul v-if="showOptions" class="options">
      <li v-if="!selectOnly">
        <input type="checkbox" v-model="allSelected" @click="selectAll" /> All
      </li>
      <li v-for="(option, index) in options" v-bind:key="index"
      @click="selectOnly===true?onlySelected(index):selectOption(index)">
        <input type="checkbox" v-model="selectedOptions[index]" /> {{ option }}
      </li>
    </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'yft-dropDown',
  props: {
  // 设置支持多选
    selectOnly: {
      default: true
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: '-------请选择-------'
    }
  },
  data () {
    return {
      showOptions: false, // 记录下拉选择状态
      selectedOption: this.placeholder,
      selectedOptions: [], // 记录当前选项状态
      allSelected: false, // 记录当前全选框状态
      totalSelected: 0 // 记录当前选中个数
    }
  },
  // 使用 watch 钩子监听两个数据的变化，实现了全选/全不选的功能。
  watch: {
    selectedOptions: {
      handler () {
        if (this.totalSelected === 0) {
          this.selectedOption = this.placeholder
        } else if (this.allSelected) {
          this.selectedOption = '选择全部'
        } else {
          this.selectedOption = `${this.totalSelected} 个被选中`
        }
      },
      deep: true
    },
    allSelected: {
      handler (val) {
        if (val) {
          this.selectedOptions = this.options.map(() => true)
          this.totalSelected = this.selectedOptions.length
        } else {
          this.selectedOptions = []
          this.totalSelected = 0
        }
      }
    }
  },
  methods: {
  // 单选功能，此处使用笨b方法
    onlySelected (index) {
      if (this.selectedOptions[index] !== true) {
        this.selectedOptions = []
        this.selectedOptions[index] = true
        this.totalSelected = 1
      } else {
        this.selectedOptions = []
        this.totalSelected = 0
        this.selectedOptions[index] = false
      }
    },
    // 多选功能
    selectOption (index) {
      this.$set(this.selectedOptions, index, !this.selectedOptions[index])
      this.totalSelected = 0
      for (let i = 0; i < this.selectedOptions.length; i++) {
        if (this.selectedOptions[i] === true) {
          this.totalSelected++
        }
      }
    },
    // 全选/全不选
    selectAll () {
      this.allSelected = !this.allSelected
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown {
  position: relative;
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
  top: 100%;
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

.options input[type="checkbox"] {
  margin-right: 10px;
}

.show-enter-active, .show-leave-active {
  transition: opacity .6s;
}

.show-enter, .show-leave-to {
  opacity: 0;
}
</style>
