import api from '@/apis/system'

const validateNameFn = (rule, value, callback, self) => {
  const { edit, oldUserName } = self;
  if (edit && oldUserName === value) return callback();

  api.validUserName({ username: value }).then((res) => {
    const { success } = res;
    if (success) {
      return callback(new Error("用户名重复"));
    }
    return callback();
  });
};

export default (self) => ({

  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
      message: "用户名不允许存在特殊字符",
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => { validateNameFn(rule, value, callback, self) },
      trigger: "submit",
    },
  ],
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
      message: "姓名不允许存在特殊字符和数字",
      trigger: "change",
    }
  ],
  roles: [
    { required: true, message: "请选择角色", trigger: "change" }
  ],
  deptId: [
    { required: true, message: "请选择部门", trigger: "change" }
  ],
  email: [
    {
      pattern: /^\w+[a-z0-9A-Z]@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      message: "邮箱格式错误",
      trigger: "blur",
    }
  ],
  mobile: [
    {
      pattern: /^(13[0-9]|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "手机号码错误",
      trigger: "blur",
    }
  ]
})
