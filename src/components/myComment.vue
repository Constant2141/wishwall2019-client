<template>
  <div id="my-topic">
    <div class="top-bar">
      <div class="left-arrow" @click="backTo"></div>
      <div class="top-select" :class="{active:isActive1}" @click="ofMine">
        <p>与我有关</p>
      </div>
      <div class="top-select" :class="{active:isActive2}" @click="myPost">
        <p>我的发布</p>
      </div>
      <div class="top-select" :class="{active:isActive3}">
        <p>我的评论</p>
      </div>
    </div>
    <div class="middle">
      <div class="total" v-for="(title,index) in titles " :key="index">
        <div class="single-topic">
          <div class="top-topic">
            <p>#{{topics[index]}}</p>
            <div>···</div>
          </div>
          <div class="top-content">
            <div
              class="icon"
              :style="{backgroundSize:`cover`,backgroundImage:`url(${photoUrl[index]})`}"
            ></div>
            <div class="content">
              <div class="name-time">
                <p>{{names[index]}}</p>
                <div class="icons" :class="{girlIcon:isGirl}"></div>
                <p>{{times[index]}}</p>
              </div>
              <div class="opinion">
                <p>{{opinions[index]}}</p>
              </div>
              <div class="like">
                <div class="like-icon"></div>
                <p>{{likes[index]}}</p>
              </div>
            </div>
            <div class="whichComment">
              <div class="name-sex">
                <p>@{{toName[index]}}</p>
                <div class="icons" :class="{girlIcon:isGirl2}" :style="{marginTop:`9px`}"></div>
              </div>
              <p class="toContent">{{toCom[index]}}</p>
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
      isActive1: false,
      isActive2: false,
      isActive3: true,
      isGirl: false,
      isGirl2:false,
      toName: [],
      topics: [],
      titles: [],
      names: [],
      times: [],
      opinions: [],
      likes: [],
      photoUrl: [],
      sex: [],
      toCom: [],
      toSex:[],
    };
  },
  methods: {
    ofMine() {
      this.$router.replace(`/ofmine`);
    },
    myPost() {
      this.$router.replace(`/mytopic`);
    },
    backTo() {
      this.$router.replace("/mine");
    },
    getData() {
      let url = `/star/myComment`;
      this.$axios
        .get(url)
        .then(res => {
          console.log(res);
          this.titles = res.data.result;
          this.titles.forEach((value, index) => {
            this.times[index] = value.createdAt;
            this.photoUrl[index] = value.headimgurl;
            this.names[index] = value.nickname;
            this.topics[index] = value.fc.fs.title;
            this.opinions[index] = value.comment;
            this.sex[index] = value.sex;
            if (this.sex[index] == "1") {
              this.isGirl = false;
            } else {
              this.isGirl = true;
            }
            this.toSex[index] = value.fc.sex;
            if (this.toSex[index] == "1") {
              this.isGirl2 = false;
            } else {
              this.isGirl2 = true;
            }
            this.toName[index] = value.fc.nickname;
            this.toCom[index] = value.fc.comment;
            this.likes[index] = value.fc.likes;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
    });
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
.name-sex,
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
.name-sex p {
  width: 29px;
  height: 14px;
  font-family: Segoe UI;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #707070;
  margin-left: 10px;
  margin-top: 9px;
}
.toContent {
  width: 70px;
  height: 28px;
  font-family: Segoe UI;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #707070;
  overflow: scroll;
  margin-left: 10px;
  margin-top: 8px;
}
.icons {
  height: 14px;
  width: 14px;
  background: url("../assets/boy.png");
  background-size: 100% 100%;
  margin-top: 3.5px;
  margin-right: 13px;
}
.girlIcon {
  height: 14px;
  width: 14px;
  background: url("../assets/girl.png");
  background-size: 100% 100%;
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
  width: 170px;
  overflow: scroll;
  font-family: Segoe UI;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #707070;
  margin-top: 10px;
  margin-right: 15px;
}
.whichComment {
  width: 90px;
  height: 71px;
  background-color: #f2f2f2;
  margin-top: 10px;
  overflow: scroll;
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