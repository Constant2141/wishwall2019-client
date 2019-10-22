<template>
  <div id="my-post">
    <div class="top-bar">
      <div class="left-arrow" @click="backTo"></div>
      <div class="top-select" :class="{active:isActive}" @click="GetToPost">
        <p>我发布的</p>
      </div>
      <div class="top-select" :class="{active:!isActive}">
        <p>我领取的</p>
      </div>
    </div>
    <div class="middle">
      <div class="total" v-for="(wish,index) in wishes " :key="index">
        <div class="single-wish">
          <div class="top-wish">
            <p class="method">{{methods[index]}}</p>
            <div class="delete" @click="deleteWish(index)"></div>
          </div>
          <div class="middle-wish">
            <p>{{theWish[index]}}</p>
            <div class="more-info">
              <p>#{{level[index]}}&nbsp;&nbsp;&nbsp;#{{school[index]}}</p>
              <div class="timing">
                <p>{{time[index]}}</p>
              </div>
            </div>
            <div class="more-info">
              <p>联系方式:</p>
              <p :style="pWidth">{{tel[index]}}</p>
            </div>
          </div>
        </div>
        <div class="wish-info">
          <div class="little-info">
            <p class="getted">{{getInfo[index]}}</p>
            <div class="isGetted" :class="{hasGetted:hasGet[index]}" @click="finished(index)">
              <p>{{finish[index]}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resolve, reject } from "q";
export default {
  data() {
    return {
      isActive: false,
      wishes: [],
      methods: [],
      theWish: [],
      level: [],
      school: [],
      many: [],
      pWidth: "maxWidth:54vw;wordBreak: break-all;marginLeft:2px;",
      time: [],
      tel: [],
      isGetted: [],
      getInfo: [],
      clientHeight: 39,
      finish:[],
      nums: 0,
      wid: [],
      hasGet:[],
    };
  },
  methods: {
    GetToPost() {
      this.$router.replace({ path: `/mypost` });
    },
    getData() {
      const url = "/wish/iGained";
      this.$axios.get(url).then(res => {
        console.log(res);
        this.wishes = res.data.result;
        let method = [];
        let times = [];
        let status = [];
        let people = [];
        this.wishes.forEach((value, index) => {
          this.hasGet[index] = false;
          this.wid[index] = value.uuid;
          this.theWish[index] = value.wish_content;
          this.level[index] = value.wish_type;
          this.school[index] = value.wish_where;
          this.tel[index] = value.contact;
          method[index] = value.anonymous;
          // this.time[index] = value.createdAt;
          times[index] = value.createdAt;
          times.forEach((value, index) => {
            this.time[index] = value.slice(0, 10) + " " + value.slice(11, 19);
          });
          method.forEach((value, index) => {
            if (value == true) {
              this.methods[index] = "匿名发布";
            } else {
              this.methods[index] = "实名发布";
            }
          });
          people[index] = value.wish_many;
          people.forEach((value, index) => {
            this.many[index] = value;
            this.getInfo[index] = `已被${this.many[index]}人领取`;
          });
          status[index] = value.wish_status;
          status.forEach((value, index) => {
            if (value == 0) {
              this.finish[index] = "确认完成"
              this.hasGet[index] = false;
            } else if (value == 1) {
              this.finish[index] = "已完成"
              this.hasGet[index] = true
            }
          });
        });
      });
    },
    finished(index) {
      this.finish[index] = "已完成";
      this.$set(this.finish,this.finish[index]);
      this.hasGet[index] = true;
      this.$set(this.hasGet,this.hasGet[index]);
      this.$axios
        .get(`/wish/finish?uuid=${this.wid[index]}` )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    backTo() {
      this.$router.replace("/mine");
    },
    deleteWish(index) {
      let judge = (index) => {
        console.log(this.wid[index])
        return new Promise((resolve, reject) => {
          this.$axios.get(`/wish/remove?uuid=${this.wid[index]}`).then(res => {
            resolve()
          });
        });
      };
      let that = this;
      async function start(index) {
        await judge(index);
        that.getData()
      }
      this.$dialog.confirm({
        message:"确认删除吗?"
      })
      .then(() => {
        start(index);
      })
      .catch(() => {

      })
    },
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
    });
  }
  //本来做了条数限制不请求的
  //可是万一条数不变，可是其他数据变了也不刷新这样也不对的
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
  text-align: center;
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
  margin-top: 6px;
  margin-bottom: 8px;
  margin-left: 40px;
}
.timing {
  width: 50%;
  height: 100%;
}
.timing p {
  float: right;
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
  margin-left: 44px;
}
.isGetted {
  width: 13vw;
  height: 20px;
  background-image: linear-gradient(325deg, #fd9bbf 0%, #fde8b7 100%);
  border-radius: 15px;
  margin-left: 40vw;
  margin-top: 9px;
}
.hasGetted {
  width: 13vw;
  height: 20px;
  background: #cbcbcb;
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
