/**
 * @author zhangxiaoming
 */

import {createRouter, createWebHashHistory} from "vue-router";

import Layout from '@/layouts'
import Null from '@/layouts/null'

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
        path:"cart",
        component: () => import('@/views/shopping/cart'),
        name: 'c',
        title: '购物车',
      },
    ]
  },
  {
    path: "/shopping",
    component: Null,
    children: [
      {
        path:"detail/:id",
        component: () => import('@/views/shopping/detail'),
        name: 'g_detail',
        title: '商品详情',
      },
      {
        path:"order/:ids",
        component: () => import('@/views/shopping/order'),
        name: 'o',
        title: '订单',
      },
      {
        path:"address",
        component: () => import('@/views/shopping/address'),
        name: 'o_address',
        title: '选择地址',
      },
      {
        path:"address/add",
        component: () => import('@/views/shopping/address/add'),
        name: 'o_address_add',
        title: '新增地址',
      },
      {
        path:"address/edit/:id",
        component: () => import('@/views/shopping/address/edit'),
        name: 'o_address_edit',
        title: '更新地址',
      },
    ]
  },
  {
    path: "/user",
    redirect: "/user/index",
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'u',
        component: () => import('@/views/user/index'),
        meta: {
          title: '个人中心',
        },
      },
      {
        path: 'config',
        name: 'u_config',
        component: () => import('@/views/user/config'),
        meta: {
          title: '个人配置',
        },
      },
    ]
  },
  {
    path: '/user/address',
    component: Null,
    children: [
      {
        path: '',
        name: 'u_address',
        component: () => import('@/views/user/address'),
        meta: {
          title: '地址管理',
        },
      },
      {
        path: 'add',
        name: 'address_add',
        component: () => import('@/views/user/address/add'),
        meta: {
          title: '添加地址',
        },
      },
      {
        path: 'edit/:id',
        name: 'address_edit',
        component: () => import('@/views/user/address/edit'),
        meta: {
          title: '更新地址',
        },
      },
    ]
  },

]

const router = new createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
