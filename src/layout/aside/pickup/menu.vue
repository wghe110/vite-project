<template>
  <div class="wrap--menu active" @click="checkFn">
    <div class="content">
      <img src="@/assets/key-person.svg" alt="" class="pic" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  source: {
    type: Object,
    default() {
      return {}
    }
  },
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits('select')

const checkFn = () => {
  const { type } = props.source
  if (type === 'menu') emit('select', props.source)
}
</script>

<style lang="scss" scoped>
.wrap--menu {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #E6EEFF;
  }

  &.active {
    >.content {
      background-color: #36A4FF;
    }
  }

  >.content {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    >.pic {
      width: 16px;
      height: 16px;
    }
  }
}
</style>