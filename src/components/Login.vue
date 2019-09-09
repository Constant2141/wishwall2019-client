<template>
  <div class="login">
    <button @click="ifFirst()">登录</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      firstLogin:'',
      sex:''
    }
  },
  methods:{
    getUserInfo(){
      this.$axios.get('/login/getUserInfo?userID=11')
      .then(res => {
        if(res.status == 200){
          console.log(res);
          this.firstLogin = res.data.isNewUser;
          this.sex = res.data.sex;
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