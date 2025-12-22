<script lang="ts" setup>
  import { ref } from 'vue'
  import { setStorageToken } from '@/utils/storage'
  import { useRouter } from 'vue-router'
  import { LoginAPI } from '@/apis/user'
import { showLoadingToast, showSuccessToast } from 'vant'
  const username = ref('')
  const password = ref('')
  const router = useRouter()
  const onSubmit　 = async () => {
    showLoadingToast({
      message:'登录中...',
      forbidClick:true
    })
    const res=await LoginAPI({
      username:username.value,
      password:password.value
    })
    setStorageToken(res.data.token)
    showSuccessToast('登录成功')
    router.push('/home')
}
</script>
<template>
  <div class="login-view">
    <van-nav-bar title="面经登录" />
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
        <van-button type="primary" block native-type="submit">登录</van-button>
      </div>
      <div class="tips">
        <router-link class="tips-link" to="/register">注册账号</router-link>
      </div>
    </van-form>
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
