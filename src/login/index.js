import getCode from './get-code'
import getToken from './get-token-from-code'

const login = () => {
  return new Promise((resolve, reject) => {
    getCode().then((code) => {
      getToken(code).then((token) => {
        resolve(token)
      }).catch(reject)
    }).catch(reject)
  })
}

export default login;
