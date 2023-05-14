import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/home",
            component: () => import("@/views/home/home.vue")
        },
        {
            path: "/order",
            component: () => import("@/views/order/order.vue")
        },
        {
            path: "/user",
          component: () => import("@/views/user/user-info.vue"),
            // meta:{
            //     hideTabBar:true
            // }
        },
        {
            path: "/cart",
            component: () => import("@/views/cart/cart.vue")
        },
        {
            path: "/city",
            component: () => import("@/views/city/city.vue"),
            // meta:{
            //     hideTabBar:true
            // }
      },
      {
        path: "/search",
        component: () => import("@/views/search/search.vue"),
        meta:{
                hideTabBar:true
            }
      },
      {
        path: "/detail/:id",
        component: () => import("@/views/detail/detail.vue")
      },
      {
        path: "/sign-in",
        component: () => import("@/views/user/sign-in.vue")
      },
      {
        path: "/sign-up",
        component: () => import("@/views/user/sign-up.vue")
      },
      {
        path: "/address-list",
        component: () => import("@/views/user/address-list.vue")
      },
      {
        path: "/address-edit",
        component: () => import("@/views/user/address-edit.vue")
      },
      {
        path: "/coupon",
        component: () => import("@/views/user/coupon.vue")
      },

      
    ]
})

export default router