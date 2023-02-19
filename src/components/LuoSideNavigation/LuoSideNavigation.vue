<template>
  <ul :class="['side-navigation',
    layoutWay === 'col' && 'side-navigation-col',
    layoutWay === 'row' && 'side-navigation-row'
    ]"
      :style="css"
  >
    <li
      v-for="(channel, index) in channels"
      :key="index"
      :class="{
        active: channel.value === activeChannel
      }"
      @click="$emit('to-channel', channel.value)"
    >
      {{ channel.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'LuoSideNavigation',
  props: {
    channels: {
      type: Array,
      default: () => {
        return []
      }
    },
    activeChannel: {
      type: String,
      default: ''
    },
    layoutWay: {
      type: String,
      default: 'col'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: 'white'
    },
    backgroundActiveColor: {
      type: String,
      default: 'rgba(58, 123, 243, 0.78)'
    },
    liWidth: {
      type: String,
      default: '200px'
    },
    liHeight: {
      type: String,
      default: '30px'
    }
  },
  computed: {
    css () {
      return {
        '--width': this.lWidth,
        '--height': this.lHeight,
        '--background-color': this.backgroundColor,
        '--background-active-color': this.backgroundActiveColor,
        '--li-height': this.liHeight,
        '--li-width': this.liWidth
      }
    }
  },
  created () {
    if (!this.width) {
      this.lWidth = (this.layoutWay === 'col') ? '300px' : '100%'
    } else {
      this.lWidth = this.width
    }
    if (!this.height) {
      this.lHeight = (this.layoutWay === 'col') ? '100vh' : '100px'
    } else {
      this.lHeight = this.height
    }
  },
  data () {
    return {
      lWidth: '',
      lHeight: ''
    }
  }
}
</script>

<style scoped lang="less">
@width: var(--width);
@height: var(--height);
@background-color: var(--background-color);
@background-active-color: var(--background-active-color);
@li-height: var(--li-height);
@li-width: var(--li-width);

.side-navigation-col {
  width: @width;
  height: @height;
  list-style: none;
  background-color: @background-color;
  box-shadow: 0 0 10px rgba(128, 128, 128, 0.45);
  & > li {
    padding: 20px;
    color: black;
    font-size: 20px;
    cursor: pointer;
    height: @li-height;
    line-height: @li-height;
    border-radius: 5px;
    &:hover {
      font-weight: bold;
    }
    &.active {
      background: @background-active-color;
      color: white;
      font-weight: bold;
    }
  }
}
.side-navigation-row {
  width: @width;
  height: @height;
  list-style: none;
  display: flex;
  background-color: @background-color;
  box-shadow: 0 0 10px rgba(128, 128, 128, 0.45);
  & > li {
    padding: 20px;
    color: black;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    line-height: calc(@height - 40px);
    width: @li-width;
    text-align: center;
    &:hover {
      font-weight: bold;
    }
    &.active {
      background: @background-active-color;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
