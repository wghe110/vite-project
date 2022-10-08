<template>
  <video-player :options="options"></video-player>
</template>

<script setup>

const options = {
  autoplay: true,
  controls: true,
  width: 290,
  height: 299,
  sources: [
    {
      src: 'http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/gear2/prog_index.m3u8',
      // src: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
      // src: 'rtmp://ns8.indexforce.com/home/mystream',
      type: 'application/x-mpegURL'
    }
  ]
}
</script>