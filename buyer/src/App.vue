<script>
export default {
  // 在我们的项目中不需要用到这个小程序原生的生命周期函数，所以可以去掉。
  // created () {
  //   // 调用API从本地缓存中获取数据
  //   const logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  //
  //   console.log('app created and cache logs by setStorageSync')
  // }
}
</script>

<style>
  .container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
  }
</style>

<!--<style>-->
<!--.container {-->
  <!--height: 100%;-->
  <!--display: flex;-->
  <!--flex-direction: column;-->
  <!--align-items: center;-->
  <!--justify-content: space-between;-->
  <!--padding: 200rpx 0;-->
  <!--box-sizing: border-box;-->
<!--}-->
<!--/* this rule will be remove */-->
<!--* {-->
  <!--transition: width 2s;-->
  <!-- -moz-transition: width 2s;-->
  <!-- -webkit-transition: width 2s;-->
  <!-- -o-transition: width 2s;-->
<!--}-->
<!--</style>-->
