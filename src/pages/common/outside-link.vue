<template>
  <web-view :src="url" class="wrap" />
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const url = ref('')
onLoad((query) => {
  url.value = query.url
})
</script>