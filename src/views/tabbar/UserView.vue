<script setup lang="ts">
import { getUserProfileAPI,logoutAPI,type UserProfile } from '@/apis/user';
import { showConfirmDialog } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const UserProfile=ref<UserProfile>()
const getUserProfile=async()=>{
  const res=await getUserProfileAPI()
  UserProfile.value=res.data
}
getUserProfile()

const router=useRouter()
const onLogout=async()=>{
  try{
    await showConfirmDialog({
      closeOnClickOverlay:true,
      title:'退出登录',
      message:'确定要退出登录吗？',
      confirmButtonText:'确定',
      cancelButtonText:'取消'
    })
    await logoutAPI()
    UserProfile.value=undefined
    router.push('/login')
  }catch(err){
    console.log(err)
  }
}
</script>

<template>
  <div class="user-page">
    <div class="user">
      <img :src="UserProfile?.avatar||'http://teachoss.itheima.net/heimaQuestionMiniapp/官方默认头像%402x.png'" alt="" />
      <h3>{{UserProfile?.name||UserProfile?.username}}</h3>
    </div>

    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="clock-o" text="历史记录" to="/" />
      <van-grid-item icon="bookmark-o" text="我的收藏" to="/collect" />
      <van-grid-item icon="thumb-circle-o" text="我的点赞" to="/like" />
    </van-grid>

    <van-cell-group class="mt20">
      <van-cell title="推荐分享" is-link />
      <van-cell title="意见反馈" is-link />
      <van-cell title="关于我们" is-link />
      <van-cell title="退出登录" is-link @click="onLogout"/>
    </van-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  padding: 0 10px;
  background: #f5f5f5;
  height: 100vh;
  .mt20 {
    margin-top: 20px;
  }
  .user {
    display: flex;
    padding: 20px 0;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }
    h3 {
      margin: 0;
      padding-left: 20px;
      font-size: 18px;
    }
  }
}
</style>