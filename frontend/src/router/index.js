import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '../services'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Auth/Login.vue'
import Leads from '@/views/Leads'
import Agenda from '@/views/Agenda'
import Produtos from '@/views/Produtos'
import Mensagens from '@/views/Mensagens'
import Usuarios from '@/views/Usuarios'

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
  },
  {
    path: '/leads',
    name: 'Leads',
    component: Leads,
    meta: {requiresAuth:true}
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
    meta: {requiresAuth:true}
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos,
    meta: {requiresAuth:true}
  },
  {
    path: '/mensagens',
    name: 'Mensagens',
    component: Mensagens,
    meta: {requiresAuth:true}
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios,
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
