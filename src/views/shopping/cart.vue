<template>
  <div>
    <van-checkbox-group v-model="checked" @change="changeSelect" ref="checkboxGroup">
      <div v-for="(item,index) in data" style="background: white!important">
        <van-swipe-cell>
          <div style="width:30px;display: inline-block;text-align: center;position: relative;">
            <van-checkbox :name="item.id" style="position:absolute;bottom: 30px;left:30%"></van-checkbox>
          </div>
          <van-card
            :style="{width:(width-30)+'px'}"
            style="display: inline-block;margin-top: 0!important;"
            :thumb="item.cover"
          >
            <template #title>
              {{item.title}}
            </template>
            <template #price>
              <div style="font-size: 16px;color: #ff4142;line-height: 16px;padding: 10px 0">￥{{parseFloat(item.price *
                item.num).toFixed(2)}}
              </div>
            </template>
            <template #num>
              <van-stepper v-model="item.num" @change="changeNum(item)" style="float: right"/>
            </template>
            <template #desc>
              <span style="display:inline-block;background: #0000001a;padding: 3px 5px;border-radius: 3px;margin:5px 0">
                {{'已选：'+item.item_title+'， '+item.num+'件'}}</span>
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" @click="del(item.id,index)" type="danger" class="delete-button"/>
          </template>
        </van-swipe-cell>
      </div>
    </van-checkbox-group>
    <van-submit-bar :price="total" button-text="去结算" @submit="handleOrder" style="margin-bottom: 50px">
      <van-checkbox v-model="checkAll" @click="toggleAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
  import {cartList,delCart,changeNum} from "@/api/shopping";
  import {ref} from 'vue';

  export default {
    name: "c",
    setup() {
      const data = ref([])
      const checked = ref([]);
      const checkboxGroup = ref(null);
      const checkAll = ref(false)
      const toggleAll = () => {
        checkboxGroup.value.toggleAll(checkAll.value);
      }
      return {
        data,
        checked,
        checkAll,
        toggleAll,
        checkboxGroup,
      };
    },
    computed: {
      width() {
        return document.body.clientWidth
      },
      total(){
        let total = 0;
        for(let i in this.data){
          if(this.checked.indexOf(this.data[i].id) !== -1){
            total +=this.data[i].price * this.data[i].num*100
          }
        }
        return total
      }
    },
    async mounted() {
      await this.getCartList()
    },
    methods: {
      async getCartList() {
        const {data} = await cartList()
        this.data = data
      },
      changeSelect(){//改变checkbox值
        this.checkAll = (this.data.length === this.checked.length) ? true : false
      },
      async changeNum(item){//改变商品数量
        await changeNum(item)
      },
      async del(id,index){//删除商品
        await delCart({id:id})
        this.data.splice(index,1)
        for(let i in this.checked){
          if(this.checked[i] === id){
            this.checked.splice(i,1)
          }
        }
        console.log(this.checked)
      },
      handleOrder() {//提交结算
        if(this.checked.length>0){
          let routeData = this.$router.resolve({ name: 'o', params: {ids:this.checked.toString()} });
          window.open(routeData.href, '_self')
        }
      },
    }
  }
</script>

<style scoped>
  .van-card {
    background: white !important;
  }
  .delete-button { /*滑动单元格删除按钮*/
    height: 100%;
  }
</style>