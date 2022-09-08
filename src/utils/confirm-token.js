import login from '@/login/index'

let flag = true;

const confirmToken = () => {
  if (!flag) return;
  flag = false;

  uni.showModal({
    title: 'token已失效',
    content: '是否重新获取token',
    cancelText: '否',
    confirmText: '是',
    success(res) {
      if (res.confirm) {
        // console.log('用户点击确定');
        login().then(() => {
          uni.showToast({
            title: '获取token成功',
            duration: 2000
          });
        }).catch(() => {
          uni.showToast({
            title: '获取token失败',
            icon: 'error',
            duration: 2000
          });
        })
      } else if (res.cancel) {
        // console.log('用户点击取消');
      }
    },
    complete() {
      flag = true;
    }
  })
}

export default confirmToken