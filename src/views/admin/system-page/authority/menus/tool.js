export const getAncestorIdsFn = (arr, id, atarget = []) => {
  const obj = arr.find(item => item.id === id)
  if (obj) {
    const { parentId } = obj
    if (parentId && parentId !== '0') {
      atarget.push(parentId)
      getAncestorIdsFn(arr, parentId, atarget)
    }
  }

  return atarget
}
