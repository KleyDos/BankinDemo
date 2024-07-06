import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TipoCambiosView from '../views/TipoCambiosView.vue'
import BitacoraView from '../views/BitacoraView.vue'
import RegistroUserView from '../views/RegistroUserView.vue'
import LoginView from '../views/LoginView.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/registroUser',
    name: 'registroUser',
    component: RegistroUserView,
    
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/tipoCambios',
    name: 'tipoCambios',
    component: TipoCambiosView,
    meta: { requiresAuth: true }
  },
  {
    path: '/bitacora',
    name: 'bitacora',
    component: BitacoraView,
    meta: { requiresAuth: true }
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
