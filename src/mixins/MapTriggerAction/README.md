# H5 唤起导航APP
## 支持平台：H5
## 开发前置条件
1. 安装第三方包
`npm install coordtransform`

## 使用方法
```js
// 引入Mixin
import NavigationMixin from '@/MapTriggerAction/mixin.js';

export default {
  mixins: [NavigationMixin],

  methods: {
    updateFromAndToParams() {
      // 1. 设置起点、终点参数
      this.from = [120.703504, 31.300952];
      this.to  = {
        lonEnd: 120.72891988787319,
        latEnd: 31.339552987048933,
        region: "",
        destination: ""
      };
      // 2.设置导航方式
      this.openWay = "高德地图";
      // 3. 调用导航方法
      this.goNavigation();
    }
  }
}
```