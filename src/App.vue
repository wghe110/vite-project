<script>
const isProd = import.meta.env.PROD // 是否生产环境

export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    text: 'text'
  }
}
</script>

<style>
/*每个页面公共css */
page {
  font-family: PingFangSC-Regular;
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  height: 100vh;
}

.opt-form .uni-forms-item {
  margin-bottom: 0;
}
</style>
