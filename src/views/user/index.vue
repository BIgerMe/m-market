<template>
  <div>
    <van-row>
      <van-col span="24" style="text-align: right">
        <router-link target="_self" :to="{name:'u_config'}">
          <van-icon name="setting-o" size="24" style="margin: 5px 10px"/>
        </router-link>
      </van-col>
      <van-col span="6" style="text-align: center">
        <van-image
          round
          width="64px"
          height="64px"
          :src="userStore.avatar"
        />
      </van-col>
      <van-col span="18">
        <p>{{userStore.nickname}}</p>
      </van-col>
    </van-row>
    <van-grid :column-num="2" direction="horizontal" :border="false" icon-size="12px">
      <van-grid-item v-for="item in shoppingList" :key="item.name" :icon="item.icon" :text="item.title"/>
    </van-grid>
    <van-grid :column-num="5"  :border="false">
      <van-grid-item v-for="item in orderList" :key="item.name" :icon="item.icon" :text="item.title" :style="{color:item.color}"/>
    </van-grid>
  </div>
</template>

<script>
    import { useUserStore } from '@/store/modules/user'
    import {ref} from 'vue';
    export default {
    name: 'u',
    setup() {
      //用户
      const userStore = useUserStore()
      //列表配置
      const shoppingList = ref([
        {title:'商品收藏',name:'1',icon:'star-o'},
        {title:'浏览记录',name:'2',icon:'underway-o'},
      ])
      const orderList = ref([
        {title:'待付款',name:'1',icon:'credit-pay',color:'black'},
        {title:'待收货',name:'2',icon:'send-gift-o',color:'black'},
        {title:'待评价',name:'3',icon:'thumb-circle-o',color:'black'},
        {title:'退换/售后',name:'4',icon:'after-sale',color:'black'},
        {title:'我的订单',name:'5',icon:'completed',color:'red'},
      ])
      return {
        userStore,
        shoppingList,
        orderList
      }
    },
  }
</script>
