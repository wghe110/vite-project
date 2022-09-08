/**
 * 登录获取code
 * @returns code
 */
const getCode = () => {
  let provider = ''
  // #ifdef MP-WEIXIN
  provider = 'weixin'
  // #endif

  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '正在获取code',
      mask: true,
    })

    uni.login({
      provider,
      timeout: 20000,
      success: function (loginRes) {
        const { code } = loginRes;
        // 写入本地
        uni.setStorageSync('code', code)
        resolve(code)
      },
      fail() {
        reject()
      },
      complete() {
        uni.hideLoading()
      }
    })
  })
}

export default getCode