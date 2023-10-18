import { mock } from 'mockjs'

const LEVEL = [50, 100, 100]

const aData = [{
  value: '0',
  label: '中电鸿信',
  children: []
}]

const createOrgFn = (pid) => {
  return {
    value: mock('@guid()'),
    label: mock('@cword(6)'),
    pid,
    children: []
  }
}

const createCarFn = (pid) => {
  return {
    value: mock('@guid()'),
    label: '苏A' + mock('@string("upper", 5)'),
    pid
  }
}

for (let i = 0; i < LEVEL[0]; i++) {
  const org_first = createOrgFn(0)
  aData[0].children.push(org_first)

  for (let j = 0; j < LEVEL[1]; j++) {
    const org_second = createOrgFn(org_first.vlaue)
    org_first.children.push(org_second)

    for (let k = 0; k < LEVEL[2]; k++) {
      const car = createCarFn(org_second.vlaue)
      org_second.children.push(car)
    }
  }
}

self.onmessage = function (e) {
  self.postMessage(JSON.stringify(aData))
}