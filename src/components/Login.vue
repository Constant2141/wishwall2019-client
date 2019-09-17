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
      axios.get('/login/getUserInfo?userID=11')
      .then(res => {
        console.log(res);
        
        if(res.status == 200){
          console.log(res.data)
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('token_exp',new Date().getTime());
          localStorage.setItem('userInfo',res.data);
        }
        })
      .catch(err => {
        console.log(err)
        console.log('获取失败')
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
    this.getUserInfo();
  }
}
</script>

<style>

</style>