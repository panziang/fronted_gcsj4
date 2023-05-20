import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './home'
import couponRoutes from './coupon'
import productRoutes from './product'
import orderRoutes from './order'
import userRoutes from './user'


const indexRoutes = [
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: indexRoutes.concat(
    homeRoutes,
    couponRoutes,
    productRoutes,
    orderRoutes,
    userRoutes
  ),

  scrollBehavior () {
    return { top: 0 };
  }
})

export default router
