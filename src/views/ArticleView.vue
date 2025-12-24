<script lang="ts" setup>
import {
  getArticleDetailAPI,
  updateCollectAPI,
  updateLikeAPI,
  type ArticleRowItem,
} from '@/apis/article'
import { showSuccessToast, showToast } from 'vant'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 获取页面路由
const route = useRoute()
// 获取路由参数 id
const id = route.params.id
// 文章详情
const article = ref<ArticleRowItem>()
const router = useRouter()

// 获取文章详情
const getArticleDetail = async () => {
  // 调用获取文章详情接口
  const res = await getArticleDetailAPI(id as string)
  // 保存文章数据
  article.value = res.data
}

getArticleDetail()

const toggleLike = async () => {
  if (!article.value) return
  article.value.likeFlag = article.value.likeFlag === 1 ? 0 : 1
  await updateLikeAPI(article.value.id)
  if (article.value.likeFlag) {
    article.value.likeCount++
    showSuccessToast('点赞成功')
  } else {
    article.value.likeCount--
    showToast('取消点赞')
  }
}

const toggleCollect = async () => {
  if (!article.value) return
  article.value.collectFlag = article.value.collectFlag === 1 ? 0 : 1
  await updateCollectAPI(article.value.id)
  if (article.value.collectFlag === 1) {
    showSuccessToast('收藏成功')
  } else {
    showToast('取消收藏')
  }
}
</script>

<template>
  <div class="detail-page">
    <van-nav-bar left-text="返回" left-arrow @click-left="router.back()" fixed title="面经详情" />
    <div class="content">
      <header class="header">
        <h1>{{ article?.stem }}</h1>
        <p>
          {{ article?.createdAt }} | {{ article?.views }} 浏览量 | {{ article?.likeCount }} 点赞数
        </p>
        <p>
          <img :src="article?.avatar" alt="" />
          <span>{{ article?.creator }}</span>
        </p>
      </header>

      <main class="body" v-html="article?.content"></main>

      <div class="opt">
        <van-icon
          @click="toggleCollect"
          :class="{ active: article?.collectFlag === 1 }"
          :name="article?.collectFlag === 1 ? 'star' : 'star-o'"
        />
        <van-icon
          @click="toggleLike"
          :class="{ active: article?.likeFlag === 1 }"
          :name="article?.likeFlag === 1 ? 'like' : 'like-o'"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;

  .content {
    padding: 60px 15px 100px;
  }

  .header {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;

    h1 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;

      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }

  .body {
    font-size: 14px;
    line-height: 1.8;
    color: #333;
    min-height: 200px;
  }

  .opt {
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 50px;
    background-color: #fff;
    padding: 10px 30px;
    border-radius: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .van-icon {
      font-size: 24px;
      color: #999;
      cursor: pointer;

      &.active {
        color: #fa6d1d;
      }
    }
  }
}
</style>
