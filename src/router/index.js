import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TipoCambiosView from '../views/TipoCambiosView.vue'
import BitacoraView from '../views/BitacoraView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tipoCambios',
      name: 'tipoCambios',
      component: TipoCambiosView
    },
    {
      path: '/bitacora',
      name: 'bitacora',
      component: BitacoraView
    },
    {
      path: '/registro',
      name: 'registro',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegistroView.vue')
    }
  ]
})

export default router
