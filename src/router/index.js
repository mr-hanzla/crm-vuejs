import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../views/SigninView.vue'
import Signup from '../components/Signup.vue'
import Dashboard from '../components/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },

  ]
})

export default router
