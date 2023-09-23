// 判断url是否携带token，如果有，写入本地
const initToken = (router) => {
  const { query: { token } } = router
  if (token) localStorage.setItem('token', token)
}

export default initToken