import JSEncrypt from 'jsencrypt'

// 数据加密方法
const rsaPubKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0Jr1NzVUQMburkZT6Rkt0eaPmH8TN6E258l2tZMJgVCP/sL4oKjroKYmNPBkSSiLKFr9wwJqfesMeef6ChGRUXjG6DX0oxQRe0f5/UnyEm/NicJwz9xwkU34gbuo1VB/EA2QZ5dl1rj9iSsiqKLK6/QFlVuzslRdAXYZC79vprwIDAQAB'
export const encryptPassword = (str) => {
  let encryptor = new JSEncrypt()
  encryptor.setPublicKey(rsaPubKey)
  return encryptor.encrypt(str)
}

// 扁平数组转成树
export function arrayToTreeFn(arr = [], id = 'id', parentId = 'parentId') {
  let res = []
  let map = new Map()

  for (const item of arr) {
    const val = {
      ...item,
      children: map.has(item[id]) ? map.get(item[id]).children : []
    }
    map.set(item[id], val)

    const newChild = map.get(item[id])
    if (item[parentId] === '0') {
      res.push(newChild)
    } else {
      if (!map.has(item[parentId])) {
        map.set(item[parentId], {
          children: []
        })
      }
      map.get(item[parentId]).children.push(newChild)
    }
  }
  return res
}

// 树拍平成一维数组
export const patTreeFn = (tree, target = []) => {
  tree.forEach(item => {
    const { children, ...others } = item
    target.push({
      ...others,
    })

    children && children.length && patTreeFn(children, target)
  })

  return target
}