/**
 * 校验函数
 */
const validate = (rules, modelValue) => {
  const errRules = []
  const itemKeys = Object.keys(rules)

  itemKeys.forEach(key => {
    const aRule = rules[key].rules
    const val = modelValue[key]

    if (isEmpty(val, rules[key].type)) {
      // 为空时
      const requiredRule = aRule.find(item => item.required)
      if (requiredRule) errRules.push(requiredRule)
    } else {
      // 不为空的话，要校验所有规则
      aRule.forEach(rule => {
        if (!rule.required) {
          if (rule.format) {
            // 内置校验规则
            if (!formatValidate(val, rule.format)) errRules.push(rule)
          } else if (rule.pattern) {
            if (!rule.pattern.test(val)) errRules.push(rule)
            // 正则表达式校验
          } else if (rule.validateFunction) {
            // 自定义校验函数
            if (!rule.validateFunction(val)) errRules.push(rule)
          }
        }
      })
    }
  })

  if (!errRules.length) {
    return Promise.resolve(modelValue)
  } else {
    return Promise.reject(errRules)
  }
}
/**
 * 判断是否为空
 * @param {any} val 传入值
 * @param {type} type 类型
 * @returns boolean
 */
const isEmpty = (val, type = 'string') => {
  let flag = false;

  switch (type) {
    case 'string':
      flag = !val
      break;
    case 'number':
      flag = !val
      break;
    case 'array':
      flag = !(val && val.length)
      break;
    case 'object':
      flag = !Object.keys(val).length
      break;
    default:
      break;
  }

  return flag;
}

/**
 * 内置校验规则
 * @param {string|number} val 传入值 
 * @param {string} type 内置校验规则名称 
 * @returns boolean
 */
const formatValidate = (val, type) => {
  let reg;
  switch (type) {
    case 'phone':
      reg = /^(13[0-9]|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      break;
    case 'ID':
      reg = /^\d{6}((18|19\d{2})|(20[01]\d)|(202[012]))((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      break;
    case 'url':
      reg = /(?:https?:\/\/|www\.)+[a-z0-9\-\.]+\.[a-z]{2,5}(?:(?:\/|#|\?)[^\s]*)?/i
      break;
    case 'email':
      reg = /^\w+[a-z0-9A-Z]@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
      break;
    default:
      break;
  }

  return reg ? reg.test(val) : true;
}

export default validate;