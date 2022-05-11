<template>
  <div>
    <c-datetime-picker
      label="小时分钟"
      placeholder="请选择"
      type="time"
      v-model="timeVal"
    ></c-datetime-picker>

    <c-datetime-picker
      label="年月日"
      placeholder="请选择"
      type="date"
      v-model="dateVal"
    ></c-datetime-picker>

    <c-datetime-picker
      label="年月"
      placeholder="请选择"
      type="year-month"
      v-model="yearMonthVal"
    ></c-datetime-picker>

    <c-datetime-picker
      label="月日"
      placeholder="请选择"
      type="month-day"
      v-model="monthDayVal"
    ></c-datetime-picker>

    <c-datetime-picker
      label="年月日小时"
      placeholder="请选择"
      type="datehour"
      v-model="datehourVal"
    ></c-datetime-picker>

    <c-datetime-picker
      label="年月日小时分"
      placeholder="请选择"
      type="datetime"
      v-model="datetimeVal"
    ></c-datetime-picker>

    <c-datetime-picker
      label="disabled"
      placeholder="请选择"
      type="datetime"
      v-model="datetimeVal"
      disabled
    ></c-datetime-picker>

    <c-datetime-picker
      label="readonly"
      placeholder="请选择"
      type="datetime"
      v-model="datetimeVal"
      readonly
    ></c-datetime-picker>

    <c-datetime-picker
      label="错误信息"
      placeholder="请选择"
      type="datetime"
      v-model="datetimeVal"
      error
      error-message="错误信息"
      error-message-align="right"
    ></c-datetime-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeVal: "",
      dateVal: "",
      yearMonthVal: "",
      monthDayVal: "",
      datehourVal: "",
      datetimeVal: "",
    };
  },
};
</script>

<style>
</style>