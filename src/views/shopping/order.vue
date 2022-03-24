<template>
  <div class="address">
    <div class="content">
      <div class="address_pca">江苏无锡市锡山区</div>
      <div class="address_detail">礼嘉镇陆庄村委殷家村57号</div>
      <div class="address_user">张晓明 15555555555</div>
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
  import { useRoute } from 'vue-router';
  import { ref,onMounted } from 'vue';
  import {cartListById} from "@/api/shopping";
  export default {
    name: "o",
    setup() {
      const router = new useRoute()
      let data = ref([])
      onMounted(() => {
        cartListById(router.params).then((res)=>{
          data.value = res.data //在Proxy代理中需要用value来获取值，否则获取不到
        })
      })
      return {
        data
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
    methods:{
      test(){
        console.log(this.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";
</style>