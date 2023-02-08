## ���м������LuoSideNavigation��

**��������**

* ֧�ֵ�����Ŀ��ѡ��
* ֧�ֺ�������򵼺�ѡ��
* ֧�����ñ���ɫ�����ߵ���

**��ز���**

| ����                      | ˵��                        | ����                                                        | ��ѡֵ            | Ĭ��ֵ                       | ����                                  |
| ------------------------- | --------------------------- | ----------------------------------------------------------- | ----------------- | ---------------------------- | ------------------------------------- |
| `channels`              | ��������Ŀ                  | ����������Ŀ�� `Array`,`title`����Ŀ���ƣ�`value`��ֵ |                   |                              | `[{title: '���',value: 'hello'}}]` |
| `activeChannel`         | ��ѡ�е���Ŀ                | ��ƻ�������һ���� `channels`�е� `value`����           |                   |                              | `hello`                             |
| `layout-way`            | �����Ų�����                | `String`                                                  | `col`�� `row` | `col`                      |                                       |
| `width`                 | ������������              | `String`                                                  |                   | `null`                     | `200px`?`100%`                   |
| `height`                | ����������߶�              | `String`                                                  |                   | `null`                     | `200px`?`100%`                   |
| `backgroundColor`       | ��������ɫ                  | `String`                                                  |                   | `white`                    | `white`?`black`                  |
| `backgroundActiveColor` | ��ѡ����Ŀ����ɫ            | `String`                                                  |                   | `rgba(58, 123, 243, 0.78)` | `white`?`black`                  |
| `liWidth`               | `row`�����Ų��µ���Ŀ��� | `String`                                                  |                   | `200px`                    | `200px`?`100%`                   |
| `liHeight`              | `col`�����Ų��µ���Ŀ�߶� | `String`                                                  |                   | `30px`                     | `200px`?`100%`                   |



**�¼�����**

| �¼�����       | ˵��             |
| -------------- | ---------------- |
| `to-channel` | ѡ����Ŀ��Ļص� |

**ʹ�ð���**

```javascript
<template>
  <div id="app">
    <luo-side-navigation
      :channels="channels"
      layout-way="col"
      width="200px"
      height="50vh"
      :active-channel="activeChannel"
      @to-channel="toChannel"
    />
  </div>
</template>

<script>
import LuoSideNavigation from '@/components/LuoSideNavigation/LuoSideNavigation'

export default {
  name: 'App',
  components: {
    LuoSideNavigation
  },
  created () {
  },
  data () {
    return {
      channels: [
        {
          title: 'basicSettings',
          value: 'basic-settings'
        },
        {
          title: 'extraSettings',
          value: 'extra-settings'
        },
        {
          title: 'security',
          value: 'security'
        }
      ],
      activeChannel: ''
    }
  },
  methods: {
    toChannel (data) {
      this.activeChannel = data
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
}
</style>
```
