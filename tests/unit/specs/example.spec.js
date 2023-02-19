/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import App from '@/App'

describe('App.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = '这是app根组件'
    const wrapper = shallowMount(App)
    expect(wrapper.text()).toMatch(msg)
  })
})
