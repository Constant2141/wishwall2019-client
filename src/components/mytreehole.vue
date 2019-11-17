<template>
  <div class="mytreehole">
    <!-- <div class="title">我的树洞</div> -->
    <div class="left" @click="back"></div>
    <div class="holes-wrapper">
      <div v-for="(item,index) in holesData" :key="index" class="holes">
        <div class="delete" @click="deleteHole(index)"></div>
        <img :src="item.sex == 1?boyImgUrl:girlImgUrl" alt />
        <p>{{item.text}}</p>
        <div class="love-cover">
          <div class="love-cover-left">
            <div class="love"></div>
            <span>{{item.likes}}人觉得很赞</span>
          </div>
          <div class="love-cover-right" @click="toggle(index)"><p>{{item.comments.length}}</p></div>
        </div>
        <transition name="toggleComment">
          <div class="holes-comment" v-show="item.hide?true:false">
            <div class="comment-title">评论：</div>
            <div v-for="(item,index) in item.comments" :key="index" class="comment">
              <img :src="item.sex == 1?boyImgUrl:girlImgUrl" alt="性别头像" />
              <span>{{item.comment}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="nomore" v-if="this.holesData.length > 4?true:false">别再往下拉啦...</div>
    <div class="nomore" v-if="this.holesData.length == 0?true:false">快去发布你的树洞8...</div>
  </div>
</template>
<script>
export default {
  name: "mytreehole",
  data() {
    return {
      boyImgUrl: require("../assets/Avatar/BoyAvatar.png"),
      girlImgUrl: require("../assets/Avatar/GirlAvatar.png"),
      holesData: []
    };
  },
  methods: {
    back() {
      this.$router.push("/mine");
    },
    toggle(index) {
      let item = this.holesData[index];
      if (item.comments.length != 0){
        item.hide = !item.hide;
      }else{
        console.log('没有评论');
      }
    },
    deleteHole(index) {
      console.log("删除", index);
      this.$axios
        .post("/treehole/deleteTreeHole", {
          treeholeId: this.holesData[index].treeholeId
        })
        .then(res => {
          this.holesData.splice(index, 1);
          this.$toast.success('删除成功');
          console.log("删除成功");
        })
        .catch(err => {
          console.log("删除失败");
          this.$toast.fail('删除失败');
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$axios
        .get("/treehole/getMyTreeHoles")
        .then(({ data }) => {
          console.log("获取我的树洞成功", data.result);
          let holesData = data.result;
          holesData.map(item => item.hide = false);
          vm.holesData = holesData;
        })
        .catch(err => {
          console.log("获取我的树洞错误", err);
        });
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
  position: relative;
}
.delete {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/Remove.png") no-repeat center center;
  background-size: 100% 100%;
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
.holes > p {
  box-sizing: border-box;
  padding: 0 20px;
  width: 300px;
  text-align: left;
  font-size: 12px;
  font-family: "微软雅黑";
  line-height: 24px;
  text-align: center;
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
  position: relative;
}
.love-cover-right > p{
  display: inline-block;
  position: absolute;
  right:-2px;
  top:-2px;
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
  background-color: rgb(246, 245, 245);
}
/* 每一条评论 */
.comment {
  margin-bottom: 12px;
}
.comment img {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  border-radius: 50%;
}
.comment span {
  margin-top: 8px;
  font-size: 10px;
}
.comment {
  display: flex;
  align-items: flex-start;
}
</style>