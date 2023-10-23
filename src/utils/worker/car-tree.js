import { arrayToTreeFn, patTreeFn } from "@/utils/tool";

const getTreeFn = (arr) => {
  return arrayToTreeFn(arr, "id", "pid")
}

const setAncestorKeysFn = (tree, ancestorKeys = []) => {
  tree.forEach(item => {
    item.ancestorKeys = ancestorKeys.join(',')
    const { children } = item
    if (children && children.length) {
      const keys = [...ancestorKeys, item.id]
      setAncestorKeysFn(children, keys)
    }
  })
}

self.addEventListener('message', (e) => {
  const arr = JSON.parse(e.data)
  const tree = getTreeFn(arr)
  setAncestorKeysFn(tree)
  const patTree = patTreeFn(tree)

  const msg = JSON.stringify({
    tree,
    patTree
  })
  self.postMessage(msg);
}, false);