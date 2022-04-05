<template>
  <div v-if="!address" class="address">
    <van-button type="danger" size="small" class="bottom-button" @click="addAddress">新增收件地址</van-button>
  </div>
  <div class="address" v-else @click="addAddress">
    <div class="content">
      <div class="address_pca">{{address.province+address.city+address.county}}</div>
      <div class="address_detail">{{address.addressDetail}}</div>
      <div class="address_user">{{address.name+' '+address.tel}}</div>
    </div>
    <van-icon name="arrow" style="line-height: 80px;position:absolute;right: 10px" />
  </div>
  <div>
    <div class="item" style="margin: 10px 0;background: white">
      <van-cell title="已选商品">共{{data.length}}件</van-cell>
      <div style="margin: 5px">
        <van-image v-for="item in data" fit="cover" width="100" height="100" radius="5" style="margin: 0 3px" :src="item.cover" />
      </div>
    </div>
    <div class="item" style="margin: 10px 0;background: white">
      <van-cell title="商品价格">￥{{total}}</van-cell>
      <van-cell title="运费">￥0.00</van-cell>
    </div>
  </div>
  <van-submit-bar :price="total*100" button-text="提交订单" @submit="test" />
</template>

<script>
  import { useRoute,useRouter } from 'vue-router';
  import { ref,onMounted } from 'vue';
  import {cartListById} from "@/api/shopping";
  import {select} from '@/api/address'
  export default {
    name: "o",
    setup() {
      const router = new useRouter()
      const route = new useRoute()
      let data = ref([])
      let address = ref([])
      /*mounted*/
      onMounted(() => {
        cartListById(route.params).then((res)=>{
          data.value = res.data //在Proxy代理中需要用value来获取值，否则获取不到
        })
        select().then((res)=>{
          address.value = res.data
        })
      })
      /*func*/
      const addAddress = ()=>{
        router.push('/shopping/address')
      }
      return {
        data,
        address,
        addAddress
      }
    },
    computed:{
      total() {
        let total = 0;
        for (let i in this.data) {
          total += this.data[i].price * this.data[i].num
        }
        return parseFloat(total).toFixed(2)
      }
    },
    methods:{}
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";
</style>