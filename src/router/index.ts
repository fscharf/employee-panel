import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home-view.vue'
import BulletinView from '@/views/bulletin-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/bulletin/:id', name: 'bulletin', component: BulletinView, props: true }
  ]
})

export default router
