<script setup lang="ts">
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticlesLikeAPI, type ArticleRowItem } from '@/apis/article'
import { ref } from 'vue'

const list = ref<ArticleRowItem[]>([])
const isLoading = ref(false)
const isFinished = ref(false)
const page = ref(1)

const getLikeList = async () => {
  isLoading.value = true
  const res = await getArticlesLikeAPI({ page: page.value })
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

getLikeList()
</script>

<template>
  <div class="like-view">
    <van-nav-bar fixed title="我的喜欢" />
    <van-list
      v-model:loading="isLoading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="getLikeList"
    >
      <ArticleItem v-for="item in list" :key="item.id" :article="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.like-view {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
