<template>
  <div>
    <div>
      <van-swipe lazy-render :style="height">
        <van-swipe-item v-for="image in form.imgList" :key="image">
          <img :src="image" :style="height" style="object-fit:cover;width: 100%" />
        </van-swipe-item>
        <template #indicator="{ active, total }">
          <div class="custom-indicator">{{ active + 1 }} / {{ total }}</div>
        </template>
      </van-swipe>
    </div>
    <div class="detail-card">
      <div aria-hidden="true" style="padding:15px 15px 0 15px">
          <span class="price-symbol">¥</span>
          <span class="price-whole">{{form.price_int}}<span class="price-decimal">.</span></span>
          <span class="price-fraction">{{form.price_decimal}}</span>
      </div>
      <div style="padding:15px 15px 15px 15px">{{form.title}}</div>
    </div>
    <div class="detail-card">
      <div style="padding:0 15px ;font-size: 10px">
        <van-grid :column-num="5" :border="false">
          <van-grid-item v-for="item in form.item" style="border: 0!important">
            <img :src="item.cover" :style="{width:w_width/6+'px',height:w_width/6+'px',objectFit:'cover'}" />
            <div>{{item.title}}</div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div style="height: 200px;line-height:150px;text-align: center">
      不言电子商务
    </div>
    <!--动作栏1-加入购物车-->
    <div>
      <van-action-sheet v-model:show="show.handleAddCart">
        <div v-if="show.handleAddCartSuccess === false">
          <div style="margin-bottom: 60px">
            <div style="text-align: center;margin: 20px 0 10px 0;color: red;font-size: 20px">
              ￥{{parseFloat(select.item.price*select.num).toFixed(2)}}
            </div>
            <div style="text-align: center;font-size:12px">
              <span style="display:inline-block;background: #0000001a;padding: 3px 5px;border-radius: 3px">{{'已选：'+select.item.title+'， '+select.num+'件'}}</span>
            </div>
            <div>
              <van-cell :title="'规格('+form.item.length+')'"></van-cell>
              <van-grid :column-num="3" :border="false">
                <van-grid-item @click="selectItem(item)" v-for="item in form.item" :style="{border: item.id === select.item.id ? '1px solid #ff4142' : ''}">
                  <img :src="item.cover" :style="{width:w_width/3.8+'px',height:w_width/3.8+'px',objectFit:'cover'}" />
                  <div :style="{width:w_width/3.8+'px',background:'#0000001a',textAlign:'center',fontSize:'12px'}">{{item.title}}</div>
                </van-grid-item>
              </van-grid>
            </div>
            <div>
              <van-cell-group inset>
                <van-cell title="数量">
                  <van-stepper v-model="select.num" />
                </van-cell>
              </van-cell-group>
            </div>
          </div>
          <div style="padding: 5px 10px;bottom: 0;left:0;right:0;position: fixed">
            <van-button type="danger" block round @click="handleAddCartSubmit">确定</van-button>
          </div>
        </div>
        <div v-else>
          <div>
            <div style="margin-bottom: 60px">
              <div style="text-align: center;margin: 20px 0 10px 0;color: red;font-size: 20px">
                <van-icon name="checked" />加入购物车成功
              </div>
              <div style="text-align: center;font-size:12px">
                <span style="display:inline-block;background: #0000001a;padding: 3px 5px;border-radius: 3px">{{'已选：'+select.item.title+'， '+select.num+'件'}}</span>
              </div>
            </div>
          </div>
          <div style="padding: 5px 10px;bottom: 0;left:0;right:0;position: fixed">
            <div style="width: 50%;display: inline-block">
              <van-button type="default" size="small" style="width: 90%;" round @click="command('again')">继续逛</van-button>
            </div>
            <div style="width: 50%;display: inline-block">
              <van-button type="danger" size="small" style="width: 90%;" round @click="command('cart')">去购物车结算</van-button>
            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>
    <!--动作栏2-立即购买-->
    <div>
      <van-action-sheet v-model:show="show.handleBuy">
        <div class="content" style="margin-bottom: 60px">
          <div style="text-align: center;margin: 20px 0 10px 0;color: red;font-size: 20px">
            ￥{{parseFloat(select.item.price*select.num).toFixed(2)}}
          </div>
          <div style="text-align: center;font-size:12px">
            <span style="display:inline-block;background: #0000001a;padding: 3px 5px;border-radius: 3px">{{'已选：'+select.item.title+'， '+select.num+'件'}}</span>
          </div>
          <div>
            <van-cell :title="'规格('+form.item.length+')'"></van-cell>
            <van-grid :column-num="3" :border="false">
              <van-grid-item @click="selectItem(item)" v-for="item in form.item" :style="{border: item.id === select.item.id ? '1px solid #ff4142' : ''}">
                <img :src="item.cover" :style="{width:w_width/3.8+'px',height:w_width/3.8+'px',objectFit:'cover'}" />
                <div :style="{width:w_width/3.8+'px',background:'#0000001a',textAlign:'center',fontSize:'12px'}">{{item.title}}</div>
              </van-grid-item>
            </van-grid>
          </div>
          <div>
            <van-cell-group inset>
              <van-cell title="数量">
                <van-stepper v-model="select.num" />
              </van-cell>
            </van-cell-group>
          </div>
        </div>
        <div style="padding: 5px 10px;bottom: 0;left:0;right:0;position: fixed">
          <van-button type="danger" block round @click="handleBuy">确定</van-button>
        </div>
      </van-action-sheet>
    </div>
  </div>
  <!--底部按钮栏-->
  <div>
    <van-action-bar>
      <van-action-bar-icon icon="cart-o" text="购物车" />
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <van-action-bar-button type="warning" text="加入购物车" @click="show.handleAddCart = true" />
      <van-action-bar-button type="danger" text="立即购买" @click="show.handleBuy = true" />
    </van-action-bar>
  </div>
</template>

<script>
  import {addCart,goodsDetail} from '@/api/shopping'
  export default {
    name: 'g_detail',
    data() {
      return {
        show:{
          handleBuy:false,
          handleAddCart:false,
          handleAddCartSuccess:false,
        },
        select:{//选择的规格
          item:'',
          num:1,
        },
        form : {
            id:'',
            title:'',
            cover:'',
            video:'',
            imgList:[],
            price:0,
            origin_price:'',
            unit:'件',
            min:0,
            max:0,
            storage:0,
            shelf:'0',
            recommend:0,
            category:[],
        },
      }
    },
    computed:{
      w_width(){
        return document.body.clientWidth
      },
      height(){
        let height = document.body.clientWidth;
        return { width: '100%',height:height+'px'}
      }
    },
    components:{},
    created() {
      this.init()
    },
    mounted() {},
    methods: {
      async init() { //初始化详情数据、规格数据
        const { data } = await goodsDetail({ id: this.$route.params.id })
        this.form = data
        for(let i in data.item){
          if(data.item[i].is_default == '是'){
            this.select.item = data.item[i];
            break;
          }
        }
      },
      selectItem(item){//选择规格
        this.select.item = item
      },
      /*添加到购物车*/
      async handleAddCartSubmit(){
        await addCart(this.select)
        this.show.handleAddCartSuccess = true
      },
      /*立即购买*/
      async handleBuy(){
        const {data} = await addCart(this.select)
        const id = data.id
        this.$router.push('/shopping/order/'+id)
      },
      command(type){ //综合动作
        switch(type){
          case 'again':
            this.init();
            this.select.num = 1;
            this.show.handleAddCart = false
            this.show.handleAddCartSuccess = false
            break;
          case 'cart':
            break;
          default:
            break;
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/shopping/index.scss";
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background: rgba(0, 0, 0, 0.1);
  }
</style>

