<template>
  <div class="login">
    <button @click="ifFirst()">登录</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      firstLogin:''
    }
  },
  methods:{
    getUserInfo(){
      this.$axios.get('/login/getUserInfo?userID=11')
      .then(res => {
        if(res.status == 200){
          console.log(res.data)
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('token_exp',new Date().getTime());
          localStorage.setItem('userInfo',res.data);
        }else{
          console.log('获取失败')
          }
        })
      .catch(err => console.log(err))
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