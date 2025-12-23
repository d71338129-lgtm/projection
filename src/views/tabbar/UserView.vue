<script setup lang="ts">
import { useRouter } from 'vue-router'
import { removeStorageToken } from '@/utils/storage'

const router = useRouter()

const onLogout = () => {
  removeStorageToken()
  router.push('/login')
}
</script>

<template>
  <div class="user-view">
    <van-nav-bar fixed title="个人中心" />

    <div class="user-info">
      <img class="avatar" src="https://avatars.githubusercontent.com/u/0?v=4" alt="avatar" />
      <div class="meta">
        <div class="name">面经用户</div>
        <div class="desc">欢迎来到面经小站</div>
      </div>
    </div>

    <van-cell-group inset>
      <van-cell title="我的收藏" is-link icon="star-o" @click="router.push('/collect')" />
      <van-cell title="我的喜欢" is-link icon="like-o" @click="router.push('/like')" />
    </van-cell-group>

    <div class="logout-wrap">
      <van-button type="danger" block round @click="onLogout"> 退出登录 </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-view {
  padding-top: 44px;
  padding-bottom: 50px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  margin-top: 8px;
  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .meta {
    .name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .desc {
      font-size: 12px;
      color: #999;
    }
  }
}

.logout-wrap {
  margin: 24px 16px 0;
}
</style>
