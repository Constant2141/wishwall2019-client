<template>
  <div class="tree-hole" ref="treeHole">
    <div class="title">树洞</div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in cards" :key="index">
        <div class="holes">
          <img src="../assets/Avatar/GirlAvatar.png" alt />
          <p>{{item.words}}</p>
          <div class="love-cover">
            <div class="love-cover-left">
              <div
                :class="['love',{'active-love':item.isLike}]"
                @click="changeLove(index)"
              ></div>
              <span>{{item.likeCount}}人觉得很赞</span>
            </div>
            <div class="next" @click="next">next</div>
          </div>
        </div>
        <div class="comment-title">评论：</div>
        <div class="holes-comment">
          <div v-for="(item,index) in cards[index].comments" :key="index" class="commentList">
            <div><img :src="item.isBoy?boyImgUrl:girlImgUrl" alt=""></div>
            <span>{{item.text}}</span>
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
      realIndex:0,//对后台返回的那一条进行评论
      postWord:"",//要评论的话
      msg: "Welcome to Your Vue.js App",
      boyImgUrl:require('../assets/Avatar/BoyAvatar.png'),
      girlImgUrl:require('../assets/Avatar/GirlAvatar.png'),
      cards: [
        {
          words:
            "我是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天夏天悄悄过去留下小秘密，摆心底摆心底，不愿告诉你~",
          likeCount: 110,
          isLike:false,
          isBoy:false,
          comments: [{isBoy:false,text:'12是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天3'}, {isBoy:true,text:'我告诉你。我告诉你。夏天夏天我告诉你。夏天夏天我告诉你。夏天夏天夏天夏天'}, {isBoy:false,text:'123'},{isBoy:false,text:'12是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天3'}, {isBoy:true,text:'我告诉你。我告诉你。夏天夏天我告诉你。夏天夏天我告诉你。夏天夏天夏天夏天'}, {isBoy:false,text:'123'}]
        },
        {
          words:
            "我是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天夏天悄悄过去留下小秘密，摆心底摆心底，不愿告诉你~",
          likeCount: 123,
          isLike:false,
          comments: [{isBoy:true,text:'1是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天23'}, {isBoy:true,text:'我告诉你。我告诉你。夏天夏天我告诉你。夏天夏天我告诉你。夏天夏天夏天夏天'}, {isBoy:false,text:'123'}]
        },
        {
          words:
            "我是一条小青龙小青龙，我有一个小秘密小秘密。我就不告诉你就不告诉你。夏天夏天悄悄过去留下小秘密，摆心底摆心底，不愿告诉你~",
          likeCount: 120,
          isLike:false,
          comments: ["123", "321", "322"]
        }
      ],
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next"
        },
        onSlideChangeEnd:(swiper)=>{
          self.realIndex = swiper.activeIndex;//当前的活跃页索引
          // this.removeSide(self.realIndex - 1);
        },
      }
    };
  },
  methods: {
    scoll() {
      window.scrollTo(0, 0);
    },
    post() {
      console.log('对'+ this.realIndex+'评论:'+this.postWord);
      this.postWord = '';
      // 跳到最底部
      // this.$nextTick(() => {
      //   var container = this.$el.querySelector("#new_message");
      //   container.scrollTop = container.scrollHeight;
      // });
    },
    a() {
      alert("123");
    },
    changeLove(index) {
      //要补后台
      if (!this.cards[index].isLike) {
        //点赞了
        this.cards[index].likeCount++;
        this.cards[index].isLike = true;
      } else {
        //取消了
        this.cards[index].likeCount--;
        this.cards[index].isLike = false;
      }
    },
    next(){
      alert('next')
    }
  },
  mounted() {
    // var mySwiper = new Swiper('.swiper-container',{
    // onSlideChangeEnd: function(swiper){
    //     alert('事件触发了;');
    //   }
    // })
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
.title {
  background-color: #e7e7e7;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 23px;
}
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
  height:180px;
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
  background-color: red;
}
</style>
