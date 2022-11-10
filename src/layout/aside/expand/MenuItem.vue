<template>
  <div class="wrap--menu active">
    <div class="container">
      <img src="@/assets/key-person.svg" alt="" class="icon">
      <span class="word">{{ source.name || '--' }}</span>
      <div class="square"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup>
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
.wrap--menu {
  height: 48px;
  // background-color: rgba(255, 255, 0, .2);
  position: relative;
  cursor: pointer;


  &::before {
    content: '';
    height: 44px;
    // background-color: #E6EEFF;
    left: 8px;
    right: 8px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &.active {
    &::before {
      background-color: #E6EEFF;
    }

    >.container {
      >.square {
        border-color: #36A4FF;
        background: rgba(255, 255, 255, 0.30);
      }

      >.line {
        background-color: #36A4FF;
      }
    }
  }

  &:hover {
    >.container {
      >.icon {
        opacity: 0.8;
      }

      >.word {
        opacity: .8;
      }
    }
  }

  >.container {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    position: relative;

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

    >.square {
      background: rgba(255, 255, 255, 0);
      border: 2px solid rgba(54, 164, 255, 0);
      width: 8px;
      height: 8px;
      box-sizing: border-box;
      margin-right: 16px;
    }

    >.line {
      width: 3px;
      height: 44px;
    }
  }
}
</style>