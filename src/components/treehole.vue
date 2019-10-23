<template>
  <div class="tree-hole" ref="treeHole">
    <!-- <div class="title">树洞</div> -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in cards" :key="index">
        <div class="holes">
          <img :src="item.sex == 1?boyImgUrl:girlImgUrl" alt="">
          <p>{{item.text}}</p>
          <div class="love-cover">
            <div class="love-cover-left">
              <div
                :class="['love',{'active-love':item.isLike}]"
                @click="changeLove()"
              ></div>
              <span>{{item.likes}}人觉得很赞</span>
            </div>
            <div class="next" @click="next">next</div>
          </div>
        </div>
        <div class="comment-title" v-if="item.comments.length > 0">评论：</div>
        <div class="holes-comment">
          <div v-for="(item,index) in cards[index].comments" :key="index" class="commentList">
            <div><img :src="item.sex == 1?boyImgUrl:girlImgUrl" alt=""></div>
            <span>{{item.comment}}</span>
          </div>
        </div>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination">123</div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
    <!-- 底下的输入款 -->
    <div class="comment">
      <input type="text" v-model="postWord" placeholder="您想对怹说些什么吗..." @blur="scoll" />
      <div @click="post">发表</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "treehole",
  data() {
    const self = this;
    return {
      currentPage:1,
      lastSlide:false,
      realIndex:0,//对后台返回的那一条进行评论
      postWord:"",//要评论的话
      boyImgUrl:require('../assets/Avatar/BoyAvatar.png'),
      girlImgUrl:require('../assets/Avatar/GirlAvatar.png'),
      cards: [
        // {
        //   text:
        //     "我是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天夏天悄悄过去留下小秘密，摆心底摆心底，不愿告诉你~",
        //   likes: 110,
        //   isLike:false,
        //   isBoy:false,
        //   comments: [{isBoy:false,text:'12是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天3'}, {isBoy:true,text:'我告诉你。我告诉你。夏天夏天我告诉你。夏天夏天我告诉你。夏天夏天夏天夏天'}, {isBoy:false,text:'123'},{isBoy:false,text:'12是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天3'}, {isBoy:true,text:'我告诉你。我告诉你。夏天夏天我告诉你。夏天夏天我告诉你。夏天夏天夏天夏天'}, {isBoy:false,text:'123'}]
        // }
      ],
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // navigation: {
        //   nextEl: ".swiper-button-next"
        // },
        onSlideChangeEnd:(swiper)=>{
          console.log('swiper',swiper);
          self.realIndex = swiper.activeIndex;//当前的活跃页索引
          console.log('当前是第'+ swiper.activeIndex + '页');
          // console.log(self.swiperOption);
          
          // 删除？
          // self.swiperOption.removeSlide(0);

          // 如果是最后，就把最后一张拿过来？还是倒数两张？然后拼起来？
          self.lastSlide = swiper.isEnd;
          console.log(self.lastSlide);
        },
      }
    };
  },
  methods: {
    scoll() {
      window.scrollTo(0, 0);
    },
    post() {
      let data = {
        comment:this.postWord,
        treeholeId:this.cards[this.realIndex].treeholeId,
        text:this.cards[this.realIndex].text
      };
      this.$axios.post('/treehole/addTreeHoleComment',data)
      .then(res=>{
        console.log('评论树洞成功',res);
        let user = JSON.parse(localStorage.getItem('userInfo'));
        this.cards[this.realIndex].comments = [...this.cards[this.realIndex].comments,{sex:user.sex,comment:this.postWord}]
        this.postWord = '';
      })
      .catch(err=>{
        console.log('评论树洞失败',err);
      })
      // 跳到最底部
      // this.$nextTick(() => {
      //   var container = this.$el.querySelector("#new_message");
      //   container.scrollTop = container.scrollHeight;
      // });
    },
    changeLove() {
      if(this.cards[this.realIndex].isLike == true)return;
      this.$axios.post('/treehole/addLikes',{
        treeholeId:this.cards[this.realIndex].treeholeId,
      }).then(res=>{
        let obj = this.cards[this.realIndex];
        obj.isLike = !obj.isLike;
        this.$set(this.cards,this.realIndex,obj);
        this.cards[this.realIndex].likes++;
        console.log('点赞成功',res.data.result);
      }).catch(err=>{
        console.log('点赞失败',err);
      })
    },
    next(){
      alert('next')
    }
  },
  mounted() {
    console.log('treehole mounted')
    this.$axios.get(`/treehole/getAllTreeHoles?countPerPage=2&currentPage=${this.currentPage}`).then(res=>{
      console.log('获得所有树洞成功',res.data.result);
      this.currentPage = this.currentPage + 1;
      this.cards = res.data.result;
    }).catch(err=>{
      console.log('获得所有树洞错误',err);
    })
  },
  watch:{
    lastSlide(value){
      if(value){
        console.log('是最后一张了');
        let cards = this.cards;
        // 要push多点数据，慢慢push
        this.$axios.get(`/treehole/getAllTreeHoles?countPerPage=2&currentPage=${this.currentPage}`).then(res=>{
          console.log('获得树洞成功',res.data.result);
         if(res.data.result.length > 0){
          this.currentPage = this.currentPage + 1;
          this.cards = [...cards,...res.data.result];
         }
        }).catch(err=>{
          console.log('获得树洞错误',err);
        })
        this.cards = cards;
      }
    }
  }
};
</script>

<style scoped>
.tree-hole {
  touch-action: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom right, #fd9bbf, #fde8b7);
  /* overflow: scroll; */
}
/* .title {
  background-color: #e7e7e7;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 23px;
} */
.comment {
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  bottom: 18vw;
  display: flex;
  justify-content: flex-start;
  width: 375px;
  height: 25.72px;
  padding: 7.3px 13px 7.3px 22px;
  font-size: 12px;
}
.comment > input {
  outline: none;
  border: none;
  width: 260px;
  box-sizing: border-box;
  padding: 3.7px 10px;
}
.comment > div {
  width: 66px;
  height: 25.27px;
  background: linear-gradient(to bottom right, #fd9bbf, #fde8b7);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 14px;
  border-radius: 15px;
}
/* 每个洞 */
.holes {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
  /* overflow: scroll; */
}
.holes > img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin: 20px 0;
  text-align: center;
}
.holes p {
  width: 216px;
  text-align: left;
  font-size: 12px;
  font-family: "微软雅黑";
  line-height: 24px;
}

/* 点赞 */
.love-cover {
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 216px;
  margin: 15px 0;
}
.love-cover-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.love {
  margin-right: 8px;
  width: 22px;
  display: inline-block;
  height: 22px;
  background: url("../assets/hole/BeforeLike.png") no-repeat center center;
  background-size: contain;
}
.active-love {
  background-image: url("../assets/hole/AfterLike.png");
}
.next{
  background: linear-gradient(to bottom right, #fd9bbf, #fde8b7);
  padding: 2px 12px;
  border-radius: 10px;
}

/* 多人评论 */
.comment-title{
  margin-left:26px;
  line-height: 48px;
  font-size: 14px;
}
.holes-comment{
  font-size: 10px;
  margin:0 26px;
  /* background-color:yellow; */
  height:225px;
  overflow: scroll;
}


/* 每一条评论 */
.commentList{
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
}
.commentList img{
  margin-right:10px;
  width:30px !important;
  height:30px !important; 
  /* margin-right: 20px; */
  border-radius: 50%;
}
.commentList span{
  display: block;
  /* float: right; */
  margin-top:8px;
  font-size: 10px;
}

</style>
<style>
.swiper-slide {
  z-index: 1;
  touch-action: none;
  width: 285px;
  /* height: 430px; */
  /* overflow: scroll; */
}
.swiper-button-next {
  z-index: 1000;
}
.swiper-pagination {
  z-index: 100 !important;
}
</style>
