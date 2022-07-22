<template>
  <div @click="childFn">child</div>
</template>

<script>
export default {
  setup() {
    const childFn = () => {
      return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
          return Promise.resolve('通过')
        } else {
          return Promise.reject('拒绝')
        }
      })
    }
    return {
      childFn
    }
  }
}
</script>