const rules = {
  uname: {
    rules: [
      {
        required: true,
        errorMessage: '请输入姓名',
      },
    ]
  },
  ID: {
    rules: [
      {
        required: true,
        errorMessage: '请输入身份证号',
      },
      {
        format: 'ID',
        errorMessage: '身份证件格式错误',
      },
    ]
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: '请输入手机号码',
      },
      {
        format: 'phone',
        errorMessage: '手机号码格式错误',
      },
    ]
  },
  email: {
    rules: [
      {
        required: true,
        errorMessage: '请输入邮箱',
      },
      {
        format: 'email',
        errorMessage: '邮箱格式错误',
      },
    ]
  },
  url: {
    rules: [
      {
        required: true,
        errorMessage: '请输入链接地址',
      },
      {
        format: 'url',
        errorMessage: '链接格式错误',
      },
    ]
  },
  reg: {
    rules: [
      {
        required: true,
        errorMessage: '请输入',
      },
      {
        pattern: /^[a-z]+$/,
        errorMessage: '请输入小写字母',
      },
    ]
  },
  opt: {
    rules: [
      {
        required: true,
        errorMessage: '请输入自定义',
      },
      {
        validateFunction(val) {
          const num = +val
          return num && num >= 3 && num <= 5;
        },
        errorMessage: '请输入3到5',
      },
    ]
  },
  vercode: {
    rules: [
      {
        required: true,
        errorMessage: '请输入校验码',
      },
    ]
  },
}

export default rules