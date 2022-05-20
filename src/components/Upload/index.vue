<template>
  <van-cell-group>
    <van-field
      name="uploader"
      :label="label"
      :disabled="disabled"
      v-bind="$attrs"
      input-align="right"
    >
      <template #input>
        <van-uploader
          v-model="uploader"
          :disabled="disabled"
          v-bind="$attrs"
          v-on="$listeners"
          :deletable="!disabled"
          :after-read="action ? uploadFn : afterRead"
        />
      </template>
    </van-field>
  </van-cell-group>
</template>

<script>
import axios from "axios";

export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: "",
    },
    afterRead: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  computed: {
    uploader: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
    },
  },
  methods: {
    uploadFn(file) {
      console.log("uploadFn", file);
      file.status = "uploading";
      const params = new FormData();
      params.append("file", file.file);

      axios.post(this.action, params).then(
        (res) => {
          console.log("res", res);
          const { status, data } = res;
          if (status === 200) {
            if (data.code === 200) {
              file.status = "success";
              file.url = data.data.fileUrl; // 这个地方需要注意，后面可能要改
            } else {
              file.status = "failed";
              this.$$notify("文件上传失败");
            }
          } else {
            file.status = "failed";
            this.$$notify("文件上传失败");
          }
        },
        () => {
          file.status = "failed";
          this.$$notify("文件上传失败");
        }
      );
    },
  },
};
</script>

<style>
</style>