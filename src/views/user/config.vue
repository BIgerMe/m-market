<template>
  <div>
    <van-cell-group>
      <van-row>
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
      <van-cell title="地址管理" is-link to="address" />
    </van-cell-group>
  </div>
</template>

<script>
    import { useUserStore } from '@/store/modules/user'
    import {ref} from 'vue';
    export default {
    name: 'u_config',
    setup() {
      //用户
      const userStore = useUserStore()
      //列表配置
      return {
        userStore,
      }
    },
  }
</script>
