import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import DepartmentPage from '../pages/DepartmentPage.vue'
import EmployeePage from '../pages/EmployeePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/department',
    name: 'Department',
    component: DepartmentPage
  },
  {
    path: '/employee/:id',
    prop:true,
    name: 'Employee',
    component: EmployeePage
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
