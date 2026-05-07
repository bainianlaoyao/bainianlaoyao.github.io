import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'pavilion',
    component: () => import('../views/PavilionView.vue')
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/raw/:id',
    name: 'raw',
    component: () => import('../views/RawView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
