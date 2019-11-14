<template>
  <div class="loading">
    <img src="../assets/cat.gif" alt width="104px" height="90px">
    <span class="font">{{ font }}</span>
  </div>
</template>

<script>
const axios = require('axios');


export default {

  data(){
    return{
      firstLogin:'',
      flag: false,
      font: "loading",
      timer: ""
    }
  },
  methods:{
    getUserInfo(){
      // console.log(1)
      axios.get('http://47.100.12.168:3000/login/getUserInfo?userID=11')
      .then(res => {
        console.log(res);

        if(res.status == 200){
          console.log(res.data)
          this.$router.replace ({path:'/wishwall'})
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('token_exp',new Date().getTime());
          localStorage.setItem('userInfo',JSON.stringify(res.data));
          this.$store.commit("initUser",res.data);
        }else{
          console.log('响应失败')
          }
        })
      .catch(err => {
        console.log(err)
        console.log('获取失败')
      })

    },
    ifFirst(){
      this.$router.replace ({path:'/wishwall'})
      // if(this.firstLogin){
      //   this.$router.push({path:'/welcome'})
      // }else{
      //   this.$router.push({path:'/wishwall'})
      // }
    }

  },
  created(){

    const Font = "loading...";
    var i = 7;
    this.timer = setInterval(() => {
      this.font = Font.slice(0, i++);
      if (i == 12) i = 7;
    }, 200);

  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted(){
      let _this = this
      if(location.href.includes('code')) {
        let query = location.href.split('?')[1].split('&')[0]
        let code = query.slice(5)
        this.$axios.get(`/login?code=${code}`)
        .then(res => {
          let user = res.data;
          console.log(user);
          localStorage.setItem('token',user.token);
          localStorage.setItem('sex',user.sex);
          localStorage.setItem('token_exp',new Date().getTime());
          localStorage.setItem('userInfo',JSON.stringify(user));
          if(user.isNewUser){
            console.log('welcome');
            _this.$router.replace({path:'/welcome'})
          }else{
            console.log('wishwall');
            _this.$router.replace({path:'/wishwall'})
          }
        }).catch(e => console.log(e))
      }
      else if(!localStorage.getItem('token')){
        let href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce1195ab4b9fcb66&redirect_uri=http%3A%2F%2Fwx.1bin.top&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`
        // window.open(href,'_self')
        window.location.href =href;
      }else {
        _this.$router.replace({path:'/wishwall'})
      }
      this.getUserInfo();

  }
}
</script>

<style scoped>

@font-face {
  font-family: HarryP;
  src: url("../assets/font/harrypotter.ttf");
}
.loading {
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.font {
  display: inline-block;
  width: 104px;
  font-family: HarryP;
  color: rgb(109, 135, 152);
  padding-top: 30px;
  font-size: 60px;
  text-align: left;
}
</style>
