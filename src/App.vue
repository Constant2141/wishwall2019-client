<template>
  <div id="app">
    <!-- 我需要一张屏障 -->
    <div :class="[{'cover-active':toggleBool},'black-cover']"></div>
    <!-- 我需要一个 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="nav" 
      @click="changeNav($event)"
      v-if="$route.meta.keepAlive">
      <router-link id="wishwall" class="nav-list" :to="{path:'/treehole'}" replace>
        <img :src="imgSrc[0]">
        <span>许愿墙</span>
      </router-link>
      <router-link id="treehole" class="nav-list" :to="{path:'/treehole'}" replace>
        <img :src="imgSrc[1]" />
        <span>树洞</span>
      </router-link>

      <div class="nav-list">
        <div id="main-box"></div>
      </div>

      <router-link id="starball" class="nav-list" :to="{path:'/treehole'}" replace>
        <img :src="imgSrc[2]" />
        <span>星球</span>
      </router-link>
      <router-link id="mine" class="nav-list" :to="{path:'/treehole'}" replace>
        <img :src="imgSrc[3]" />
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
//阻止默认行为函数
function preventDefault(e) {
  e.preventDefault();
}
export default {
  name: "App",
  data() {
    return {
      toggleBool: true,
      activeSrc: [
        require("./assets/nav/2.png"),
        require("./assets/nav/4.png"),
        require("./assets/nav/6.png"),
        require("./assets/nav/8.png")
      ],
      notActiveSrc: [
        require("./assets/nav/1.png"),
        require("./assets/nav/3.png"),
        require("./assets/nav/5.png"),
        require("./assets/nav/7.png")
      ],
      imgSrc: [
        require("./assets/nav/1.png"),
        require("./assets/nav/3.png"),
        require("./assets/nav/5.png"),
        require("./assets/nav/7.png")
      ]
    };
  },
  mounted() {},
  methods: {
    //委托
    changeNav(e) {
      var target = e.target;
      if (target.nodeName.toLocaleLowerCase() == "a") {
        this.removeCover();
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
      } else if (target.nodeName.toLocaleLowerCase() == "div" && target.id == 'main-box') {
        //点中间区域
        this.imgSrc = this.notActiveSrc;
        // 禁用触摸滚动页面
        if (this.toggleBool) {
          this.cover();
        } else {
          // 恢复触摸滚动页面
          this.removeCover();
        }
      } else if (
        target &&
        (target.nodeName.toLocaleLowerCase() == "img" ||
          target.nodeName.toLocaleLowerCase() == "span")
      ) {
        this.changeNav({ target: target.parentNode });
      }
    },
    // 盖锅盖
    cover() {
      document.addEventListener("touchmove", preventDefault, {
        passive: false
      });
      this.toggleBool = false;
    },
    // 掀锅盖
    removeCover() {
      this.toggleBool = true;
      document.removeEventListener("touchmove", preventDefault, {
        passive: false
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;       
  padding: 0;
}
/* 黑色板 */
.black-cover {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 1;
  transition: all 2s;
}
.cover-active {
  left: -100vw;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
/* 导航条 */
.nav {
  -webkit-tap-highlight-color: transparent;
  border-top: 1px solid #eee;
  z-index: 2;
  width: 100vw;
  height: 18vw;
  position: fixed;
  bottom: 0;
  background-color: white;
  display: flex;
}
.nav-list {
  flex: 1;
  display: flex;
  text-decoration: none !important;
  color: black;
  font-size: 12px;
  flex-direction: column;
  align-items: center;
}
.nav-list > img {
  height: 6vw;
  margin: 2vw 0;
}
/* 中心区域 */
#main-box {
  width:13vw;
  height: 13vw;
  margin:1vw 0 1.5vw;
  background: linear-gradient(to bottom right,#FD9BBF, #FDE8B7); /* 标准的语法 */
  border-radius: 50%;
}
</style>
