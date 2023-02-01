# 组件 yft-dropDown 使用说明

## 属性说明
    可自定义的的属性有：
        1：options:定义选项内容 type: Array,必须定义
        2：selecOnly：设置下拉框支持单选/多选，默认单选（true）
### 使用方法
    1.在父组件中定义相关属性，例如：
        data() {
            return {
            options: [
                { text: 'Option 1', value: 'option1' },
                { text: 'Option 2', value: 'option2' },
                { text: 'Option 3', value: 'option3' },
            ],
            }
        }
    2.添加组件，例如：
        <yft-dropDown :options="options" :selectOnly = "false"/>