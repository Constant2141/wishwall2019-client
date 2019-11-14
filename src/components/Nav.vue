<template>
  <div class="nav" @click="changeNav($event)">
    <!-- 弹出层（编程导航） -->
    <div class="three">
      <div :class="['three-route',{'three-active':activeBool}]" @click="postNav(0)" v-show="isGirl">
        <div class="three-item"></div>
        <span>心愿</span>
      </div>
      <div :class="['three-route',{'three-active':activeBool}]" @click="postNav(1)">
        <div class="three-item"></div>
        <span>树洞</span>
      </div>
      <div :class="['three-route',{'three-active':activeBool}]" @click="postNav(2)">
        <div class="three-item"></div>
        <span>星球</span>
      </div>
    </div>
    <!-- （声明导航） -->
    <router-link id="wishwall" class="nav-list" :to="{path:'/wishwall'}">
      <div class="router-img1 router-img" :class="{'active':(activeNavIndex == 1)}"></div>
      <span>许愿墙</span>
    </router-link>
    <router-link id="treehole" class="nav-list" :to="{path:'/treehole'}">
      <div class="router-img2 router-img" :class="{'active':activeNavIndex == 2}"></div>
      <span>树洞</span>
    </router-link>

    <div class="nav-list">
      <div id="main-box"></div>
    </div>

    <router-link id="starball" class="nav-list" :to="{path:'/planet'}">
      <div class="router-img3 router-img" :class="{'active':activeNavIndex == 4}"></div>
      <span>星球</span>
    </router-link>
    <router-link id="mine" class="nav-list" :to="{path:'/mine'}">
      <div class="router-img4 router-img" :class="{'active':activeNavIndex == 5}"></div>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "navi",
  props: ["toggleBool"],
  data() {
    return {
      activeNavIndex:1,
      activeBool: false,
      // 三个发布路由
      routerLink: ["/wishRelease", "/treeholeRelease", "/planetRelease"]
    };
  },
  methods: {
    //事件委托
    changeNav(e) {
      var target = e.target;
      if (target.nodeName.toLocaleLowerCase() == "a") {
        this.activeBool = false;
        this.$emit("removeCover");
        switch (target.id) {
          case "wishwall":
            this.activeNavIndex = 1;
            break;
          case "treehole":
            this.activeNavIndex = 2;
            break;
          case "starball":
            this.activeNavIndex = 4;
            break;
          case "mine":
            this.activeNavIndex = 5;
            break;
        }
      } else if (
        target.nodeName.toLocaleLowerCase() == "div" &&
        target.id == "main-box"
      ) {
        //点中间区域
        // 禁用触摸滚动页面
        if (this.toggleBool) {
          this.activeBool = true;
          this.$emit("cover");
        } else {
          // 恢复触摸滚动页面
          this.activeBool = false;
          this.$emit("removeCover");
        }
      } else if (
        target &&
        (target.nodeName.toLocaleLowerCase() == "div" ||
          target.nodeName.toLocaleLowerCase() == "span")
      ) {
        this.changeNav({ target: target.parentNode });
      }
    },
    postNav(index) {
      //根据index跳不同的组件（编程导航）
      this.$router.push(this.routerLink[index]);
      this.activeBool = false;
      this.$emit("removeCover");
    }
  },
  computed:{
    isGirl(){
      if(this.$store.state.sex){
        return this.$store.state.sex == 2;
      }else{
        return true
      }
    }
  }
};
</script>
<style scoped>
/* 弹出层 */
.three {
  color:white;
  position: absolute;
  width: 100vw;
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.three-route {
  top: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 6vw;
  flex-direction: column;
}
/* 动画 */
.three-route:nth-of-type(1) {
  transition: all 0.08s ease 0s;
}
.three-route:nth-of-type(2) {
  transition: all 0.16s ease 0.06s;
}
.three-route:nth-of-type(3) {
  transition: all 0.24s ease 0.12s;
}

/* 活跃 */
.three-active {
  top: -25vw;
}
.three-item {
  width: 13vw;
  height: 13vw;
  border-radius: 50%;
  /* background: linear-gradient(to bottom right, #fd9bbf, #fde8b7); */
  background-size:100% 100%;
  margin-bottom: 1vw;
}
.three-route:nth-of-type(1) .three-item{
  background:url('~@/assets/hole/postChat.png') no-repeat center center;
  background-size: 100% 100%;
}
.three-route:nth-of-type(2) .three-item{
  background:url('~@/assets/hole/postHole.png') no-repeat center center;
  background-size: 100% 100%;
}
.three-route:nth-of-type(3) .three-item{
  background:url('~@/assets/hole/postWish.png') no-repeat center center;
  background-size: 100% 100%;
}

/* 导航条 */
.nav {
  font-size: 14px;
  -webkit-tap-highlight-color: transparent;
  border-top: 1px solid #eee;
  width: 100vw;
  height: 18vw;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 101;
}

.nav-list {
  background-color: white;
  z-index: 2;
  flex: 1;
  display: flex;
  text-decoration: none !important;
  color: black;
  flex-direction: column;
  align-items: center;
}
.nav-list .router-img {
  width:8vw;
  height: 6vw;
  margin: 2vw 0;
  background-size: contain;
  background-repeat: no-repeat;
}
.nav-list .router-img1{
  background-image: url('~@/assets/nav/1.png')
}
.nav-list .router-img2{
  background-image: url('~@/assets/nav/3.png')
}
.nav-list .router-img3{
  background-image: url('~@/assets/nav/5.png')
}
.nav-list .router-img4{
  background-image: url('~@/assets/nav/7.png')
}
.nav-list .router-img1.active{
  background-image: url('~@/assets/nav/2.png')
}
.nav-list .router-img2.active{
  background-image: url('~@/assets/nav/4.png')
}
.nav-list .router-img3.active{
  background-image: url('~@/assets/nav/6.png')
}
.nav-list .router-img4.active{
  background-image: url('~@/assets/nav/8.png')
}
/* 中心区域 */
#main-box {
  width: 13vw;
  height: 13vw;
  margin: 1vw 0 1.5vw;
  background: url('~@/assets/nav/center.png') no-repeat center center;
  background-size: 100% 100%;
  border-radius: 50%;
}
</style>


