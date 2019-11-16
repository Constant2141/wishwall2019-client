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
                      @click="wishes[index].gainOrNot == false? takeWish(index): null"
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
            <div class="loading-more">
              <p v-show='loadState==0'>下拉加载更多</p>
              <p v-show='loadState==1'>正在加载...</p>
              <p v-show='loadState==2'>我是有底线的</p>
              <p v-show='loadState==3' >加载失败，请刷新重试</p>
            </div>
        </van-pull-refresh>
      </div>
      <div class="cover" v-show="readTips">
        <div class="tips">
          <h3>玩法介绍</h3>
          <h5>
            <img src="@/assets/nav/2.png" alt="">  
            许愿墙
          </h5>
          <p>一个女生许愿，男生实现的线上平台。</p>
          <p>※女生可以自定义许愿的内容，选择是否留下联系方式，联系方式仅会展示给领取愿望的人，不会出现在首页。</p>
          <p>※愿望可以被多人领取，一旦被领取，将在十二个小时后从首页消失，所以请谨慎领取，不要辜负每一个心愿~</p>
          <p>※女生可以在“我的心愿”界面查看心愿的领取详情，心愿被完成之后请及时点击“确认完成”，提醒其他领取你心愿的小伙伴哟</p>
          <p>同理，男生可以在“我的心愿”界面查看你领取心愿的完成情况噢~</p>
          <p>※11月23日男女反转，男生许愿，女生实现，男孩子们也应该拥有节日~</p>
          <h5>
            <img src="@/assets/nav/4.png" alt="">
            树洞
          </h5>
          <p>一个以匿名身份互相吐露心声的真心话空间。</p>
          <p>※每一条树洞都是随机出现的，你将不能在“我的”界面中看到你评论/点赞过的树洞，请感恩每一次相遇~</p>
          <h5>
            <img src="@/assets/nav/6.png" alt="">  
            星球
          </h5>
          <p>一个校内学生畅谈混脸熟的日常社区。</p>
          <p>※带上你想讨论的话题，在星球社区和身边的同学互相交流。</p>
          <p>※浏览周围人对日常生活的吐槽，用点赞评论表达你的态度。</p>
        </div>
        <div @click="closeTip()">
          <img src="@/assets/closetips.png" alt=""> 
        </div>
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
        // pagination:'.swiper-pagination'
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
      isDownLoading:false,
      isBottom:false, //是否是页面最底端
      loadState: 0,//定义0是不加载(浏览)状态，1为正在加载，2全部数据加载完,3加载失败
      finished: false, //全部数据是否加载完
      readTips:false,
    }
  },
  methods:{
    onRefresh(){
      this.page = 1;
      setTimeout(async()=>{
        this.wishes = await this.getData()
        this.isDownLoading = false; 
      },500)
    },
    //判断滚动条是否在底部
    checkBottom(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;// 获取滚动条的高度
      const winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
      const scrollHeight = (()=>{
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
      // console.log(scrollTop)
      // console.log(parseInt(scrollHeight)-winHeight)
      this.isBottom = scrollTop >=parseInt(scrollHeight)-winHeight-1;
    },
    
    async onLoadList(){
      //滚动条是否到达底部
      this.checkBottom();
      if(this.isBottom && !this.finished){
      this.loadState = 1;
      let tempList = this.wishes;
      this.page++;
      let temp = await this.getData();
      this.wishes =  [...tempList,...temp];
      
      }
      if(this.wishes.length == this.wishTotal){
        this.finished = true;
        this.loadState = 2;
      } 
    },
    async getData(){
      let campus = this.curCampus;
      //在需要返回的值前加await
      let result  = await this.$axios.get('/wish/list',{
        params:{
          curPage:this.page,
          wish_where:campus=='全部'?'':`${campus}校区`
        }
      })
      .then(async res=>{
        if(res.status == 200){
          let temp = await res.data.result.wishList.rows;
          this.handleAnonymous(temp);
          this.handleTime(temp);
          // this.wishes = temp;
          this.wishTotal = res.data.result.wishList.count;
          return temp;
        }
      })
      .catch(err =>console.log(err))
      return result;
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
    async changeCampus(index){
      this.isActive = index;
      this.curCampus = event.currentTarget.innerHTML;
      this.page = 1;
      window.scrollTo(0,0);
      this.wishes = await this.getData();
      
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
      arr.map(item=>{
        let gapDay;
        let nowDay = new Date().getDate();
        let createDay = item.createdAt.slice(8,10);
        let time = item.createdAt.slice(11,16);
        if(createDay!=nowDay){
          if(createDay > nowDay){
            gapDay = createDay - nowDay;
          }
          if(createDay < nowDay){
            gapDay = nowDay - createDay;
          }
          item.createdAt = `${gapDay}天前`
        }else{
        item.createdAt = time;
        }
    })
    return arr;
    },
    checkTips(){
      //解决滚动穿透，反正就是红莲nb
      this.readTips = true;
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText +='position:fixed;width:100%;top:-'+scrollTop+'px;'
    },
    closeTip(){
      this.readTips = false;
      const body = document.body;
      body.style.position = '';
      const top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
      body.style.top='';
    }
  },
  async mounted(){
    this.wishes = await this.getData();
    // (function(arr){
    //   let wishMany = arr.map(item=>item.wish_many);
    //   console.log(wishMany);
    // })(this.wishes)
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
.tip-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
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
  /* position: absolute;
  top:50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%); */
}
/* .banner >>> .swiper-pagination-bullet-active{
  background:  #FF9D9D;
} */

.scroll-wrap{
  position: relative;
  top:220px;
  height:100vh;
}
.take-button{
  font-size: 10px;
  width: 52px;
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
  background-color:#fff; 
}
.wish-tag {
  justify-content: space-between;
  align-items: flex-end;
  width: 238px;
}
/* .wish-tag span{
  display: inline-block;
  vertical-align: bottom;
} */
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
  border: 3.6px solid #FEBCC2;
  border-radius: 50px;
  left: -12px;
  overflow: hidden;
}
.avatar-wrapper img{
  position: absolute;
  left: 50%;
  top:50%;
  border-radius: 50px;
  transform: translateX(-50%) translateY(-50%);
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
  height: 160px;
  color: #989898;
  font-size: 14px;
  background-color:#fff;
  text-align: center;
}
.cover{
  background-color:rgba(0, 0,0,0.7);
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  z-index:30;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h3{
  text-align: center;
  font-size:18px;
}
.tips{
  position: relative;
  /* top:7vh; */
  border-radius: 20px;
  height: 100vw;
  width: 70vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 3vw 5vw 3vw 5vw;
  bottom: 10vw;
  overflow-y: scroll;
}
.tips img{
  width: 20px !important;
}
.tips p{
  font-size: 12px;
}
.tips h5{
  margin-top: 2vw;
}
.cover img{
  width: 35px;
}
</style>
