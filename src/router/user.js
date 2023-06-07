/**
 * 用户路由
 */
export default [
  {
    path: "/user",
    component: () => import("@/views/user/user-info.vue"),
    // meta:{
    //     hideTabBar:true
    // }
  },
  {
    path: "/sign-in",
    component: () => import("@/views/user/sign-in.vue"),
    meta: {
      hideTabBar: true
    }
  },
  {
    path: "/sign-up",
    component: () => import("@/views/user/sign-up.vue"),
    meta: {
      hideTabBar: true
    }
  },
  {
    path: "/address-list",
    component: () => import("@/views/user/address-list.vue")
  },
  {
    path: "/address-edit/:aid",
    component: () => import("@/views/user/address-edit.vue")
  },
  {
    path: "/address-new",
    component: () => import("@/views/user/address-new.vue")
  },
  {
    path: "/user-edit",
    component: () => import("@/views/user/user-edit.vue")
  }
]
