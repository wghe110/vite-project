<template>
  <li :class="`wrap--submenu ${isExpand && 'expand'}`">
    <div class="tit" @click="toggleExpandFn">
      <div class="container">
        <img src="@/assets/key-person.svg" alt="" class="icon">
        <span class="word">{{ source.name || '--' }}</span>
        <div class="icon--arrow">
          <el-icon color="#BDBDBD" size="12">
            <ArrowDown />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const props = defineProps({
  source: {
    type: Object,
    default() {
      return {}
    }
  },
  expand: {
    type: Array,
    default() {
      return []
    }
  }
})
const emit = defineEmits(['toggleExpand'])

const isExpand = computed(() => {
  const { expand, source: { index } } = props
  return expand.includes(index)
})

const toggleExpandFn = () => {
  emit('toggleExpand', props.source)
}
</script>

<style lang="scss" scoped>
.wrap--submenu {
  &.expand {
    .container {
      >.icon--arrow {
        transform: rotate(-180deg);
      }
    }

    >.content {
      display: block;
    }
  }

  >.tit {
    height: 48px;
    // background-color: rgba(255, 0, 0, .2);
    padding: 0 14px 0 20px;
    cursor: pointer;

    &:hover {
      background-color: #E6EEFF;

      >.container {
        >.icon {
          opacity: 0.8;
        }

        >.word {
          opacity: 0.8;
        }
      }
    }

    >.container {
      height: 100%;
      display: flex;
      align-items: center;

      >.icon {
        // position: absolute;
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }

      >.word {
        flex: 1;
        min-width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 14px;

        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4B4B4B;
        font-weight: 400;
      }
    }
  }

  >.content {
    display: none;

    :deep {
      >.c-menu {
        >.wrap--menu {
          padding-left: 20px;
        }

        >.wrap--submenu {
          >.tit {
            padding-left: 40px;
          }

          >.content {
            >.c-menu {
              >.wrap--menu {
                padding-left: 40px;
              }
            }
          }
        }
      }
    }
  }
}
</style>