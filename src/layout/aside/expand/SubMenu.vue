<template>
  <div class="wrap--submenu expand">
    <div class="tit">
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
  </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
defineProps({
  source: {
    type: Object,
    default() {
      return {}
    }
  }
})
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
      max-height: 2000px;
    }
  }

  >.tit {
    height: 48px;
    // background-color: rgba(255, 0, 0, .2);
    padding: 0 14px 0 20px;
    cursor: pointer;

    &:hover {
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
        position: absolute;
        width: 16px;
        height: 16px;
      }

      >.word {
        flex: 1;
        min-width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 24px;
        margin-right: 14px;

        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4B4B4B;
        font-weight: 400;
      }
    }
  }

  >.content {
    overflow: hidden;
    max-height: 0;
  }
}
</style>