const resHandle = (res) => {
  const { data } = res;
  return {
    flag: data.code === 200 || data.code === 0,
    data: data.data,
  }
}

const getToken = () => {
  return uni.getStorageSync('token') || ''
}

// 写入事件接口认证User-Type: C,区分移动/PC
const getEventToken = () => {
  return 'C'
}

// 下面对常用的请求进行简单封装
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data: {
        ...params
      },
      method: 'GET',
      header: {
        'Authorization': getToken(),
        'User-Type': getEventToken()
      },
      success: (res) => {
        const { flag, data } = resHandle(res)
        if (flag) {
          resolve(data)
        } else {
          reject(res)
        }
      }
    });
  })
}
const put = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data: {
        ...params
      },
      method: 'PUT',
      header: {
        'Authorization': getToken(),
        'User-Type': getEventToken()
      },
      success: (res) => {
        const { flag, data } = resHandle(res)
        if (flag) {
          resolve(data)
        } else {
          reject(res)
        }
      }
    });
  })
}
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      data: {
        ...params
      },
      method: 'POST',
      header: {
        'Authorization': getToken(),
        'User-Type': getEventToken()
      },
      success: (res) => {
        const { flag, data } = resHandle(res)
        if (flag) {
          resolve(data)
        } else {
          reject(res)
        }
      }
    });
  })
}

export default {
  get,
  post,
  put,
}
