# PC端微信扫码登录
## 支持平台：PC
## 开发前置条件
1. **微信开放平台**（_不是微信公众平台_） 配置应用以及登录成功后的重定向地址(应用系统的域名地址)；
2. **微信开放平台**（_不是微信公众平台_）的appid、appsecret；
## 使用步骤
1. `index.html` 头部引入 `wxLogin.js`
```html
<script src="./wxLogin.js"></script>
```
2. 引入组件
```js
import WXQRCodeLogin from './WXQRCodeLogin/index.vue';
<template>
    <WXQRCodeLogin :appId="[appId]" :redirectUrl="[redirectUrl]"></WXQRCodeLogin>
</template>
```
3. 针对现有系统，需要修改二维码的样式，改变**href 属性**

    3.1 base64: 对样式进行base64编码: `data:text/css;base64,******`

    3.2 url: 直接防止css url.

```css
.old-template {width:300px;margin-top:60px;}
.impowerBox .qrcode {width:250px;cursor:pointer;}
.impowerBox .title {display:none;}
.impowerBox .info {width:200px;}
.status_icon {display:none;}
.impowerBox .status {text-align:center;color:#43425D;margin-top:20px;display:block;} 
.impowerBox .info #wx_default_tip {display:none;}
.impowerBox .info #wx_after_scan p {display:none;}
```
