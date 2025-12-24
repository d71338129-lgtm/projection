<script setup lang="ts">
import type { ArticleRowItem } from '@/apis/article'
import { useRouter } from 'vue-router'

const props = defineProps<{
  article: ArticleRowItem
}>()

const router = useRouter()

// 点击文章项进入详情页
const goToDetail = () => {
  router.push(`/article/${props.article.id}`)
}
</script>
<template>
  <van-cell class="article-item" @click="goToDetail">
    <template #title>
      <div class="head">
        <img :src="article.avatar" alt="" />
        <div class="con">
          <p class="title van-ellipsis">{{ article.stem }}</p>
          <p class="other">{{ article.creator }} | {{ article.createdAt }}</p>
        </div>
      </div>
    </template>

    <template #label>
      <div class="body van-multi-ellipsis--l2">
        {{ article.content }}
      </div>
      <div class="foot">点赞 {{ article.likeCount }} | 浏览 {{ article.views }}</div>
    </template>
  </van-cell>
</template>

<style lang="scss" scoped>
.article-item {
  cursor: pointer;
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
