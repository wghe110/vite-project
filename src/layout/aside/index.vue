<template>
  <aside class="wrap--aside">
    <section class="container--worktable" @click="collapse = !collapse"> </section>

    <section class="content">
      <menu-expand v-if="!collapse" :options="mock" :expand="aExpand" v-model="val" @select="selectFn"
        @toggleExpand="toggleExpandFn">
      </menu-expand>
      <menu-pickup v-else :options="mock" v-model="val" @select="selectFn"></menu-pickup>
    </section>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import MenuExpand from './expand/index.vue'
import MenuPickup from './pickup/index.vue'
import mock from './mock.js'

const emit = defineEmits(['select', 'close', 'open'])

const val = ref('')
const aExpand = ref([])
const collapse = ref(false)

const selectFn = (obj) => {
  val.value = obj.index
  emit('select', obj)
}
const toggleExpandFn = (obj) => {
  const { index } = obj
  const idx = aExpand.value.findIndex(item => item === index)
  if (idx !== -1) {
    aExpand.value.splice(idx, 1)
    emit('close', obj)
  } else {
    aExpand.value.push(index)
    emit('open', obj)
  }
}
</script>

<style lang="scss" scoped>
.wrap--aside {
  height: 100%;
  border-right: 1px solid #E2E9F2;
  background-color: #F9FAFE;
  min-width: 96px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  >.container--worktable {
    height: 64px;
    background-color: #E6EEFF;
  }

  >.content {
    flex: 1;
    min-height: 200px;
  }
}
</style>