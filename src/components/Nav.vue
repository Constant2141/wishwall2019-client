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
    <router-link id="wishwall" class="nav-list" :to="{path:'/wishwall'}" replace>
      <img :src="imgSrc[0]" />
      <span>许愿墙</span>
    </router-link>
    <router-link id="treehole" class="nav-list" :to="{path:'/treehole'}" replace>
      <img :src="imgSrc[1]" />
      <span>树洞</span>
    </router-link>

    <div class="nav-list">
      <div id="main-box"></div>
    </div>

    <router-link id="starball" class="nav-list" :to="{path:'/planet'}" replace>
      <img :src="imgSrc[2]" />
      <span>星球</span>
    </router-link>
    <router-link id="mine" class="nav-list" :to="{path:'/mine'}" replace>
      <img :src="imgSrc[3]" />
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
      isGirl: true,
      activeBool: false,
      activeSrc: [
        require("../assets/nav/2.png"),
        require("../assets/nav/4.png"),
        require("../assets/nav/6.png"),
        require("../assets/nav/8.png")
      ],
      notActiveSrc: [
        require("../assets/nav/1.png"),
        require("../assets/nav/3.png"),
        require("../assets/nav/5.png"),
        require("../assets/nav/7.png")
      ],
      imgSrc: [
        require("../assets/nav/1.png"),
        require("../assets/nav/3.png"),
        require("../assets/nav/5.png"),
        require("../assets/nav/7.png")
      ],
      // 三个发布路由
      routerLink: ["/welcome", "/welcome", "/welcome"]
    };
  },
  methods: {
    //委托
    changeNav(e) {
      var target = e.target;
      if (target.nodeName.toLocaleLowerCase() == "a") {
        this.activeBool = false;
        this.$emit("removeCover");
        switch (target.id) {
          case "wishwall":
            var arr = this.notActiveSrc.slice();
            arr[0] = this.activeSrc[0];
            this.imgSrc = arr;
            break;
          case "treehole":
            var arr = this.notActiveSrc.slice();
            arr[1] = this.activeSrc[1];
            this.imgSrc = arr;
            break;
          case "starball":
            var arr = this.notActiveSrc.slice();
            arr[2] = this.activeSrc[2];
            this.imgSrc = arr;
            break;
          case "mine":
            var arr = this.notActiveSrc.slice();
            arr[3] = this.activeSrc[3];
            this.imgSrc = arr;
            break;
        }
      } else if (
        target.nodeName.toLocaleLowerCase() == "div" &&
        target.id == "main-box"
      ) {
        //点中间区域
        this.imgSrc = this.notActiveSrc;
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
        (target.nodeName.toLocaleLowerCase() == "img" ||
          target.nodeName.toLocaleLowerCase() == "span")
      ) {
        this.changeNav({ target: target.parentNode });
      }
    },
    postNav(index) {
      //根据index跳不同的组件（编程导航）
      this.$router.replace(this.routerLink[index]);
      this.activeBool = false;
      this.$emit("removeCover");
    }
  },
  mounted() {}
};
</script>
<style scoped>
/* 弹出层 */
.three {
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
  background: linear-gradient(to bottom right, #fd9bbf, #fde8b7);
  margin-bottom: 1vw;
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
.nav-list > img {
  height: 6vw;
  margin: 2vw 0;
}
/* 中心区域 */
#main-box {
  width: 13vw;
  height: 13vw;
  margin: 1vw 0 1.5vw;
  background: linear-gradient(to bottom right, #fd9bbf, #fde8b7);
  border-radius: 50%;
}
</style>


