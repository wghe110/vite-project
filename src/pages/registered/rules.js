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
}

export default rules