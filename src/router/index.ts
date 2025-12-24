import { createRouter, createWebHashHistory } from 'vue-router'
import { getStorageToken } from '@/utils/storage'
const ArticleView = () => import('@/views/ArticleView.vue')
const LayoutView = () => import('@/views/LayoutView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const HomeView = () => import('@/views/tabbar/HomeView.vue')
const CollectView = () => import('@/views/tabbar/CollectView.vue')
const LikeView = () => import('@/views/tabbar/LikeView.vue')
const UserView = () => import('@/views/tabbar/UserView.vue')

const whiteList = ['/login', '/register']

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView,
      meta: {
        title: '登录',
      },
    },
    {
      path: '/register',
      component: RegisterView,
      meta: {
        title: '注册',
      },
    },
    {
      path: '/',
      component: LayoutView,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: HomeView,
          meta: {
            title: '首页',
          },
        },
        {
          path: 'collect',
          component: CollectView,
          meta: {
            title: '收藏',
          },
        },
        {
          path: 'like',
          component: LikeView,
          meta: {
            title: '喜欢',
          },
        },
        {
          path: 'user',
          component: UserView,
          meta: {
            title: '我的',
          },
        },
      ],
    },
    {
      path: '/article/:id',
      component: ArticleView,
      meta: {
        title: '文章',
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title}|面经`
  }
  const token = getStorageToken()
  if (token || whiteList.includes(to.path)) {
    return true
  }
  return '/login'
})

export default router
