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
  }

]

const router = new VueRouter({
  routes
})

export default router
