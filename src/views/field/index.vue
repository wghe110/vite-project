<template>
  <div style="padding: 12px">
    <van-cell-group class="item">
      <c-field v-model="value" label="文本" placeholder="请输入用户名" />
    </van-cell-group>

    <van-cell-group class="item">
      <!-- 输入任意文本 -->
      <c-field v-model="text" label="文本" />
      <!-- 输入手机号，调起手机号键盘 -->
      <c-field v-model="tel" type="tel" label="手机号" />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <c-field v-model="digit" type="digit" label="整数" />
      <!-- 允许输入数字，调起带符号的纯数字键盘 -->
      <c-field v-model="number" type="number" label="数字" />
      <!-- 输入密码 -->
      <c-field v-model="password" type="password" label="密码" />
    </van-cell-group>

    <van-cell-group class="item">
      <c-field label="文本" value="输入框只读" readonly />
      <c-field label="文本" value="输入框已禁用" disabled />
    </van-cell-group>

    <van-cell-group class="item">
      <c-field v-model="value1" label="文本" left-icon="smile-o" right-icon="warning-o" placeholder="显示图标" />
      <c-field v-model="value2" clearable label="文本" left-icon="music-o" placeholder="显示清除图标" />
    </van-cell-group>

    <van-cell-group class="item">
      <c-field v-model="username" error required label="用户名" placeholder="请输入用户名" />
      <c-field v-model="phone" required label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" />
    </van-cell-group>

    <van-cell-group class="item">
      <c-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </c-field>
    </van-cell-group>

    <van-cell-group class="item">
      <van-field v-model="message" rows="2" autosize label="留言" type="textarea" maxlength="50" placeholder="请输入留言"
        show-word-limit />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',

      tel: '',
      text: '',
      digit: '',
      number: '',
      password: '',

      value1: '',
      value2: '',

      username: '',
      phone: '',

      sms: '',
      message: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 12px;
}
</style>