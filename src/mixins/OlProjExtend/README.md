# 坐标转换 - 对 ol/proj 进行拓展
## 支持平台：PC/H5
1. 安装第三方包
`npm install ol, proj4`
## 使用方法
```js
// 添加坐标转换
this.initProjTransforms();

console.log('-------------- 对苏州独立坐标进行转换 -----------------');
const lnglat = ol.transform([lon, lat], 'EPSG:1001', 'EPSG:4490');
console.log('转化后的经纬度：', JSON.stringify(lnglat));
console.log('-------------- 对苏州独立坐标进行转换 -----------------');
```
