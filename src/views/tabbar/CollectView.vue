<script setup lang="ts">
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticlesCollectAPI, type ArticleRowItem } from '@/apis/article'
import { ref } from 'vue'
const list = ref<ArticleRowItem[]>([])
const isLoading = ref(false)
const isFinished = ref(false)
const page = ref(1)
const getCollectList = async () => {
  isLoading.value = true
  const res = await getArticlesCollectAPI({ page: page.value })
  if (page.value === 1) {
    list.value = res.data.rows
  } else {
    list.value.push(...res.data.rows)
  }
  isLoading.value = false
  page.value++
  if (page.value > res.data.pageTotal) {
    isFinished.value = true
  }
}
getCollectList()
</script>

<template>
  <div class="collect-view">
    <van-nav-bar fixed title="我的收藏" />
    <van-list
      v-model:loading="isLoading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="getCollectList"
    >
      <ArticleItem v-for="item in list" :key="item.id" :article="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.collect-view {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
