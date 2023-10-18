
const patDataFn = (tree, pid = '0', target = []) => {
  tree.forEach(item => {
    const { children, value, ...others } = item
    target.push({
      value,
      ...others,
      pid
    })

    children && children.length && patDataFn(children, value, target)
  })

  return target
}

const setAncestorKeysFn = (tree, ancestorKeys = []) => {
  tree.forEach(item => {
    item.ancestorKeys = ancestorKeys.join(',')
    const { children } = item
    if (children && children.length) {
      const keys = [...ancestorKeys, item.value]
      setAncestorKeysFn(children, keys)
    }
  })
}

self.onmessage = function (e) {
  try {
    const tree = JSON.parse(e.data)
    setAncestorKeysFn(tree)
    const aPat = patDataFn(tree)
    self.postMessage(JSON.stringify(aPat))
  } catch (error) {
    debugger
    console.error(error)
  }
}