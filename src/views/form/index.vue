<template>
  <div class="wrap">
    <van-form scroll-to-error @submit="onSubmit" ref="formRef">
      <c-field
        v-model="formState.username"
        label="用户名"
        placeholder="请输入"
        required
        :rules="rules.username"
      ></c-field>

      <c-field
        v-model="formState.tel"
        label="手机号码"
        type="tel"
        placeholder="请输入"
        required
        :rules="rules.tel"
        :maxlength="11"
      ></c-field>

      <c-field
        v-model="formState.phone"
        label="固定电话号码"
        type="tel"
        placeholder="请输入"
        required
        :rules="rules.phone"
      ></c-field>

      <c-field
        v-model="formState.email"
        label="邮箱"
        placeholder="请输入"
        required
        :rules="rules.email"
        error-message-align="right"
      ></c-field>

      <c-field
        v-model="formState.ID"
        label="身份证号"
        type="number"
        placeholder="请输入"
        required
        :rules="rules.ID"
      ></c-field>

      <c-field
        v-model="formState.url"
        label="url"
        placeholder="请输入"
        required
        :rules="rules.url"
      ></c-field>

      <c-select-radio
        label="性别"
        required
        v-model="formState.sex"
        :options="sexOpts"
        :rules="rules.sex"
      ></c-select-radio>

      <c-select
        label="民族"
        placeholder="请选择"
        required
        v-model="formState.national"
        :options="nationalOpts"
        :rules="rules.national"
      ></c-select>

      <c-multiple-select
        label="标签"
        required
        v-model="formState.labels"
        :options="labelsOpts"
        placeholder="请选择"
        :rules="rules.labels"
      ></c-multiple-select>

      <c-datetime-picker
        label="生日"
        placeholder="请选择"
        type="datetime"
        v-model="formState.datetime"
        required
        :rules="rules.datetime"
      ></c-datetime-picker>

      <c-upload
        label="文件上传"
        v-model="formState.upload"
        required
        :rules="rules.upload"
      ></c-upload>

      <c-cascader
        v-model="formState.addr"
        label="籍贯"
        placeholder="请选择"
        clearable
        :options="addrOpts"
      ></c-cascader>
    </van-form>

    <div class="btn-box">
      <van-button round block type="info" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import rules from "./rules";

export default {
  data() {
    return {
      rules,
      formState: {},
      sexOpts: [
        { text: "男", value: "0" },
        { text: "女", value: "1" },
      ],
      nationalOpts: [
        { text: "汉族", value: "0" },
        { text: "少数民族", value: "1" },
      ],
      labelsOpts: [
        { text: "美少女", value: "0" },
        { text: "二次元", value: "1" },
        { text: "中二", value: "2" },
        { text: "杀马特", value: "3" },
      ],
      addrOpts: [
        {
          text: "浙江省",
          value: "330000",
          children: [{ text: "杭州市", value: "330100" }],
        },
        {
          text: "江苏省",
          value: "320000",
          children: [{ text: "南京市", value: "320100" }],
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("onSubmit");
      this.$refs.formRef.validate().then(
        (data) => {
          console.log("validate", data);
        },
        (err) => {
          console.log("err", err);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  background-color: #fff;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}
.btn-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>