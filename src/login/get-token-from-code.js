/**
 * 通过code获取token
 * @param {String} code 登录返回的code
 */
const getTokenFromCode = (code) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '正在获取token',
      mask: true,
    })

    setTimeout(() => {
      if (Math.random() > 0.5) {
        // 获取成功
        const token = 'this is token'
        uni.setStorageSync('token', token)
        resolve(token)
      } else {
        // 获取失败
        uni.setStorageSync('token', '')
        reject()
      }

      uni.hideLoading()
    }, 2000)
  })
}

export default getTokenFromCode