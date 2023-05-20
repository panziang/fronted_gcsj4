/**
 * 商品路由
 */
export default [
  {
    path: "/home",
    component: () => import("@/views/home/home.vue")
  },
  {
    path: "/cart",
    component: () => import("@/views/cart/cart.vue")
  },
  {
    path: "/product-detail/:id",
    component: () => import("@/views/product/product-detail.vue"),
    meta: {
      hideTabBar: true
    }
  },
]
