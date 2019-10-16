<template>
  <div id="my-topic">
    <div class="top-bar">
      <div class="left-arrow"></div>
      <div class="top-select" :class="{active:isActive1}">
        <p>与我有关</p>
      </div>
      <div class="top-select" :class="{active:isActive2}" @click="myPost">
        <p>我的发布</p>
      </div>
      <div class="top-select" :class="{active:isActive3}" @click="myComment">
        <p>我的评论</p>
      </div>
    </div>
    <div class="middle">
      <div class="total" v-for="(topic,index) in topics " :key="index">
        <div class="single-topic">
          <div class="top-topic">
            <p>#{{topic}}</p>
            <div>···</div>
          </div>
          <div class="top-content">
            <div class="icon"></div>
            <div class="content">
              <div class="name-time">
                <p>{{names[index]}}</p>
                <p>{{times[index]}}</p>
              </div>
              <div class="opinion">
                <p>{{opinions[index]}}</p>
              </div>
              <div class="like">
                <div class="like-icon"></div>
                <p>{{likes[index]}}</p>
                <div class="comment-icon"></div>
                <p>{{comments[index]}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive1: true,
      isActive2: false,
      isActive3: false,
      topics: [
        "海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料海底捞最喜欢什么火锅底料",
        "海底捞最喜欢什么火锅底料"
      ],
      names: ["chikuan", "chikuan"],
      times: ["7/22 17:30", "7/22 17:30"],
      opinions: [
        "喜欢清汤锅呢，你们呢喜欢清汤锅呢，你们呢喜欢清汤锅呢，你们呢喜欢清汤锅呢，你们呢喜欢清汤锅呢，你们呢",
        "喜欢清汤锅呢，你们呢"
      ],
      likes: [115, 115],
      comments: [115, 115]
    };
  },
  methods: {
    myPost() {
      this.$router.replace(`/mytopic`);
    },
    myComment() {
      this.$router.replace(`/mycomment`);
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*解决点击出现的黑块*/
}
#my-topic {
  height: 100vh;
  background: #fafafa;
}
.top-bar,
.top-topic,
.top-content,
.name-time,
.like {
  display: flex;
}
.top-bar {
  width: 375px;
  height: 44px;
  position: fixed;
  background: white;
}
.left-arrow {
  width: 19px;
  height: 19px;
  background: url("../assets/back.png");
  background-size: 100% 100%;
  margin-top: 15px;
  margin-left: 4px;
}
.top-select {
  height: 25px;
  width: 58px;
  margin-left: 49px;
  margin-top: 15px;
}
.active {
  border-bottom: 3px solid #ffc4c4;
  color: #ffc4c4;
}
.top-select:nth-child(2) {
  margin-left: 34px;
}
.top-select p {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 17px;
  letter-spacing: 0px;
}
.middle {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 20vw;
}
.single-topic {
  width: 100%;
  min-height: 132px;
  background-color: #ffffff;
  margin-bottom: 2px;
}
.content {
  margin-left: 11px;
}
.top-topic p {
  height: 25px;
  width: 316px;
  margin-left: 19px;
  margin-top: 13px;
  font-family: Segoe UI;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #707070;
  overflow: scroll;
}
.top-topic div {
  margin-left: 10px;
  margin-top: 9px;
}
.icon {
  height: 43px;
  width: 43px;
  border-radius: 50%;
  background: url("../assets/Avatar/BoyAvatar.png");
  background-size: 100% 100%;
  margin-left: 24px;
}
.name-time p:nth-child(2) {
  font-family: Segoe UI;
  font-size: 8px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 11px;
  letter-spacing: 0px;
  color: #707070;
  margin-left: 25px;
}
.name-time p {
  margin-top: 5px;
  font-family: Segoe UI;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #707070;
}
.opinion {
  height: 32px;
  width: 280px;
  overflow: scroll;
  font-family: Segoe UI;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #707070;
  margin-top: 10px;
}
.like {
  margin-top: 3px;
}
.like p {
  font-family: Segoe UI;
  font-size: 8px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 11px;
  letter-spacing: 0px;
  color: #707070;
  margin-top: 2px;
  margin-left: 3px;
}
.like-icon {
  height: 15px;
  width: 15px;
  background: url("../assets/BeforeLike.png");
  background-size: 100% 100%;
}
.comment-icon {
  height: 15px;
  width: 15px;
  background: url("../assets/comment.png");
  background-size: 100% 100%;
  margin-left: 16px;
}
</style>