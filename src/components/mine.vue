<template>
  <div id="mine">
    <div class="myInfo">
      <div class="Profile-Photo"></div>
      <div class="infos">
        <div class="myName">{{name}}&nbsp;&nbsp;&nbsp;{{sex}}</div>
        <div class="school">{{school}}</div>
      </div>
    </div>
    <div class="myWish">
      <div class="wishNum" @click="toMyPost">
        <div class="img1"></div>
        <p class="text">我发布的心愿</p>
        <p class="nums">{{num1}}条</p>
      </div>
      <div class="wishNum" @click="toMyTreeHole">
        <div class="img2"></div>
        <p class="text">我的树洞</p>
        <p class="nums">{{num2}}条</p>
      </div>
      <div class="wishNum">
        <div class="img3"></div>
        <p class="text">我的星球</p>
        <p class="nums">{{num3}}条</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name:"chikuan",
      sex:"男",
      school:"大学城",
      num1:2,
      num2:0,
      num3:2
    }
  },
  methods:{
    toMyPost(){
      this.$router.replace("/mypost")
    },
    toMyTreeHole(){
      //根据条数看看是不是需要更新
      this.$router.replace(`/mytreehole?count=${this.num2}`)
    }
  },
  mounted(){
    console.log('mine mounted');
    this.$axios.get('/treehole/countMyTreeHoles').then(res=>{
      this.num2 = res.data;
    })
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#mine{
  height: 100vh;
  background: url("../assets/banner/mine.png");
  background-size: cover;
}
.myInfo {
  width: 375px;
  height: 190px;
  background-image: linear-gradient(317deg, #fff8c9 0%, #fd9cbf 100%);
  border-bottom-left-radius: 100% 55%;
  padding-top: 0.1px;
  display: flex;
}
.Profile-Photo {
  width: 80px;
  height: 80px;
  border: solid 3px #ffffff;
  margin-top: 75px;
  margin-left: 29px;
  border-radius: 50%;
  background: url("../assets/Avatar/BoyAvatar.png");
  background-size: cover;
}
.myName {
  height: 25px;
  margin-top: 85px;
  margin-left: 23px;
  font-family: Segoe UI;
	font-size: 18px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 22px;
	letter-spacing: 0px;
	color: #ffffff;
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
.myWish{
  height: 428px;
  width: 375px;
}
.wishNum{
  padding-top: 0.1px;
	width: 318px;
	height: 52px;
	background-color: #ffffff;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
	border-radius: 5px;
  margin-top: 18px;
  margin-left: 29px;
  display: flex;
}
.wishNum:nth-child(1){
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
.text{
  width: 100px;
  margin-top: 17px;
  margin-left: 8px;
}
.nums{
  margin-top: 17px;
  margin-left: 120px;
}
.img1{
	width: 30px;
	height: 20px;
  margin-top: 16px;
  background: url("../assets/nav/9.png");
  background-size: 100% 100%;
  margin-left: 20px;
}
.img2{
	width: 30px;
	height: 20px;
  margin-top: 16px;
  background: url("../assets/nav/4.png");
  background-size: 100% 100%;
  margin-left: 20px;
}
.img3{
	width: 30px;
	height: 20px;
  margin-top: 16px;
  background: url("../assets/nav/6.png");
  background-size: 100% 100%;
  margin-left: 20px;
}
</style>
