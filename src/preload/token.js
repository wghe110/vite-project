// 判断url是否携带token，如果有，写入本地
const initToken = (route) => {
  const { query: { token } } = route
  if (token) localStorage.setItem('token', token)
}

export default initToken