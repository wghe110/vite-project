import mockData from "./10,000";
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

export const tree = getTreeFn(mockData)
setAncestorKeysFn(tree)

export const patTree = patTreeFn(tree)
