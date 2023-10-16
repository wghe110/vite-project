// 获取树节点的祖先节点方法
const getParentIdsFn = (arr, id, parent = []) => {
  let aIds = []
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele.id === id) {
      aIds = parent
      break;
    } else if (ele.children && ele.children.length) {
      aIds = getParentIdsFn(ele.children, id, [...parent, ele.id])
      if (aIds.length) break;
    }
  }

  return aIds
}

export default getParentIdsFn