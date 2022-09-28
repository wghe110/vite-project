<template>
  <video ref="videoPlayerRef" class="video-js"></video>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js';
// import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'

// props
const props = defineProps({
  options: {
    type: Object,
    default() {
      return {}
    }
  }
})

const player = ref()
const videoPlayerRef = ref()

//methods
const init = () => {
  player.value = videojs(videoPlayerRef.value, props.options, () => {
    player.value.log('onPlayerReady', player);
  })
}

//life
onMounted(init)
onBeforeUnmount(() => {
  if (player.value) player.value.dispose()
})
</script>