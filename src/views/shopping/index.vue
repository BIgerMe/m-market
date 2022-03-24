<template>
  <div>
    <div>
      <van-search
        v-model="key"
        shape="round"
        background="#4fc08d"
        placeholder=""
        style="border-bottom-left-radius: 60% 15%;border-bottom-right-radius: 60% 15%;"
      />
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in swipeImages" :key="image">
          <img :src="image" style="width: 100vw;height:180px;object-fit:cover"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-row gutter="15" style="padding: 10px" v-if="lists">
      <van-col span="12">
        <van-col :span="24" v-for="(item,index) in lists" style="padding-right: 0!important;">
          <router-link v-if="!(index % 2)" target="_self" :to="{name:'g_detail',params:{id:item.id}}">
            <img :style="style" :src="item.cover">
            <div style="margin: -2px 0 5px 0!important;color: rgba(19,19,19,0.7);padding:8px;background: #ffffff;border-radius: 0 0 5px 5px">
              <div style="text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;word-break: break-all;-webkit-box-orient: vertical;overflow: hidden;">
                {{item.title}}
              </div>
              <div style="margin-top: 5px;">
                <span aria-hidden="true">
                  <span class="price-symbol">¥</span>
                  <span class="price-whole">{{item.price_int}}<span class="price-decimal">.</span></span>
                  <span class="price-fraction">{{item.price_decimal}}</span>
                </span>
              </div>
            </div>
          </router-link>
        </van-col>
      </van-col>
      <van-col span="12">
        <van-col :span="24" v-for="(item,index) in lists" style="padding-right: 0!important;">
          <router-link v-if="index % 2" target="_self" :to="{name:'g_detail',params:{id:item.id}}">
            <img :style="style" :src="item.cover">
            <div style="margin: -2px 0 5px 0!important;color: rgba(19,19,19,0.7);padding:8px;background: #ffffff;border-radius: 0 0 5px 5px">
              <div style="text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;word-break: break-all;-webkit-box-orient: vertical;overflow: hidden;">
                {{item.title}}
              </div>
              <div style="margin-top: 5px;">
                <span aria-hidden="true">
                  <span class="price-symbol">¥</span>
                  <span class="price-whole">{{item.price_int}}<span class="price-decimal">.</span></span>
                  <span class="price-fraction">{{item.price_decimal}}</span>
                </span>
              </div>
            </div>
          </router-link>
        </van-col>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import {goodsLists, categoryList} from '@/api/shopping'

  export default {
    name: 'm_home',
    data() {
      return {
        key:'',
        swipeImages:[
          '//head.xxroom.xyz/FpTRUHrNiEcw3wX2a887RzOkxqEN',
          '//head.xxroom.xyz/FiIUY2Tj4LV2phG3x3N8d777WAmw',
        ],
        lists: null,
        category: []
      }
    },
    computed:{
      style(){
        let width = document.body.clientWidth;
        let height = (width - 15) / 2;
        return { width: '100%',height:height+'px', objectFit: 'cover',borderRadius:'5px 5px 0 0'}
      }
    },
    components: {},
    mounted() {
      this.getList()
    },
    methods: {
      async getList() {
        const {data} = await goodsLists({page: 1, pageSize: 10})
        this.lists = data.data
        console.log(this.lists)

      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";

</style>

