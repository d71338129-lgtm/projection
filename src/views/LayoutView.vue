<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref(0)
const menuItems = [
  { path: '/home', label: '面经', icon: 'notes-o', activeIcon: 'notes' },
  { path: '/collect', label: '收藏', icon: 'star-o', activeIcon: 'star' },
  { path: '/like', label: '喜欢', icon: 'like-o', activeIcon: 'like' },
  { path: '/user', label: '我的', icon: 'user-o', activeIcon: 'user' },
]

const change = (index: number, path: string) => {
  active.value = index
  router.push(path)
}
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

<style scoped>

</style>
