<template>

  <van-empty description="暂无地址" v-show="data.length<=0"/>
  <div class="address" v-for="item in data">
    <div class="content">
      <div class="address_pca">{{item.province+item.city+item.county}} <van-tag type="danger" v-if="item.isDefault">默认</van-tag></div>
      <div class="address_detail">{{item.addressDetail}}</div>
      <div class="address_user">{{item.name + ' '+ item.tel}}</div>
    </div>
    <van-icon @click="handleEdit(item.id)" name="edit" size="24" style="line-height: 80px;position:absolute;right: 10px" />
  </div>
  <div style="padding: 5px 10px;bottom: 0;left:0;right:0;position: fixed">
    <van-button type="danger" block round @click="handleAdd">新建收货地址</van-button>
  </div>
</template>

<script>
    import {useRouter} from 'vue-router'
    import {list} from "@/api/address";
    import {onMounted, ref} from 'vue';
    export default {
    name: 'u_address',
    setup() {
      const router = useRouter()
      function handleAdd(){
        router.push('/user/address/add')
      }
      function handleEdit(id){
        router.push('/user/address/edit/'+id)
      }
      //用户
      let data = ref([])
      onMounted(() => {
        list().then((res)=>{
          data.value = res.data //在Proxy代理中需要用value来获取值，否则获取不到
        })
      })
      //列表配置
      return {
        data,
        handleAdd,
        handleEdit
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";
</style>