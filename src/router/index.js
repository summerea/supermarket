import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'home', redirect: "/login", component: Home
  },
  {
    path: '/login', name: 'login', component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  },
  {
    path: '/home', name: 'home', component: () => import(/* webpackChunkName: "about" */ '../views/Home/Home.vue')
  },
  //错误重定向
  {path:"*",redirect:"/login"}
]

const router = new VueRouter({
  routes
})

export default router
