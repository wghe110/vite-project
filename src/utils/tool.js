import JSEncrypt from 'jsencrypt'

// 数据加密方法
const rsaPubKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0Jr1NzVUQMburkZT6Rkt0eaPmH8TN6E258l2tZMJgVCP/sL4oKjroKYmNPBkSSiLKFr9wwJqfesMeef6ChGRUXjG6DX0oxQRe0f5/UnyEm/NicJwz9xwkU34gbuo1VB/EA2QZ5dl1rj9iSsiqKLK6/QFlVuzslRdAXYZC79vprwIDAQAB'
export const encryptPassword = (str) => {
  let encryptor = new JSEncrypt()
  encryptor.setPublicKey(rsaPubKey)
  return encryptor.encrypt(str)
}