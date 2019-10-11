<template>
  <div class="mytreehole">
    <!-- <div class="title">我的树洞</div> -->
    <div class="left" @click="back"></div>
    <div class="holes-wrapper">
      <div v-for="(item,index) in holesData" :key="index" class="holes">
        <img :src="item.sex == 1?boyImgUrl:girlImgUrl" alt />
        <p>{{item.text}}</p>
        <div class="love-cover">
          <div class="love-cover-left">
            <div class="love"></div>
            <span>{{item.likes}}人觉得很赞</span>
          </div>
          <div class="love-cover-right" @click="toggle(index)"></div>
        </div>
        <transition name="toggleComment">
          <div class="holes-comment" v-show="item.hide?true:false">
            <div class="comment-title">评论：</div>
            <div v-for="(item,index) in item.comments" :key="index" class="comment">
              <img :src="item.sex == 1?boyImgUrl:girlImgUrl" alt="性别头像">
              <span>{{item.comment}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="nomore" v-if="this.holesData.length > 4?true:false">再脱就没了...</div>
  </div>
</template>
<script>
export default {
  name: "mytreehole",
  data() {
    return {
      boyImgUrl: require("../assets/Avatar/BoyAvatar.png"),
      girlImgUrl: require("../assets/Avatar/GirlAvatar.png"),
      holesData:[],
    };
  },
  methods: {
    back() {
      this.$router.replace("/mine")
    },
    toggle(index) {
      if(this.holesData[index].comments.length == 0)return ;
      let obj = this.holesData[index];
      obj.hide = !obj.hide;
      this.$set(this.holesData, index, obj);
    }
  },
  beforeRouteEnter(to,from,next){
    let count = to.query.count
    next(vm=>{
      if(count == vm.holesData.length){
        console.log('不需要更新');
      }else{
        //更新        
        console.log('需要更新');
        vm.$axios.get('/treehole/getMyTreeHoles').then(res=>{
          console.log('获取我的树洞成功',res.data);
          vm.holesData = res.data;
        }).catch(err=>{
          console.log('获取我的树洞错误',err);
        })
      }
    });
  }
};
</script>
<style scoped>
.mytreehole {
  position: relative;
}
/* .title {
  z-index: 2;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background-color: #e7e7e7;
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 23px;
} */
.holes-wrapper {
  position: relative;
  /* padding-top: 45px; */
  /* padding-bottom: 9px; */
  background-color: rgb(248, 248, 248);
}
.left {
  z-index: 2;
  position: fixed;
  left: 10px;
  top: 20px;
  width: 19px;
  height: 19px;
  background: url("../assets/back.png") no-repeat center center;
  background-size: contain;
}

/* hole */
.holes {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 9px;
  /* overflow: scroll; */
}
.holes:last-child {
  margin-bottom: 0px;
}
.holes > img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin: 30px 0 20px;
  text-align: center;
}
.holes p {
  text-indent: 2em;
  width: 300px;
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
  width: 300px;
  margin: 15px 0;
}
.love-cover-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.love-cover-right {
  width: 22px;
  height: 22px;
  background: url("../assets/hole/comment.png") no-repeat center center;
  background-size: contain;
}
.love {
  margin-right: 8px;
  width: 22px;
  display: inline-block;
  height: 22px;
  background: url("../assets/hole/AfterLike.png") no-repeat center center;
  background-size: contain;
}
/* 每个洞的评论 */
.comment-title {
  line-height: 50px;
  font-size: 16px;
}
.holes-comment {
  overflow: hidden;
  width: 300px;
  padding: 0 37.5px;
  font-size: 10px;
  background-color: rgb(248, 248, 248);
}
/* 过渡 */
.toggleComment-leave-active,
.toggleComment-enter-active {
  transition: max-height 0.8s;
}
.toggleComment-enter,
.toggleComment-leave-to {
  max-height: 0;
}
.toggleComment-enter-to,
.toggleComment-leave {
  max-height: 600px;
}
/* 没有更多了啊 */
.nomore {
  line-height: 60px;
  text-align: center;
  background-color: #eee;
}
/* 每一条评论 */
.comment{
  margin-bottom: 12px;
}
.comment img{
  width:30px;
  height:30px;
  margin-right: 20px;
  border-radius: 50%;
}
.comment span{
  margin-top:8px;
  font-size: 10px;
}
.comment{
  display: flex;
  align-items: flex-start;
}
</style>