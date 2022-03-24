<template>
  <div style="margin-bottom:50px">
    <router-view :key="key" class="app-main-height"/>
  </div>
  <div>
    <van-tabbar v-model="active" @change="changeTab">
      <van-tabbar-item icon="shop-o">商城</van-tabbar-item>
      <van-tabbar-item icon="location-o">本地</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  import {footerCopyright} from '@/config'
  import {useUserStore} from '@/store/modules/user'
  import {getUrlParam} from '@/utils/common'

  export default ({
    name: 'appMain',
    data() {
      return {
        active:0,
        user: useUserStore(),
        footerCopyright
      }
    },
    mounted() {
      let code = getUrlParam('code')
      if (code !== null && !this.user.accessToken) {//如果是微信登陆
        //根据code获取access_token
        this.user.wxLogin({code})
      }
    },
    components: {

    },
    computed: {
      key() {
        return this.$route.path
      },
    },
    methods: {
      changeTab() {
        switch (this.active) {
          case 0:
            this.$router.push('/shopping/')
            break
          case 1:
            this.$router.push('/shopping/')
            break;
          case 2:
            this.$router.push('/shopping/cart')
            break;
          case 3:
            this.$router.push('/shopping/')
            break;
          default:
            console.log(e)
            break;
        }
      },
      logout() {
        this.user.logout()
        const fullPath = this.$route.fullPath
        this.$router.push(`/login?redirect=${fullPath}`)
      },
    }
  });
</script>
<style>

</style>
