<template>
  <video-player :options="options"></video-player>
</template>

<script setup>
import videoSrc from '@/assets/video.mp4'
import poster from '@/assets/preload/banner.png'

const options = {
  autoplay: true,
  controls: true,
  width: 290,
  height: 306,
  poster,
  sources: [
    {
      src: videoSrc,
      type: 'video/mp4'
    }
  ]
}
</script>