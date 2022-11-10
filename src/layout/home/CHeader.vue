<template>
  <div class="wrap--header">
    <img src="@p/logo.svg" alt="" class="pic--logo">

    <aside class="container--right">
      <section class="container--msg">
        <img src="@p/msg-icon.svg" alt="" class="pic--msg">
      </section>

      <section class="container--user">
        <div class="container--avatar">
          <img :src="user.avatar || DefaultPic" alt="" class="avatar">
        </div>
        <p class="name--user">{{ userName || '--' }}</p>
        <el-dropdown placement="bottom" @command="menuChangeFn">
          <div class="container--menus">
            <el-icon :size="12" color="#fff">
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </section>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import DefaultPic from '@p/default-pic.png'
import globalStore from '@/store/global'

const user = ref({})
const userName = ref('')
const store = globalStore()

// 从globalStore获取用户信息
try {
  user.value = store.userInfo

  const { username, currentOrgRole } = user.value
  const arr = []
  if (username) arr.push(username)
  if (currentOrgRole) {
    if (currentOrgRole.org) arr.push(currentOrgRole.org.name)
    if (currentOrgRole.role) arr.push(currentOrgRole.role.name)
  }
  userName.value = arr.join('-')
} catch (error) {
  ElMessage.error('格式化用户信息失败')
  console.error(error)
}

const menuChangeFn = (command) => {
  if (command === 'loginout') {
    console.log('退出登录')
  }
}
</script>

<style lang="scss" scoped>
.wrap--header {
  height: 72px;
  padding: 0 32px;
  background-color: #1162b3;
  background-image: url('@p/head-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: left top;
  display: flex;
  align-items: center;
  justify-content: space-between;

  >.pic--logo {
    width: 255px;
    height: 40px;
  }
}

.container--right {
  display: flex;
  align-items: center;




}

.container--user {
  display: flex;
  align-items: center;

  >.container--avatar {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;

    >.avatar {
      width: 29px;
      height: 29px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  >.name--user {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    font-weight: 400;
    margin: 0;
  }

  .container--menus {
    margin-left: 10px;
    position: relative;
    top: 1px;
    cursor: pointer;
  }
}

.container--msg {
  margin-right: 20px;
  display: flex;
  align-items: center;

  >.pic--msg {
    width: 24px;
    height: 24px;
  }
}
</style>