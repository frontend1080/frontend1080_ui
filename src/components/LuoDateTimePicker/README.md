## ����ѡ������LuoDateTimerPicker��

**��������**

* ֧�����ڡ�ʱ�䡢����ʱ��ѡ��
* ֧�����ڡ�ʱ�䡢����ʱ��ķ�Χѡ��
* ֧���趨���/��С����ѡ����
* ֧�ֲ��� format ����������


**��ز���**

| ����                     | ˵��             | ����                           | ��ѡֵ                | Ĭ��ֵ         | ����                                                                                        |
| ------------------------ | ---------------- | ------------------------------ | --------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| `value`                | �����ʱ��       | ��������ʱ���ַ����� `Array` |                       |                | `['2022-01-20', '2022-11-12']` ��<br />`['2022-01-20 12:22:22', '2022-11-12 13:55:55']` |
| `is-allow-select-area` | �Ƿ�֧�ַ�Χѡ�� | `boolean`                    | `true` ��?`false` | `true`       |                                                                                             |
| `is-need-time`         | �Ƿ�֧��ʱ��ѡ�� | `boolean`                    | `true` ��?`false` | `true`       |                                                                                             |
| `min-date`             | ��С��ѡ��ʱ��   | `Number`                     | ʮλʱ���            | `0`          |                                                                                             |
| `max-date`             | ����ѡ��ʱ��   | `Number`                     | ʮλʱ���            | `0`          |                                                                                             |
| `format`               | ʱ���ʽ����ʽ   | `string`                     | �� `yyyy-MM-dd`     | `yyyy-MM-dd` |                                                                                             |
| `width`                | �������       | `string`                     |                       | `343px`      | `200px`?`100%`                                                                         |
| `height`               | �����߶�       | `string`                     |                       | `30px`       | `200px`?`100%`                                                                         |
| `font-size`            | ������ֺ�       | `string`                     |                       | `17px`       | `200px`                                                                                   |
| `font-color`           | �����������ɫ   | `string`                     |                       | `black`      | `black`                                                                                   |

| format ����                                        | ˵������               |
| -------------------------------------------------- | ---------------------- |
| `yyyy-M-d` ��?`yyyy-MM-dd`                     | 2022-5-5 �� 2022-05-05 |
| `yyyy-M-d H:m:s` ��?`yyyy-M-d h:m:s`           | 2022-5-4 5:4:3         |
| `yyyy-MM-dd HH:mm:ss` ��?`yyyy-mm-dd hh:mm:ss` | 2022-05-04 00:00:00    |

**�¼�����**

| �¼�����       | ˵��             | �ص�����                                                    |
| -------------- | ---------------- | ----------------------------------------------------------- |
| `changeDate` | ѡ�����ں�Ļص� | ����ʱ�䣨startTime, endTime��, ���޷�Χѡ����endTimeΪ�� |


**ʹ�ð���**

```javascript
<template>
  <div id="app">
    <h2>����app�����</h2>
    <div style="width: 500px;margin: auto;">
      <LuoDateTimerPicker
        v-model="selectData"
        :is-allow-select-area="true"
        :is-need-time="true"
        :min-date="1675267200"
        :max-date="1676822400"
        :format="formatData"
        @change="changeDate"
      />
    </div>
  </div>
</template>

<script>
import LuoDateTimerPicker from './components/LuoDateTimePicker/component/LuoDateTimePicker'
export default {
  name: 'App',
  component: {
    LuoDateTimerPicker
  },
  data () {
    return {
      selectData: ['2023-01-11 22:22:22', '2023-01-15 22:22:22'],
      formatData: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  methods: {
    changeDate (startTime, endTime) {
      console.log(startTime, endTime)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

```
