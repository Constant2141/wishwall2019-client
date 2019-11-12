<template>
  <div class="login">
    <button @click="ifFirst()">登录</button>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      firstLogin: ""
    };
  },
  methods: {
    async getUserInfo() {
      try {
        let res = await axios.get("http://47.100.12.168:3000/login/getUserInfo?userID=11")
        if (res.status == 200) {
          // this.$store.commit("initUser",{
          //   token: data.token,
          //   token_exp: new Date().getTime(),
          //   userInfo: data
          // });
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('token_exp',new Date().getTime());
          localStorage.setItem('userInfo',JSON.stringify(res.data));
          console.log('登录成功');
        } else {
          console.log("响应失败");
        }
      } catch (error) {
        console.log('error',error);
      }
    },
    ifFirst() {
      if (this.firstLogin) {
        this.$router.push({ path: "/welcome" });
      } else {
        this.$router.push({ path: "/wishwall" });
      }
    }
  },
  mounted() {
    console.log('login mounted');
    this.getUserInfo();
  }
};
</script>

<style>
</style>