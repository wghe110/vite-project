export default {
  username: [
    {
      required: true,
      message: '不能为空'
    },
    {
      pattern: /^[a-zA-Z][0-9a-zA-Z_]*$/,
      trigger: 'onChange',
      message: '只能包含数字下划线字母,且不能以数字开头'
    }
  ],
  tel: [
    {
      required: true,
      message: '不能为空'
    },
    {
      pattern: /^(13[0-9]|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      trigger: 'onChange',
      message: '请输入正确的手机号码'
    }
  ],
  phone: [
    {
      required: true,
      message: '不能为空'
    },
    {
      pattern: /^((\d{3}-)?\d{7,8}|(\d{4}-)?\d{7,8})$/,
      trigger: 'onChange',
      message: '请输入正确的固话号码'
    }
  ],
  email: [
    {
      required: true,
      message: '不能为空'
    },
    {
      pattern: /^\w+[a-z0-9A-Z]@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      trigger: 'onChange',
      message: '请输入正确的邮箱地址'
    }
  ],
  ID: [
    {
      required: true,
      message: '不能为空'
    },
    {
      pattern: /^\d{6}((18|19\d{2})|(20[01]\d)|(202[012]))((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      trigger: 'onChange',
      message: '请输入正确的身份证号'
    }
  ],
  url: [
    {
      required: true,
      message: '不能为空'
    },
    {
      pattern: /(?:https?:\/\/|www\.)+[a-z0-9\-\.]+\.[a-z]{2,5}(?:(?:\/|#|\?)[^\s]*)?/i,
      trigger: 'onChange',
      message: '请输入正确的链接'
    }
  ],
  sex: [
    {
      required: true,
      message: '不能为空'
    },
  ],
  national: [
    {
      required: true,
      message: '不能为空'
    },
  ],
  labels: [
    {
      required: true,
      message: '不能为空'
    },
  ],
  datetime: [
    {
      required: true,
      message: '不能为空'
    },
  ],
  upload: [
    {
      required: true,
      message: '不能为空'
    },
  ]
}
