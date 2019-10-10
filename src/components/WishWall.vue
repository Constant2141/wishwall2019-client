<template>
  <div class="wish-wall">
      <div class="header">
        <ul>
          <li
            v-for="(school,index) in schools"
            :key="index"
            :class="{'toggle-bg':index == isActive}"
            @click="changeCampus(index)">{{school}}</li>
        </ul>  
      </div>
      <div class="banner">
        <swiper :options="swiperOption">
          <swiper-slide><img src="../assets/banner/wishwall.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/banner/reverse.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/banner/wishwall.jpg" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="scroll-wrap">
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh">
            <van-list>
              <div class="wish"
                  v-for="(wish,index) in wishes" 
                  :key="index">
                  <div class="wish-body">
                    <div class="take-button"
                      @click="takeWish(index)"
                      :class="{'taken-button':wishes[index].gainOrNot}">
                      <span v-show="!wishes[index].gainOrNot">领取心愿</span>
                      <span v-show="wishes[index].gainOrNot">您已领取</span>
                    </div>
                    <div class="wish-content">
                      <div class="wish-avatar">
                        <div class="yellow-left"></div>
                        <div class="avatar-wrapper">
                          <span v-if="wish.anonymous"><img src="../assets/Avatar/GirlAvatar.png" alt=""></span>
                          <span v-if="!wish.anonymous"><img :src="wish.headimgurl" alt=""></span>
                        </div>
                        <div class="yellow-right"></div>
                      </div>
                      <div class="wish-txt">
                        <b class="name">{{wish.nickname}}</b>
                        <div class="content">{{wish.wish_content}}</div>
                        <div class="wish-tag">
                          <span class="tag">#{{wish.wish_type}}</span>
                          <span class="tag">#{{wish.wish_where}}</span>
                          <span class="tag take">
                            <span v-show="wish.wish_many > 0">已被{{wish.wish_many}}人领取</span>
                            <span v-show="wish.wish_many == 0">未被领取</span>
                          </span>
                          <span class="tag time">{{wish.time}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="contact-way"
                      v-show="wishes[index].gainOrNot">联系方式 : {{wish.contact?wish.contact:'这个小姐姐没有填写联系方式噢'}}</div>
                  </div>
                  <div class="separate"></div>  
                </div>
            </van-list>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      swiperOption:{
        autoplay:3000,
        speed:1000,
        loop:true,
        pagination:'.swiper-pagination'
      },
      schools:[
        "全部",
        "大学城",
        "龙洞",
        "东风路"
      ],
      isActive:0,
      wishes:[],
      page:1,
      isLoading:false
    }
  },
  methods:{
    onRefresh(){
      setTimeout(()=>{
        this.getData();
        this.isLoading = false; 
      },600)
    },
    getData(){
      this.$axios.get('/wish/list',{
        params:{
          curPage:this.page,
        }
      })
      .then(res=>{
        if(res.status == 200){
          let temp = res.data.result.wishList;
          
          this.wishes = temp;
        }
      })
      .catch(err =>console.log(err))
    },
    takeWish(index){
      this.wishes[index].gainOrNot = true; 
      this.$axios.get('/wish/gain',{
        params:{
          uuid:this.wishes[index].uuid
        }
      })
    },
    changeCampus(index){
      this.isActive = index;
      let campus = event.currentTarget.innerHTML;
      this.$axios.get('/wish/list',{
        params:{
          curPage:1,
          
          wish_where:campus=='全部'?'':`${campus}校区`
        }
      })
      .then(res=>{
        if(res.status == 200){
          this.wishes =  res.data.result.wishList;
        }
      })
      .catch(err =>console.log(err))
    },
  },
  created(){
   
  },
  mounted(){
    this.getData();  
  }
}
</script>

<style scoped>
.wish-wall{
  height: 90vh;
  overflow: auto;
}
*{
  margin:0;
  padding:0;
}
.header{
  position: fixed;
  height:156px;
  width:375px;
  background:linear-gradient(#fd9cbf,#fff8c9);
  border-radius: 0 0 28px 28px;
  margin-bottom: 60px;
  z-index: 10;
}
ul{
  position: relative;
  display: flex;
  color: #fff;
  justify-content: space-around;
  top: 30px;
  z-index: 2;
}
li{
  list-style-type: none;
  text-align: center;
  width:60px;
  height: 28px;
  border-radius: 15px;
  line-height: 28px;
}
.toggle-bg{
  background-color: #FF9D9D;
}
.banner{
  position: fixed;
  width:322px;
  height:133px;
  border-radius:10px;
  top:74px;
  left:0;
  right: 0;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 4px 10px #e1e1e1;
  z-index: 20;
}
.banner img{
  width: 100%;
}
.banner >>> .swiper-pagination-bullet-active{
  background: #ffffff
}

.scroll-wrap{
  position: relative;
  top:230px;
  height:100vh;
}
/* .wish{
  position: relative;
  top:230px;
} */
.wish-body{
  padding: 0 24px 0 24px;
}
.take-button{
  width: 52px;
  font-size: 10px;
  height: 20px;
  position: absolute;
  background: linear-gradient(135deg,#fd9cbf,#fff8c9);
  border-radius: 15px;
  right: 24px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
}
.taken-button{
  background: #D2D2D2 !important; 
}
.wish-content,
.wish-avatar,
.wish-txt,
.wish-tag{
  display: flex;
}
.wish-tag {
  justify-content: space-between;
  align-items: center;
  width: 238px;
}
.yellow-left{
  position: relative;
  width:22px;
  height: 22px;
  background-color: #FFFCA2;
  z-index:-1;
  top:28px;
  border-radius: 22px;
}
.avatar-wrapper{
  position: relative;
  width: 46px;
  height: 46px;
  background-color: #fff8c9;
  border: 3.4px solid #FEBCC2;
  border-radius: 50px;
  left: -12px;
  overflow: hidden;
}
.avatar-wrapper img{
  width: 50px;
}
.yellow-right{
  position: relative;
  left: -16px;
  width:11px;
  height: 11px;
  background-color: #FFFDC5;
  border-radius: 11px;
}
.wish-txt{
  flex-direction:column;
  font-size: 12px; 
}
b{
  margin-bottom:12px;
}
.content{
  margin-bottom: 12px;
}
.tag{
  font-size: 10px;
  color: #989898;
}
.take{
  color: #FF94B4;
}
.contact-way{
  background-color: #FFC4C4;
  width: 310px;
  color: #fff;
  font-size: 10px;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  box-shadow:0 4px 10px #e1e1e1; 
  margin:10px 0 0 0;
  word-break: break-all;
}
.separate{
  width: 375px;
  height: 1px;
  background-color:#F1F1F1;
  margin-bottom: 16px;
  margin-top:16px;
}

</style>
