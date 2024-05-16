import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/TeamView.vue')
    },
    {
      path: '/team/:id',
      name: 'teamId',
      component: () => import('../views/TeamIdView.vue')
    }
  ]
})

export default router
