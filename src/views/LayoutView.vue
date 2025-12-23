<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const active = ref(0)

watch(
  () => route.path,
  (path) => {
    // 提取路由的最后一部分用于匹配
    const routePath = path.split('/').pop() || ''
    switch (routePath) {
      case 'home':
        active.value = 0
        break
      case 'collect':
        active.value = 1
        break
      case 'like':
        active.value = 2
        break
      case 'user':
        active.value = 3
        break
      default:
        active.value = 0
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="layout-page">
    <router-view />
    <van-tabbar v-model:active="active">
      <van-tabbar-item icon="notes-o" to="/home" @click="router.push('/home')">
        面经
      </van-tabbar-item>
      <van-tabbar-item icon="star-o" to="/collect" @click="router.push('/collect')">
        收藏
      </van-tabbar-item>
      <van-tabbar-item icon="like-o" to="/like" @click="router.push('/like')">
        喜欢
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user" @click="router.push('/user')">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
