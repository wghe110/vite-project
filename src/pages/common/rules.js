const rules = {
  name: {
    rules: [
      {
        required: true,
        errorMessage: '请输入姓名',
      },
    ]
  },
  cards: {
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
  code: {
    rules: [
      {
        required: true,
        errorMessage: '请输入校验码',
      },
    ]
  },
}

export default rules