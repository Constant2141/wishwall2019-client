<template>
  <div class="first">
    <div class="welcome" v-if="!choose">
      <div
        :class="{'words-appear':welcome,'words-disappear':!welcome}" >
          <p>欢迎使用</p>
          <p>女生节许愿墙</p>
          <p class="have-fun">Have fun here :P</p>
      </div>
    </div>

    <div class="sex-select" v-if="choose">
      <div class="tip">
        <h4>请选择您的性别</h4>
        <p>性别一经选择不能再度更改哟</p>
      </div>
      <div class="sex">
        <div class="boy"
          @click="selectBoy()"
          :class="{'isBoy':boy}">
          <div class="avatar"></div>
          <p>我是男生</p>
        </div>
        <div class="girl"
          @click="selectGirl()"
          :class="{'isGirl':girl}">
          <div class="avatar"></div>
          <p>我是女生</p>
        </div>
      </div>
      <div class="confirm"
        :class="[{'confirm-girl':girl},{'confirm-boy':boy}]"
        @click="confirmSex()">确认</div>
    </div>

    <div class="logo">
      <div class="nw-logo"></div>
      <p class="nw-studio">守夜人工作室</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      welcome:true,
      choose:false,
      boy:false,
      girl:false,
      sex:''
    }
  },
  methods:{
    wordsMove(){

    },
    selectBoy(){
      this.boy = true;
      this.girl = false;
      this.sex = 1;
    },
    selectGirl(){
      this.boy = false;
      this.girl = true;
      this.sex = 2;
    },
    confirmSex(){
      let trueSex = localStorage.sex;
      if(this.sex){
        if(this.sex!=trueSex){
          this.$dialog.confirm({
            message:'您选择的性别和微信性别不匹配，是否继续'
          })
          .then(()=>{
            this.$axios.get(`/user/set?sex=${this.sex}`)
            .then(res => {
                localStorage.setItem('sex',this.sex)
                this.$store.commit('initSex',this.sex)
                this.$router.replace({path:'/wishwall'});
              })
            })
          .catch(()=>{})
        }else{
          this.$router.replace({path:'/wishwall'})
        }
      }else{
        this.$dialog.alert({
          message:'请您先选择自己的性别'
        })
      }
    }
    },
    mounted(){
      setTimeout(()=>{
        this.welcome = false;
        setTimeout(() => {
           this.choose = true;
        }, 1000);
      },2000)

    }
  }
</script>

<style scoped>
.first{
  padding: 0 1.875rem 0 1.875rem;
}
.words-appear{
  position: relative;
  top:14vh;
  animation:wordsmove 1s 1 forwards;
  opacity: 0;
}
@keyframes wordsmove {
  to{
    top:18vh;
    opacity: 1;
  }
}
.words-disappear{
  position:relative;
  top:18vh;
  animation:wordsdisappear 1s 1 forwards;
  opacity: 1;
}
@keyframes wordsdisappear {
  to{
    top:-10vh;
    opacity: 0;
  }
}
.have-fun{
  margin-top:10vh;
}
.words-appear p,
.words-disappear p{
  font-size: 2.25rem;
  margin-bottom: 2vh;
}
.logo{
  position: fixed;;
  bottom:3vh;
  text-align: center;
  left: 42%;
}
.nw-logo{
  margin: auto;
  width:7vw;
  height: 7vw;
  border-radius: 50px;
  background-image: url("../assets/NWLogo.png");
  background-size: cover;
}
.nw-studio{
  font-size: 0.625rem;
}
/*性别选择*/
.tip{
  text-align: center;
  margin-top: 20vh;
  margin-bottom: 2.5vh;
}
.tip p{
  font-size: 0.75rem;
  margin-top:1vh;
}
.sex{
  display: flex;
  justify-content: space-between;
  margin-bottom: 6vh;
  font-size: 0.75rem;
  text-align: center;
}
.boy,
.girl{
  width:40vw;
  height:36vh;
  background-color:#fff;
  box-shadow: 0 5px 8px #cecece;
  border-radius: 15px;
}
.avatar{
  width:22vw;
  height:22vw;
  border-radius: 50px;
  margin:auto;
  margin-top: 7vh;
  margin-bottom: 8vh;
  background-size: cover;
}
.boy .avatar{
  background-image: url("../assets/Avatar/BoyAvatar.png");
}
.girl .avatar{
  background-image: url("../assets/Avatar/GirlAvatar.png");
}
.confirm{
  margin:auto;
  width:22vw;
  height:3.6vh;
  text-align: center;
  line-height: 3.6vh;
  border:1px solid #000;
  border-radius: 15px;
  font-size:0.75rem;
}
.isBoy{
  background-color: #BFE1FF;
  color: #fff;
}
.isGirl{
  background-color: #FFC4C4;
  color: #fff;
}
.confirm-girl{
  border:0;
  color: #ffffff;
  background: linear-gradient(left,#fd9cbf,#fff8c9);
}
.confirm-boy{
  border:0;
  color: #ffffff;
  background: linear-gradient(left,#9BC5FD,#FAB7FD);
}
</style>
