<template>
  <div>
    <c-upload label="文件上传" v-model="val"></c-upload>

    <c-upload label="disabled" v-model="val" disabled></c-upload>

    <c-upload
      label="错误信息"
      v-model="val"
      error
      error-message="错误信息"
      error-message-align="right"
    ></c-upload>
    {{ valUpload }}
    <c-upload
      label="文件上传-action"
      v-model="valUpload"
      :action="action"
    ></c-upload>

    <c-upload
      label="文件上传-afterRead"
      v-model="valAfterRead"
      :after-read="afterRead"
    ></c-upload>

    <c-upload
      label="文件上传-maxSize"
      v-model="val"
      :max-size="2 * 1024 * 1024"
      @oversize="onOversize"
    ></c-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: [],
      valAfterRead: [],
      valUpload: [],
      action: "http://10.32.132.200:8080/api/cs/system/file/upload",
    };
  },
  methods: {
    afterRead(file) {
      console.log("afterRead", file);

      file.status = "uploading";
      setTimeout(() => {
        file.status = Math.random() > 0.5 ? "success" : "failed";
      }, 1500);
    },
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不能超过 2M");
    },
  },
};
</script>

<style>
</style>