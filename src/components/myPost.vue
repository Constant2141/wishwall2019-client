<template>
  <div id="my-post">
    <div class="top-bar">
      <div class="left-arrow" @click="backTo"></div>
      <div class="top-select" :class="{active:isActive}">
        <p>我发布的</p>
      </div>
      <div class="top-select" :class="{active:!isActive}" @click="PostToGet">
        <p>我领取的</p>
      </div>
    </div>
    <div class="middle">
      <div class="total" v-for="(wish,index) in wishes " :key="index">
        <div class="single-wish">
          <div class="top-wish">
            <p class="method">{{methods[index]}}</p>
            <div class="delete"></div>
          </div>
          <div class="middle-wish">
            <p>{{theWish[index]}}</p>
            <div class="more-info">
              <p>#{{level[index]}}&nbsp;&nbsp;&nbsp;#{{school[index]}}</p>
              <p>{{time[index]}}</p>
            </div>
            <div class="more-info">
              <p>联系方式:</p>
              <p :style="pWidth">{{tel[index]}}</p>
            </div>
          </div>
        </div>
        <div class="wish-info">
          <div class="little-info">
            <div class="icon" @click="showMore(index)"></div>
            <p class="getted">{{getInfo[index]}}</p>
            <div class="isGetted" v-if="isGetted[index]" @click="finished">
              <p>{{finish}}</p>
            </div>
          </div>
          <div class="much-info">
            <div class="single-icon"></div>
            <div class="single-icon"></div>
            <div class="single-icon"></div>
            <div class="single-icon"></div>
            <div class="single-icon"></div>
            <div class="single-icon"></div>
            <div class="single-icon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      wishes:[],
      methods: [],
      theWish: [],
      level: [],
      school: [],
      many:[],
      pWidth: "maxWidth:54vw;wordBreak: break-all;marginLeft:2px;",
      time: [],
      tel: [],
      getInfo: [],
      isGetted: [],
      clientHeight: 39,
      show: [],
      finish: "确认完成",
      nums:0
    };
  },
  methods: {
    PostToGet() {
      let judge = () => {
        return new Promise((resolve,reject) => {
          this.$axios.get("/wish/iGained").then(res => {
            resolve(res.data.result.length)
          })
        })
      }
      let that = this
      async function start(){
        let nums = await judge();
        that.$router.replace({ path: `/myget?count=${nums}` });
      }
      start()
    },
    showMore(index) {
      if (this.show[index] == false) {
        document.getElementsByClassName("wish-info")[index].style.overflow =
          "hidden";
        document.getElementsByClassName("wish-info")[index].style.height =
          this.clientHeight + "px";
        this.show[index] = true;
      } else if (this.isGetted[index] == true) {
        document.getElementsByClassName("wish-info")[index].style.overflow =
          "scroll";
        this.clientHeight =
          document.getElementsByClassName("wish-info")[index].clientHeight +
          25 * 7;
        document.getElementsByClassName("wish-info")[index].style.height =
          this.clientHeight + "px";
        this.show[index] = false;
        this.clientHeight = 39;
      }
    },
    finished() {
      this.finish = "已完成";
      document.getElementsByClassName("isGetted")[0].style.background =
        "#cbcbcb";
    },
    backTo(){
      this.$router.replace("/mine")
    },
    getData(){
      const url = "/wish/iCreated	";
      this.$axios
        .get(url)
        .then(res => {
          console.log(res)
          this.wishes = res.data.result;
          let method = [];
          let times = [];
          let status = [];
          let people = [];
          this.wishes.forEach((value,index) => {
            this.theWish[index] = value.wish_content;
            this.level[index] = value.wish_type;
            this.school[index] = value.wish_where;
            this.tel[index] = value.contact;
            this.time[index] = value.createdAt;
            method[index] = value.anonymous;
            method.forEach((value,index) => {
              if(value == true){
                this.methods[index] = "匿名发布";
              }else{
                this.methods[index] = "实名发布";
              }
            })
            people[index] = value.wish_many;
            people.forEach((value,index) => {
              this.many[index] = value;
            })
            status[index] = value.wish_status;
            status.forEach((value,index) => {
              if(value == 0){
                this.getInfo[index] = `未被领取`;
                this.isGetted[index] = false;
              }
              else if(value == 1){
                this.getInfo[index] = `已被${this.many[index]}人领取`;
                this.isGetted[index] = true;
              }
              else if(value == 2){
                this.getInfo[index] = `已完成`;
                this.isGetted[index] = false;
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
  },
  beforeRouteEnter (to, from, next) {
    let count = to.query.count
    console.log(count)
    next(vm=>{
      console.log(vm.wishes.length)
      if(vm.wishes.length == count){
        console.log("不需要更新");
      }else{
        console.log("需要更新");
        vm.show = [...vm.isGetted];
        vm.getData();
      }
    }
    )
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*解决点击出现的黑块*/
}
#my-post {
  height: 100vh;
  background: #fafafa;
}
.top-bar {
  width: 375px;
  height: 44px;
  display: flex;
  position: fixed;
  background: white;
}
.top-wish,
.more-info,
.little-info {
  display: flex;
}
.left-arrow {
  width: 19px;
  height: 19px;
  background: url("../assets/back.png");
  background-size: 100% 100%;
  margin-top: 15px;
  margin-left: 4px;
}
.top-select {
  height: 25px;
  width: 58px;
  margin-left: 46px;
  margin-top: 15px;
}
.active {
  border-bottom: 3px solid #ffc4c4;
  color: #ffc4c4;
}
.top-select:nth-child(3) {
  margin-left: 119px;
}
.top-select p {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 17px;
  letter-spacing: 0px;
}
.middle {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 20vw;
}
.single-wish {
  width: 329px;
  min-height: 100px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 15px 15px 0px 0px;
  margin: 0 auto;
  margin-top: 15px;
}
.wish-info {
  width: 329px;
  height: 39px;
  background-color: #ffebeb;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 0px 0px 15px 15px;
  margin: 0 auto;
  transition: height 0.5s;
  overflow: hidden;
}
.method {
  width: 15vw;
  /* height: 14px; */
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
  color: #989898;
  margin-left: 146px;
  margin-right: 98px;
  margin-top: 12px;
}
.delete {
  width: 24px;
  height: 24px;
  background: url("../assets/Remove.png");
  background-size: 100% 100%;
  margin-top: 5px;
  margin-right: 16px;
}
.middle-wish > p {
  max-width: 216px;
  min-height: 14px;
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #000000;
  word-wrap: break-word;
  margin: 0 auto;
  margin-top: 13px;
}
.more-info p {
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
  color: #989898;
  margin-top: 14px;
  margin-left: 40px;
}
.wish-info p {
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 12px;
  letter-spacing: 0px;
}
.icon {
  min-width: 22px;
  max-width: 75px;
  margin-right: 8px;
  margin-left: 14px;
  margin-top: 6px;
}
.getted {
  width: 70px;
  color: black;
  margin-top: 13px;
}
.isGetted {
  width: 13vw;
  height: 20px;
  background-image: linear-gradient(325deg, #fd9bbf 0%, #fde8b7 100%);
  border-radius: 15px;
  margin-left: 40vw;
  margin-top: 9px;
}
.isGetted p {
  text-align: center;
  margin-top: 5px;
  color: white;
}
.single-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #000000;
  margin-left: 14px;
  margin-top: 15px;
}
</style>
