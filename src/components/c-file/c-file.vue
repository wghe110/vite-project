<template>
  <view class="c-file">
    <uni-file-picker limit="3" v-model="data.imageValue" fileMediatype="image" mode="grid"
      :image-styles="data.imageStyles" @select="handleSelect" @success="success" @delete="handleDelete">
    </uni-file-picker>
  </view>
</template>

<script setup>
import { reactive, defineEmits, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
const emit = defineEmits(['update:modelValue', 'input', 'change'])
const getToken = () => {
  return uni.getStorageSync('token') || ''
}
// props
const props = defineProps({
  block: {
    type: Boolean,
    default: false
  },
  fjURL: {
    type: Array,
  },
})
const data = reactive({
  imageValue: [{}],
  imageStyles: {
    width: 90,
    height: 90,
    border: {
      color: "#DDDDDD",
      width: 2,
      style: 'dashed',
      radius: '2px'
    }
  },
})
// 监听modelValue变化
watch(() => props.fjURL, (val) => {

  val.map((item, index) => {
    data.imageValue.push({
      url: item
    })
  })
  data.imageValue.shift()

})


const handleSelect = (e) => {
  console.log('选择文件：', e)
  let tempFilePaths = e.tempFilePaths
  uni.uploadFile({
    url: 'http://10.32.132.30:8080/api/bs/oss/govern/upload',
    filePath: tempFilePaths[0],
    header: {
      'Authorization': getToken(),
    },
    name: 'file',
    success: uploadFileRes => {
      data.imageValue.push({
        url: JSON.parse(uploadFileRes.data).data.url
      })
      emit('fjChang', data.imageValue)
    },
    fail(err) {
      console.log(err);
    }
  });
  console.log('%c 🥗 data.imageValue: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', data.imageValue);
}
const success = (e) => {
  console.log('上传成功')
}
const handleDelete = (e) => {
  emit('fjChang', data.imageValue)
  console.log('删除文件', e)
}

</script>

<style lang="scss">
.example-body {
  padding: 10px;
  padding-top: 0;
}

.custom-image-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
  color: #333;
}

.c-file {
  .file-picker__box {
    width: 180rpx;
    height: 180rpx;
  }
}
</style>
<style lang="scss" scoped>
</style>
