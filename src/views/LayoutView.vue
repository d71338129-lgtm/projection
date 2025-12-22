<template>
  <div class="layout-page">
    <router-view />
    <van-tabbar router>
      <van-tabber-item icon="notes-o" to="/home">面经</van-tabber-item>
      <van-tabber-item icon="star-o" to="/collect">收藏</van-tabber-item>
      <van-tabber-item icon="like-o" to="/like">喜欢</van-tabber-item>
      <van-tabber-item icon="user-o" to="/user">我的</van-tabber-item>
    </van-tabbar>
  </div>
</template>
