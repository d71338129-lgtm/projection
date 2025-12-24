<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { path: '/home', label: '面经', icon: 'notes-o', activeIcon: 'notes' },
  { path: '/collect', label: '收藏', icon: 'star-o', activeIcon: 'star' },
  { path: '/like', label: '喜欢', icon: 'like-o', activeIcon: 'like' },
  { path: '/user', label: '我的', icon: 'user-o', activeIcon: 'user' },
]

// 根据当前路由初始化active值
const getInitialActiveIndex = () => {
  const currentPath = route.path
  const index = menuItems.findIndex((item) => item.path === currentPath)
  return index !== -1 ? index : 0
}

// 使用函数初始化active值
const active = ref(getInitialActiveIndex())

const change = (index: number, path: string) => {
  active.value = index
  router.push(path)
}

// 监听路由变化，同步active状态
const syncActiveFromRoute = () => {
  const currentPath = route.path
  const index = menuItems.findIndex((item) => item.path === currentPath)
  if (index !== -1) {
    active.value = index
  } else {
    // 如果当前路由不在菜单中，默认激活首页
    active.value = 0
  }
}

// 组件加载时同步一次
onMounted(() => {
  syncActiveFromRoute()
})

// 监听路由变化
watch(
  () => route.path,
  () => {
    syncActiveFromRoute()
  },
)
</script>

<template>
  <div class="layout-page">
    <router-view />
    <van-tabbar v-model:active="active">
      <van-tabbar-item
        v-for="(item, index) in menuItems"
        :key="item.path"
        @click="change(index, item.path)"
        :icon="index === active ? item.activeIcon : item.icon"
      >
        {{ item.label }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
