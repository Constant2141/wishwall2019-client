<template>
  <div id="mine">
    <div class="myInfo">
      <div
        class="Profile-Photo"
        :style="{backgroundSize:`cover`,backgroundImage:`url(${photoUrl})`}"
      ></div>
      <div class="myName">{{name}}</div>
      <div :class="{'icons':!isGirl,'girlIcon':isGirl}"></div>
    </div>
    <div class="myWish">
      <div class="wishNum" @click="toMyPost">
        <div class="img1"></div>
        <p class="text">我的心愿</p>
        <p class="nums">{{num1}}条</p>
      </div>
      <div class="wishNum" @click="toMyTreeHole">
        <div class="img2"></div>
        <p class="text">我的树洞</p>
        <p class="nums">{{num2}}条</p>
      </div>
      <div class="wishNum" @click="toMyPlant">
        <div class="img3"></div>
        <p class="text">我的星球</p>
        <p class="nums">{{num3}}条</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      sex: "",
      num1: 0,
      num2: 0,
      num3: 0,
      photoUrl: "",
      isGirl: true
    };
  },
  methods: {
    toMyPost() {
      this.$router.replace(`/mypost`);
      //本来做了条数限制不请求的
      //可是万一条数不变，可是其他数据变了也不刷新这样也不对的
    },
    toMyTreeHole() {
      //根据条数看看是不是需要更新
      this.$router.replace(`/mytreehole`);
    },
    toMyPlant() {
      this.$router.replace(`/mytopic`);
    }
  },
  mounted() {
    console.log("mine mounted");
    let userInfos = JSON.parse(localStorage.getItem("userInfo"));
    this.name = userInfos.nickname;
    this.photoUrl = userInfos.headimgurl;
    if (this.$store.state.sex == 1) {
      this.isGirl = false;
    } else if (this.$store.state.sex == 2) {
      this.isGirl = true;
    }
    this.$axios.get("/treehole/countMyTreeHoles").then(res => {
      this.num2 = res.data.result;
    });
    this.$axios.get("/wish/iCreated").then(res => {
      this.num1 = res.data.result.length;
    });
    this.$axios.get("/star/myCreated").then(res => {
      this.num3 = res.data.result.length;
    });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#mine {
  height: 100vh;
  background: url("../assets/banner/mine.png");
  background-size: cover;
}
.myInfo {
  width: 375px;
  height: 190px;
  background: #ffc4c4;
  border-bottom-left-radius: 100% 55%;
  padding-top: 0.1px;
  display: flex;
}
.Profile-Photo {
  width: 80px;
  height: 80px;
  border: solid 3px #ffffff;
  background-color: #fff8c9;
  margin-top: 75px;
  margin-left: 29px;
  border-radius: 50%;
}
.myName {
  height: 25px;
  margin-top: 105px;
  margin-left: 23px;
  font-family: Segoe UI;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #ffffff;
}
.icons {
  width: 24px;
  height: 24px;
  background: url("../assets/boy.png");
  background-size: 100% 100%;
  margin-top: 102.5px;
  margin-left: 7px;
}
.girlIcon {
  width: 24px;
  height: 24px;
  background: url("../assets/girl.png");
  background-size: 100% 100%;
  margin-top: 102.5px;
  margin-left: 7px;
}
.school {
  height: 25px;
  margin-top: 13px;
  margin-left: 23px;
  font-family: Segoe UI;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 19px;
  letter-spacing: 0px;
  color: #ffffff;
}
.myWish {
  height: 428px;
  width: 375px;
}
.wishNum {
  padding-top: 0.1px;
  width: 318px;
  height: 52px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  margin-top: 18px;
  margin-left: 29px;
  display: flex;
}
.wishNum:nth-child(1) {
  margin-top: 33px;
}
.wishNum p {
  font-family: Segoe UI;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 17px;
  letter-spacing: 0px;
  color: #707070;
}
.text {
  width: 100px;
  margin-top: 17px;
  margin-left: 8px;
}
.nums {
  margin-top: 17px;
  margin-left: 120px;
}
.img1 {
  width: 30px;
  height: 20px;
  margin-top: 16px;
  background: url("../assets/nav/9.png");
  background-size: 100% 100%;
  margin-left: 20px;
}
.img2 {
  width: 30px;
  height: 20px;
  margin-top: 16px;
  background: url("../assets/nav/4.png");
  background-size: 100% 100%;
  margin-left: 20px;
}
.img3 {
  width: 30px;
  height: 20px;
  margin-top: 16px;
  background: url("../assets/nav/6.png");
  background-size: 100% 100%;
  margin-left: 20px;
}
</style>
