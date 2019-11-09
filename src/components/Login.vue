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
        let user = await axios.get("http://47.100.12.168:3000/login/getUserInfo")
        let { status, data } = user
        if (status == 200) {
          this.$store.commit("initUser",{
            token: data.token,
            token_exp: new Date().getTime(),
            userInfo: data
          });
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