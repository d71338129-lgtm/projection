<script setup lang="ts">
import { ref } from 'vue';
import { registerAPI } from '@/apis/user';
import { showLoadingToast,showSuccessToast } from 'vant';
  const username=ref('')
  const password=ref('')
  const onSubmit=async()=>{
    showLoadingToast({
      message:'注册中...',
      forbidClick:true
    })
      const res=await registerAPI({
        username:username.value,
        password:password.value
      })
      showSuccessToast('注册成功'+res)
  }
</script>

<template>
  <div class="register-view">
    <van-nav-bar title="面经注册">
      <van-form @submit="onSubmit">
        <van-field v-model="username" label="用户名" placeholder="请输入用户名" autocomplete="username"
      :rules="[
        {required:true,message:'请输入用户名'},
        {pattern:/^\w{5,}$/,message:'用户名至少包含5个字符'}
      ]"/>
      <van-field v-model="password" label="密码" placeholder="请输入密码" autocomplete="password"
      :rules="[
        {required:true,message:'请输入密码'},
        {pattern:/^\w{5,}$/,message:'密码至少包含6个字符'}
      ]"/>
      <div class="form-button">
        <van-button type="primary" block native-type="submit">注册</van-button>
      </div>
      <div class="tips">
        <router-link class="tips-link" to="/register">已有账号，去登录</router-link>
      </div>
      </van-form>
    </van-nav-bar>
  </div>
</template>

<style lang="scss" scoped>
  .form-button{
    margin: 16px;
  }
  .tips{
    text-align: right;
    padding-right:16px;
    .tips-link{
      font-size:12px;
      color:#007aff;
    }
  }
</style>
