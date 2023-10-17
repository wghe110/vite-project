export default {
  title: [
    { required: true, message: "请输入标题", trigger: "blur" },
  ],
  name: [
    { required: true, message: "请输入路由名称", trigger: "blur" },
  ],
  url: [
    { required: true, message: "请输入路由路径", trigger: "blur" },
  ],
  component: [
    { required: true, message: "请输入vue组件位置", trigger: "blur" },
  ],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
  orderby: [
    { required: true, message: "请输入排序", trigger: "blur" },
    {
      pattern: /^[0-9]+$/,
      message: "请输入数字",
      trigger: "blur",
    },
  ],
}