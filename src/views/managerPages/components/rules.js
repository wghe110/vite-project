import api from "@/apis/system-manage/tenant";

const validateNameFn = (rule, value, callback, self) => {
  const { edit, oldTenantAccount } = self;

  if (edit && oldTenantAccount === value) return callback();

  api.validTenantAccount({ tenantAccount: value }).then((res) => {
    const { success, msg } = res;
    if (success) {
      return callback(new Error(msg || "租户账号校验失败"));
    }
    return callback();
  });
};

export default (self) => {
  return {
    tenantAccount: [
      { required: true, message: "请输入租户账号", trigger: "blur" },
      {
        pattern: /^[0-9a-zA-Z]+$/,
        message: "租户账号只能数字和字母",
        trigger: "blur",
      },
      {
        validator: (rule, value, callback) => validateNameFn(rule, value, callback, self),
        trigger: "submit",
      },
    ],
    tenantName: [{ required: true, message: "请输入租户名称", trigger: "blur" }],
    contacts: [{ required: true, message: "请输入联系人", trigger: "blur" }],
    phone: [
      { required: true, message: "请输入联系方式", trigger: "blur" },
      {
        pattern: /^(13[0-9]|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: "联系方式格式错误",
        trigger: "blur",
      }
    ],
    expireTime: [{ required: true, message: "请选择过期时间", trigger: "change" }],
  }
}