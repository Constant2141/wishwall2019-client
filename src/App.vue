<template>
  <div id="app">
  <meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">      
    <!-- 我需要一张屏障 -->
    <div :class="[{'cover-active':toggleBool},'black-cover']"></div>
    <!-- 路由 -->
    <keep-alive >
      <router-view v-if="!$route.meta.hasOwnProperty('trueKeepAlive')"></router-view>
    </keep-alive>
    <router-view v-if="$route.meta.hasOwnProperty('trueKeepAlive')"></router-view>
    <!-- 导航 -->
    <navi
      @cover="cover"
      @removeCover="removeCover"
      :toggleBool="toggleBool"
      v-show="$route.meta.keepAlive"
    ></navi>
  </div>
</template>

<script>
import navi from "./components/Nav.vue";

//阻止默认行为函数
function preventDefault(e) {
  e.preventDefault();
}

export default {
  name: "App",
  components: { navi },
  data() {
    return {
      toggleBool: true
    };
  },
  methods: {
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
/* 黑色板 */
.black-cover {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 100;
  transition: all 0.2s;
}
.cover-active {
  left: -100vw;
}
</style>
