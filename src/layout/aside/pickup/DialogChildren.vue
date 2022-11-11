<template>
  <div class="wrap-dialog-children" :style="{ left: `${oleft}px`, top: `${otop}px` }">
    <h2 class="tit--parent" v-if="tit">
      <el-icon color="#bdbdbd" :size="14" style="margin-right: 6px">
        <CaretLeft />
      </el-icon>
      <span class="word">{{ tit }}</span>
    </h2>

    <ul class="container--menu">
      <template v-for="item in (source.children || [])" :key="item.index">
        <li class="submenu" v-if="item.type === 'submenu'" @mouseenter="(e) => showPopFn(e, item)"
          @mouseleave="hidePopFn">
          <div class="word">{{ item.name || '--' }}</div>
          <el-icon color="#bdbdbd" :size="14">
            <ArrowRight />
          </el-icon>
        </li>
        <li class="menu" v-else @click="checkFn(item)">
          <div class="word">{{ item.name || '--' }}</div>
        </li>
      </template>

      <div class="empty" v-if="!source.children || source.children.length === 0">空</div>
    </ul>

    <dialog-children v-if="visible" :source="subSource" :oleft="subLeft" :otop="subTop" @mouseenter="enterPopFn"
      @mouseleave="hidePopFn" @select="checkFn">
    </dialog-children>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CaretLeft, ArrowRight } from '@element-plus/icons-vue'

defineExpose('dialog-children')
const props = defineProps({
  oleft: {
    type: Number,
    default: 0
  },
  otop: {
    type: Number,
    default: 0
  },
  source: {
    type: Object,
    default() {
      return {}
    }
  },
  tit: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['select'])

const visible = ref(false)
const subLeft = ref(0)
const subTop = ref(0)
let timer = null
const subSource = ref({})

const showPopFn = (e, item) => {
  clearTimeout(timer)

  subSource.value = item

  const { offsetWidth } = e.target
  const rect = e.target.getBoundingClientRect()
  subLeft.value = rect.x + offsetWidth + 2
  subTop.value = rect.y
  visible.value = true
}

const hidePopFn = () => {
  timer = setTimeout(() => {
    visible.value = false
  }, 300);
}
const enterPopFn = () => {
  clearTimeout(timer)
}

const checkFn = (item) => {
  emit('select', item)
}

</script>

<style lang="scss" scoped>
.wrap-dialog-children {
  width: 176px;
  min-height: 200px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  position: fixed;
  left: 97px;
  top: 200px;
  z-index: 2020;
  box-shadow: 0 4px 8px 0 rgba(41, 48, 64, .2);
}

.tit--parent {
  height: 48px;
  border-bottom: 1px solid #e7e7e7;
  padding: 0 8px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  align-items: center;

  >.word {
    color: #bdbdbd;
    font-size: 14px;
    flex: 1;
    min-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
  }
}

.container--menu {
  padding: 8px 0;
  margin: 0;

  >li {
    list-style: none;
    height: 40px;
    box-sizing: border-box;
    padding: 0 8px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: #E6EEFF;
    }

    &.submenu {
      display: flex;

      >.word {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: normal;
        color: #4b4b4b;
        font-size: 14px;
        flex: 1;
        min-width: 100px;
        padding-left: 20px;
      }
    }

    &.menu {
      >.word {
        padding: 0 12px 0 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: normal;
        color: #4b4b4b;
        font-size: 14px;
      }
    }
  }
}

.empty {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #bdbdbd;
  padding-left: 30px;
}
</style>