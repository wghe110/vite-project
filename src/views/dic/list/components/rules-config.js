import api from '@/apis/system'

const validCodeFn = (rule, value, callback, self) => {
  const { edit, oldCode, dicId } = self;
  if (edit && oldCode === value) return callback();

  const params = {
    dicId,
    itemCode: value
  }

  api.validDicItemCode(params).then((res) => {
    const { code, msg } = res;
    if (code !== 0) {
      return callback(new Error(msg || "字典项编码重复"));
    }
    return callback();
  });
};

export default (self) => ({
  itemCode: [
    { required: true, message: "请输入字典项编码", trigger: "blur" },
    {
      validator: (rule, value, callback) => { validCodeFn(rule, value, callback, self) },
      trigger: "blur",
    },
  ],
  itemValue: [
    { required: true, message: "请输入字典值", trigger: "blur" },
  ],
  itemSort: [
    { required: true, message: "请输入排序", trigger: "blur" },
    {
      pattern: /^[0-9]+$/,
      message: "请输入有效数字",
      trigger: "blur",
    }
  ],
})
