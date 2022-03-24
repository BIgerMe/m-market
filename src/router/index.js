/**
 * @author zhangxiaoming
 */

import {createRouter, createWebHashHistory} from "vue-router";

import Layout from '@/layouts'

const routes = [
  {
    path: "/",
    redirect: "/shopping",
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '主页',
        },
      }
    ]
  },
  {
    path: "/shopping",
    redirect: "/shopping/index",
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'm_home',
        component: () => import('@/views/shopping'),
        meta: {
          title: '商品首页',
        },
      },
      {
        path:"/shopping/cart",
        component: () => import('@/views/shopping/cart'),
        name: 'c',
        title: '购物车',
      },
    ]
  },
  {
    path:"/shopping/detail/:id",
    component: () => import('@/views/shopping/detail'),
    name: 'g_detail',
    title: '商品详情',
  },
  {
    path:"/shopping/order/:ids",
    component: () => import('@/views/shopping/order'),
    name: 'o',
    title: '订单',
  },

]

const router = new createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
