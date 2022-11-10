<template>
  <div class="nav-tab">
    <el-scrollbar>
      <div class="content">
        <section v-for="(item, idx) in arrMenus" :key="item.path"
          :class="{ item: true, active: item.path === activeMenu }" @click="checkMenuFn(item)">
          <span>{{ item.title }}</span>
          <div class="btn" v-show="arrMenus.length > 1" @click.stop="deleteFn(item, idx)">
            <el-icon :size="12">
              <Close />
            </el-icon>
          </div>
        </section>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const activeMenu = ref('')
const arrMenus = ref([])

arrMenus.value.push({
  path: route.path,
  title: route.meta.title
})
activeMenu.value = route.path

router.beforeEach((to, from, next) => {
  const { path, meta: { title } } = to

  const obj = arrMenus.value.find(item => item.path === path)
  if (!obj) {
    arrMenus.value.push({
      path,
      title
    })
  }

  activeMenu.value = path;
  next()
})

const checkMenuFn = (item) => {
  const { path } = item
  if (path === activeMenu.value) return;
  activeMenu.value = path
  router.push(path)
}
const deleteFn = (item, idx) => {
  const { path } = item

  if (path === activeMenu.value) {
    if (idx === 0) {
      activeMenu.value = arrMenus.value[arrMenus.value.length - 1].path
    } else {
      activeMenu.value = arrMenus.value[idx - 1].path
    }
    router.push(activeMenu.value)
  }
  arrMenus.value.splice(idx, 1)
}
</script>

<style lang="scss" scoped>
.nav-tab {
  background: #F9FAFE;
  height: 64px;
  position: relative;
  box-shadow: 0px 2px 7px 0px #f3f4fb;
  padding-top: 12px;
  box-sizing: border-box;

  .content {
    display: flex;
  }

  .item {
    height: 40px;
    box-sizing: border-box;
    background: #F1F3F8;
    border: 1px solid rgba(231, 231, 231, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: #4b4b4b;
    margin-left: 20px;
    cursor: pointer;

    &.active {
      background: #F2F6FF;
      border: 0.85px solid rgba(54, 164, 255, 1);
      color: #36A4FF;
      cursor: default;

      >.btn {
        color: #36A4FF;
      }
    }

    >.btn {
      height: 40px;
      padding: 0 0 0 12px;
      cursor: pointer;
      color: #4b4b4b;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }
}
</style>