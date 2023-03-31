import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Index'),
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('@/components/views/Home')
        }
      ]
    },
    {
      path: '/pages',
      component: () => import('@/layout/Index'),
      children: [
        {
          name: 'Lock',
          path: 'lock',
          component: () => import('@/components/views/Lock')
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/components/views/Login')
        },
        {
          name: 'Register',
          path: 'register',
          component: () => import('@/components/views/Register')
        },
        {
          name: 'OptiOne',
          path: 'opti1d',
          component: () => import('@/components/views/OptiOne')
        },
        {
          name: 'OptiArea',
          path: 'optiarea',
          component: () => import('@/components/views/OptiArea')
        },
        {
          name: 'Forget',
          path: 'forget',
          component: () => import('@/components/views/Forget')
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/layout/Index'),
      children: [
        {
          name: '404 Error',
          path: '',
          component: () => import('@/components/views/Error')
        }
      ]
    }
  ]
})
