export const config = {
  '/': 'http://10.32.132.81:8080/api'
}

export const getHostFn = (path) => {
  let host = ''

  const aPre = Object.keys(config)
  for (let key of aPre) {
    const reg = new RegExp(`^${key}\\S*$`)
    if (reg.test(path)) {
      host = config[key]
      break;
    }
  }

  return host;
}
