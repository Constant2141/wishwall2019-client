<template>
  <div class="wish-wall">
    <div class="header">
      <ul>
        <li
          v-for="(school,index) in schools"
          :key="index"
          :class="{'toggle-bg':index == isActive}"
          @click="changeCampus(index)">{{school}}</li>
        <li class="tip-wrapper">
          <img src="@/assets/tips.png" style="width:20px" @click="checkTips()">
        </li>
      </ul> 
      <div class="banner">
        <swiper :options="swiperOption">
          <swiper-slide><img src="../assets/banner/wishwall.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/banner/reverse.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/banner/planet.png" alt=""></swiper-slide>
          <swiper-slide><img src="../assets/banner/treehole.png" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
      <div class="scroll-wrap">
        <van-pull-refresh
          v-model="isDownLoading"
          @refresh="onRefresh">
            <div>
                <div class="wish"
                  v-for="(wish,index) in wishes" 
                  :key="index">
                  <div class="wish-body">
                    <div class="take-button"
                      @click="takeWish(index)"
                      :class="{'taken-button':wishes[index].gainOrNot}">
                      <span v-if="!wishes[index].gainOrNot">领取心愿</span>
                      <span v-if="wishes[index].gainOrNot">您已领取</span>
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
                            <span v-show="wish.wish_many">{{wish.wish_many}}人领取</span>
                            <span v-show="!wish.wish_many">未被领取</span>
                          </span>
                          <span class="tag time">{{wish.createdAt}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="contact-way"
                      v-show="wishes[index].gainOrNot">联系方式 : {{wish.contact?wish.contact:'这个小姐姐没有填写联系方式噢'}}</div>
                  </div>
                  <div class="separate" v-show="!wishes[index].gainOrNot"></div>  
                </div>
            </div>
            <h2 class="loading-more">
              <p v-show='loadState==0'>下拉加载更多</p>
              <p v-show='loadState==1'>正在加载</p>
            </h2>
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
      wishTotal:'', //心愿的总条数
      curCampus:'全部', //当前所在学校，默认为全部
      isBottom:'', //是否是页面最底端
      isDownLoading:false, //是否处于刷新状态
      loadState: 0,//定义0是不加载(浏览)状态，1为正在加载，2为加载完毕,没有更多数据了
    }
  },
  methods:{
    onRefresh(){
      this.page = 1;
      setTimeout(()=>{
        this.getData()
        this.isDownLoading = false; 
      },600)
    },
    checkBottom(){
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;// 获取滚动条的高度
      // console.log(scrollTop)
      const winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
      const scrollHeight = (function() {
        let bodyScrollHeight = 0
        let documentScrollHeight = 0
        if (document.body) {
          bodyScrollHeight = document.body.scrollHeight
        }
        if (document.documentElement) {
          documentScrollHeight = document.documentElement.scrollHeight
        }
        // 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
        return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      })()
      this.isBottom = scrollTop >=parseInt(scrollHeight)-winHeight;
    },
    onLoadList(){
      //滚动条是否到达底部
      this.checkBottom();
      if(this.isBottom){
        console.log('a')
       this.loadState = 1;
       setTimeout(()=>{
         let tempList = this.wishes;
         this.page++;
         this.getData();
         this.wishes = [...tempList,...this.wishes];
         
         //改变滚动条位置，一直位于底部的话会反复触发加载函数
       },1500)
        
      }else{
        this.loadState = 0;
      }
    },
    getData(){
      let campus = this.curCampus;
      this.$axios.get('/wish/list',{
        params:{
          curPage:this.page,
          wish_where:campus=='全部'?'':`${campus}校区`
        }
      })
      .then(res=>{
        if(res.status == 200){
          // console.log(res.data.result.wishList)
          let temp = res.data.result.wishList.rows;
          this.handleAnonymous(temp);
          this.handleTime(temp);
          this.wishes = temp;
          this.wishTotal = res.data.result.wishList.count;
        }
      })
      .catch(err =>console.log(err))
    },
    takeWish(index){
      this.wishes[index].gainOrNot = true;
      //一开始的wish_many是第一次发请求获得的，所以这里要手动加一
      this.wishes[index].wish_many++; 
      this.$axios.get('/wish/gain',{
        params:{
          uuid:this.wishes[index].uuid
        }
      })
    },
    changeCampus(index){
      this.isActive = index;
      this.curCampus = event.currentTarget.innerHTML;
      this.getData();
    },
    handleAnonymous(arr){
      arr.map(item=>{
        if(item.anonymous == true){
          item.nickname = item.nickname.slice(0,1)+'**'
        }
        return arr;
      })
    },
    handleTime(arr){
      let curDay = new Date().getDate();
      arr.map(item=>{
        let time = new Date(item.createdAt);
        let createDay = time.getDate();
        if(createDay == curDay){
            item.createdAt = time.getHours()+':'+time.getMinutes();
        }else{
            let gapDay = curDay - createDay;
            item.createdAt = gapDay + '天前';
        }
    })
    return arr;
    },
    checkTips(){
      console.log('tips')
    }
  },
  mounted(){
    this.getData();
    window.addEventListener("scroll", this.onLoadList)
  },
  //离开该页面时移除，否则会一直监听
  beforeDestroy(){
    window.removeEventListener("scroll", this.onLoadList)
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
.header{
  position:fixed;
  background-color:#fff; 
  z-index: 20;
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
ul{
  position:relative;
  display: flex;
  color: #000;
  top: 20px;
  height: 30px;
  left: 10px;
  align-items: flex-end;
}
li{
  list-style-type: none;
  text-align: center;
  width:60px;
  height: 28px;
  border-radius: 15px;
  line-height: 28px;
  margin-right: 10px;
  
}
.toggle-bg{
  font-size: 20px;
  color: #FF9D9D;
  font-weight: bold;
}
.banner{
  position: fixed;
  width:322px;
  height:133px;
  border-radius:10px;
  top:60px;
  left:0;
  right: 0;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 4px 10px #e2e2e2;
}
.banner img{
  width: 100%;
}
.banner >>> .swiper-pagination-bullet-active{
  background:  #FF9D9D;
}

.scroll-wrap{
  position: relative;
  top:220px;
  height:100vh;
}
/* .wish{
  position: relative;
  top:230px;
} */

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
.wish-content{
  padding-left: 24px;
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
  background-color: rgb(255, 238, 143);
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
  background-color: rgb(255, 252, 164);
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
  padding-right: 24px;
}
.tag{
  font-size: 10px;
  color: #989898;
}
.take{
  color: #FF94B4;
}
.contact-way{
  background-color: #FFEBEB;
  color: #000;
  font-size: 10px;
  padding: 12px 24px 12px 24px;
  margin:10px 0 0 0;
  word-break: break-all;
  margin-bottom: 16px;
  border-radius: 0 0 0px 0px;
}
.separate{
  width: 375px;
  height: 1px;
  background-color:#F1F1F1;
  margin-bottom: 16px;
  margin-top:16px;
}
.loading-more{
  height: 180px;
  background-color:#aaaaaa;
  text-align: center;
}
</style>
