import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'home', redirect: "/login", component: Home
  },
  {
    path: '/login', name: 'login', component: () => import(/* webpackChunkName: "login" */ '../views/Login/Login.vue')
  },
  {
    path: '/home', name: 'home', redirect: "/home/homePage", component: () => import(/* webpackChunkName: "home/homePage" */ '../views/Home/Home.vue'),
    children: [
      { path: 'homePage', name: 'homePage', component: () => import(/* webpackChunkName: "homePage" */ '../views/Home/Children/HomePage/HomePage.vue') },
      { path: "users", name: "users", component: () => import(/* webpackChunkName: "user" */ '../views/Home/Children/User/Users.vue') },
      { path: "goods", name: "goods", component: () => import(/* webpackChunkName: "goodsList" */ '../views/Home/Children/Goods/GoodsList.vue') },
      { path: "params", name: "params", component: () => import(/* webpackChunkName: "goodsClass" */ '../views/Home/Children/Goods/Classify.vue') },
      { path: "categories", name: "categories", component: () => import(/* webpackChunkName: "classify" */ '../views/Home/Children/Goods/GoodsClass.vue') },
      { path: "reports", name: "reports", component: () => import(/* webpackChunkName: "dataList" */ '../views/Home/Children/DataList/DataList.vue') },
      { path: "orders", name: "orders", component: () => import(/* webpackChunkName: "orderList" */ '../views/Home/Children/OrderList/OrderList.vue') },
      { path: "rights", name: "rights", component: () => import(/* webpackChunkName: "powerList" */ '../views/Home/Children/Power/PowerList.vue') },
      { path: "roles", name: "roles", component: () => import(/* webpackChunkName: "role" */ '../views/Home/Children/Power/Role.vue') },
    ]
  },
  //错误重定向
  { path: "*", redirect: "/login" }
]

const router = new VueRouter({
  routes
})
// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token")
  if (to.path == '/' || to.path == "/login") {
    next()
  } else {
    if (token) {
      next()
    }
    else {
      next("/")
    }
  }
})

export default router
