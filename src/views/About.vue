<template  lang="pug">
el-card
    div(slot="header")
      h3 关于坐骑网页版
    div 1.本平台基于百度云，部分文件下载可能限速
    div 2.官方QQ群 553683933
    div 3.给作者来杯咖啡钱，更有动力更新哟~
    el-row(type="flex")
      el-col
        img(src='../assets/wechat.png',title='请在新窗口打开以查看大图',alt='微信支付',height=300)
        img(src='../assets/alipay.png',title='请在新窗口打开以查看大图',alt='支付宝支付',height=300)
</template>