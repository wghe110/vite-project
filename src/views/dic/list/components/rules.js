import api from '@/apis/system'

const validCodeFn = (rule, value, callback, self) => {
  const { edit, oldCode } = self;
  if (edit && oldCode === value) return callback();

  const params = {
    dicAttr: 'list',
    dicCode: value,
    dicSort: 1
  }

  api.validDictCode(params).then((res) => {
    const { code, msg } = res;
    if (code !== 0) {
      return callback(new Error(msg || "字典编码重复"));
    }
    return callback();
  });
};

const validNameFn = (rule, value, callback, self) => {
  const { edit, oldName } = self;
  if (edit && oldName === value) return callback();

  const params = {
    dicAttr: 'list',
    dicName: value,
    dicSort: 1
  }

  api.validDictName(params).then((res) => {
    const { code, msg } = res;
    if (code !== 0) {
      return callback(new Error(msg || "字典名称重复"));
    }
    return callback();
  });
};

export default (self) => ({
  dicCode: [
    { required: true, message: "请输入字典编码", trigger: "blur" },
    {
      validator: (rule, value, callback) => { validCodeFn(rule, value, callback, self) },
      trigger: "blur",
    },
  ],
  dicName: [
    { required: true, message: "请输入字典名称", trigger: "blur" },
    {
      validator: (rule, value, callback) => { validNameFn(rule, value, callback, self) },
      trigger: "blur",
    },
  ],
  dicSort: [
    { required: true, message: "请输入排序", trigger: "blur" },
    {
      pattern: /^[1-9]+$/,
      message: "请输入有效数字",
      trigger: "blur",
    }
  ],
})
