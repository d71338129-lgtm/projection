import { createRouter, createWebHistory } from 'vue-router'
import ArticleView from '@/views/ArticleView.vue'
import LayoutView from '@/views/LayoutView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '../views/tabbar/HomeView.vue'
import CollectView from '../views/tabbar/CollectView.vue'
import LikeView from '../views/tabbar/LikeView.vue'
import UserView from '../views/tabbar/UserView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/',
      component: LayoutView,
      redirect:'/home',
      children: [
        {
          path: 'home',
          component: HomeView,
        },
        {
          path: 'collect',
          component: CollectView,
        },
        {
          path: 'like',
          component: LikeView,
        },
        {
          path: 'user',
          component: UserView,
        }
      ],
    },
    {
      path: '/article/:id',
      component: ArticleView,
    },
  ],
})

export default router
