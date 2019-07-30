<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="nav" @click="changeNav">
      <router-link class="nav-list" :to="{path:'/treehole'}" replace>
        <img :src="imgSrc[0]">
        <span>树洞</span>
      </router-link>
      <router-link class="nav-list" :to="{path:'/treehole'}" replace>
        <img :src="imgSrc[0]">
        <span>树洞</span>
      </router-link>

      <div class="nav-list" id="main-box"></div>

      <router-link class="nav-list" :to="{path:'/treehole'}" replace >
        <img :src="imgSrc[0]">
        <span>树洞</span>
      </router-link>
      <router-link class="nav-list" :to="{path:'/treehole'}" replace >
        <img :src="img">
        <span>树洞</span>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      imgSrc:[require('./assets/logo.png')],
      img:require('./assets/logo.png')
    };
  },
  mounted() {
    //挂载时如果没有localStorage就要进入选择男女界面？
    // if(this.$state)
  },
  methods:{
    changeNav(e){
      alert(e.currentTarget)
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
  width: 100vw;
  height: 18vw;
  position: fixed;
  bottom: 0;
  background-color: pink;
  display: flex;
}
.nav-list{
  flex:1;
  display: flex;
  text-decoration: none !important;
  color:black;
  font-size: 12px;
  flex-direction: column;
  align-items: center;
}
.nav-list > img{
  height: 8vw;
  margin:2vw 0;
}
/* 中心区域 */
#main-box{
  background-color: red;
}
</style>
