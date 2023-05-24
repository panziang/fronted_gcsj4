/**
 * 订单路由
 */
export default [
  {
    path: "/order",
    component: () => import("@/views/order/order.vue")
  },
  {
    path: "/order-detail",
    component: () => import("@/views/order/order-detail.vue")
  },
]
