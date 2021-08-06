import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '../services'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Auth/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    components: {
      login: Login
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth:true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!auth.loggedIn()) {
      next({
        path: '/login',
        query: {redirect:to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
