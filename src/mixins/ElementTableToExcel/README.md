# el-table 导出 Excel 数据
## 支持平台：PC
## 开发前置条件
1. 安装第三方包
`npm install element-ui, xlsx, file-saver`
## 使用方法
```html
<template>
    <div>
        <el-table id="exportTable"></el-table>
    </div>
</template>
```

```js
import TableToExcelMixin from '@/ElementTableToExcel/mixin.js';

export default {
    mixins: [TableToExcelMixin],

    methods: {
        exportTable() {
            this.exportTableToExcel('exportTableFileName', 'exportTable');
        }
    }
};
```
