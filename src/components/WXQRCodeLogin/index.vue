<template>
    <div id="wxQRCodeLogin"></div>
</template>

<script>
export default {
    name: 'WXQRCodeLogin',
    props: {
        /**
         * 微信开发平台appId
         */
        appId: String,
        /**
         * 登录成功后的重定向地址
         */
        redirectUrl: String,
    },
    methods: {
        /**
         * 生成微信登录二维码
         */
        initWXLoginQRCode() {
            // 微信扫码自定义样式：对源文件[qrcode.css], 进行base64编码
            try {
                const cssText = "data:text/css;base64,Ci5vbGQtdGVtcGxhdGUge3dpZHRoOjMwMHB4O21hcmdpbi10b3A6NjBweDt9Ci5pbXBvd2VyQm94IC5xcmNvZGUge3dpZHRoOjI1MHB4O2N1cnNvcjpwb2ludGVyO30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5Om5vbmU7fQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6MjAwcHg7fQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6bm9uZTt9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiM0MzQyNUQ7bWFyZ2luLXRvcDoyMHB4O2Rpc3BsYXk6YmxvY2s7fSAKLmltcG93ZXJCb3ggLmluZm8gI3d4X2RlZmF1bHRfdGlwIHtkaXNwbGF5Om5vbmU7fQouaW1wb3dlckJveCAuaW5mbyAjd3hfYWZ0ZXJfc2NhbiBwIHtkaXNwbGF5Om5vbmU7fQ==";
                setTimeout(() => {
                    const obj = new WxLogin({
                        self_redirect: false, // 默认为false(保留当前二维码)  true(当前二维码所在的地方通过iframe 内跳转到 redirect_uri)
                        id: 'wxcode',
                        appid: this.appId,
                        scope: 'snsapi_login',
                        redirect_uri: encodeURIComponent(this.redirectUrl), //扫完码授权成功跳转到的路径
                        state: window.location.href,
                        style: "white", // 提供"black"、"white"可选，默认为黑色文字描述
                        href: cssText,
                        fast_login: 0,
                    });
                });
            } catch (e) {
                console.error(`生成微信登录二维码错误：${JSON.stringify(e)}`);
            }
        }
    },
    mounted() {
        this.initWXLoginQRCode();
    }
}
</script>