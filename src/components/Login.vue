<template>
  <div class="login">
    <button @click="ifFirst()">登录</button>
  </div>
</template>

<script>
const axios = require('axios');


export default {

  data(){
    return{
      firstLogin:''
    }
  },
  methods:{
    getUserInfo(){
      // console.log(1)
      axios.get('http://47.100.12.168:3000/login/getUserInfo?userID=00')
      .then(res => {
        console.log(res);
        
        
        if(res.status == 200){
          console.log(res.data)
          this.$store.commit('initUser',{
            token:res.data.token,
            token_exp:new Date().getTime(),
            userInfo:res.data
          })
        }else{
          console.log('响应失败')
          }
        })
      .catch(err => {
        console.log(err)
        console.log('获取失败')
      }).finally(() => {
        console.log('登录了，store改了吗',this.$store.state);
      })
      
    },
    ifFirst(){
      if(this.firstLogin){
        this.$router.push({path:'/welcome'})
      }else{
        this.$router.push({path:'/wishwall'})
      }  
    }
  
  },
  mounted(){
    console.log(1)
    this.getUserInfo();
  }
}
</script>

<style>

</style>