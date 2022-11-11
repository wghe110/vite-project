<template>
  <div class="wrap--pickup">
    <el-scrollbar height="100%">
      <template v-for="item in options" :key="item.index">
        <Menu v-if="item.type === 'submenu'" :source="item" v-bind="$attrs" @mouseenter="(e) => showPopFn(e, item)"
          @mouseleave="hidePopFn"></Menu>

        <el-tooltip v-else :content="item.name" placement="right" effect="light">
          <Menu :source="item" v-bind="$attrs" @select="selectFn"></Menu>
        </el-tooltip>
      </template>
    </el-scrollbar>

    <!-- 弹出框 -->
    <dialog-children :oleft="oleft" :otop="otop" :source="activeObj" :tit="activeObj.name" v-bind="$attrs"
      v-if="visible" @mouseenter="enterPopFn" @mouseleave="hidePopFn" @select="selectFn">
    </dialog-children>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Menu from './menu.vue'
import DialogChildren from './DialogChildren.vue'

const props = defineProps({
  options: {
    type: Array,
    default() {
      return []
    }
  },
})
const emit = defineEmits(['select'])

const oleft = ref(0)
const otop = ref(0)
const visible = ref(false)
let timer = null
const activeObj = ref({})

const showPopFn = (e, item) => {
  clearTimeout(timer)

  activeObj.value = item

  const { offsetWidth } = e.target
  const rect = e.target.getBoundingClientRect()
  oleft.value = rect.x + offsetWidth + 2
  otop.value = rect.y + 8
  visible.value = true
}

const hidePopFn = (e) => {
  timer = setTimeout(() => {
    visible.value = false
  }, 300);
}
const enterPopFn = () => {
  clearTimeout(timer)
}
const selectFn = (item) => {
  visible.value = false
  emit('select', item)
}

</script>

<style lang="scss" scoped>
.wrap--pickup {
  width: 96px;
  height: 100%;
}
</style>