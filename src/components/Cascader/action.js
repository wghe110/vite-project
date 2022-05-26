export const addAncestorsFn = (arr, ancestors = []) => {
  return arr.map(item => {
    const { children, ...others } = item;
    const obj = {
      ...others,
      ancestors,
    }

    if (children && children.length) {
      obj.children = addAncestorsFn(children, ancestors.concat([{ ...others }]))
    }

    return obj;
  })
}

export const patArrayFn = (arr, target = []) => {
  arr.forEach(item => {
    target.push(item)
    const { children } = item;
    if (children && children.length) patArrayFn(children, target)
  })

  return target;
}