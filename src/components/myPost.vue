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
            <div class="delete" @click="alertDelete(index)"></div>
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
            <div class="icon" @click="showMore(index)"></div>
            <p class="getted">{{getInfo[index]}}</p>
            <div class="isGetted" :class="{hasGetted:hasGet[index]}" @click="finished(index)">
              <p>{{finish[index]}}</p>
            </div>
          </div>
          <div class="much-info">
            <div class="which-person" v-for="(gainPerson,index) in gainPeople[index]" :key="index">
              <div
                class="single-icon"
                :style="{backgroundSize:`cover`,backgroundImage:`url(${photoUrl[index]})`}"
              ></div>
              <div class="isWho">
                <p>{{pickName[index]}}领取了您的心愿</p>
              </div>
              <div class="pickTime">{{pickTime[index]}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="delete-overplay" v-show="isDelete"></div>
    <div class="delete-alert" v-show="isDelete">
      <div class="delete-icon"></div>
      <div class="delete-word">是否确定删除这个心愿?</div>
      <div class="delete-sure" @click="toDeleteWish">
        <p>确定</p>
      </div>
    </div>
    <div class="delete-cancle" v-show="isDelete" @click="doNothing"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      isDelete: false,
      wishes: [],
      methods: [],
      theWish: [],
      level: [],
      school: [],
      many: [],
      pWidth: "maxWidth:54vw;wordBreak: break-all;marginLeft:2px;",
      time: [],
      tel: [],
      getInfo: [],
      isGetted: [],
      clientHeight: 39,
      show: [],
      finish: [],
      nums: 0,
      wid: [],
      gainPeople: [],
      photoUrl: [],
      pickName: [],
      pickTime: [],
      hasGet: [],
      deleteWish: ""
    };
  },
  methods: {
    PostToGet() {
      this.$router.replace({ path: `/myget` });
    },
    alertDelete(index) {
      this.isDelete = true;
      this.deleteWish = this.wid[index];
    },
    toDeleteWish() {
      this.isDelete = false;
      let judge = () => {
        return new Promise((resolve, reject) => {
          this.$axios.get(`/wish/remove?uuid=${this.deleteWish}`).then(res => {
            resolve();
          });
        });
      };
      let that = this;
      async function start() {
        await judge();
        that.getData();
      }
      start();
    },
    doNothing() {
      this.isDelete = false;
      this.deleteWish = "";
    },
    showMore(index) {
      if (this.show[index] == false) {
        document.getElementsByClassName("wish-info")[index].style.overflow =
          "hidden";
        document.getElementsByClassName("wish-info")[index].style.height =
          this.clientHeight + "px";
        this.show[index] = true;
      } else if (this.many[index] > 0) {
        let length = this.gainPeople[index].length;
        document.getElementsByClassName("wish-info")[index].style.overflow =
          "scroll";
        let showHeight =
          document.getElementsByClassName("wish-info")[index].clientHeight +
          50 * length;
        document.getElementsByClassName("wish-info")[index].style.height =
          showHeight + "px";
        this.show[index] = false;
      }
    },
    finished(index) {
      this.finish[index] = "已完成";
      this.$set(this.finish, this.finish[index]);
      this.hasGet[index] = true;
      this.$set(this.hasGet, this.hasGet[index]);
      let judge = index => {
        return new Promise((resolve, reject) => {
          this.$axios.get(`/wish/finish?uuid=${this.wid[index]}`).then(res => {
            resolve();
          });
        });
      };
      let that = this;
      async function start(index) {
        await judge(index);
        that.getData();
      }
      start(index);
    },
    backTo() {
      this.$router.replace("/mine");
    },
    getData() {
      const url = "/wish/iCreated	";
      this.$axios
        .get(url)
        .then(res => {
          this.wishes = res.data.result;
          let method = [];
          let times = [];
          let status = [];
          let people = [];
          let pickTimes = [];
          this.wishes.forEach((value, index) => {
            this.theWish[index] = value.wish_content;
            this.level[index] = value.wish_type;
            this.school[index] = value.wish_where;
            if (value.contact.length == 0) {
              this.tel[index] = "这个小姐姐没有填写联系方式噢";
            } else {
              this.tel[index] = value.contact;
            }
            this.time[index] = value.createdAt;
            this.wid[index] = value.uuid;
            method[index] = value.anonymous;
            people[index] = value.wish_many;
            status[index] = value.wish_status;
            status.forEach((value, index) => {
              if (value == 0) {
                this.finish[index] = "确认完成";
                this.hasGet[index] = false;
              } else if (value == 1) {
                this.finish[index] = "已完成";
                this.hasGet[index] = true;
              }
            });
            this.gainPeople[index] = value.gains;
          });
          method.forEach((value, index) => {
            if (value == true) {
              this.methods[index] = "匿名发布";
            } else {
              this.methods[index] = "实名发布";
            }
          });
          people.forEach((value, index) => {
            this.many[index] = value;
            this.getInfo[index] = `已被${this.many[index]}人领取`;
          });
          status.forEach((value, index) => {
            if (value == 0) {
              this.finish[index] = "确认完成";
              this.hasGet[index] = false;
            } else if (value == 1) {
              this.finish[index] = "已完成";
              this.hasGet[index] = true;
            }
          });
          this.gainPeople.forEach((value, index) => {
            if (value.length > 0) {
              this.photoUrl[index] = value[0].headimgurl;
              this.pickName[index] = value[0].nickname;
              pickTimes[index] = value[0].pick_time;
              pickTimes.forEach((value, index) => {
                let nowTime = `${new Date().getDate()}`;
                if (nowTime == value.slice(8, 10)) {
                  this.pickTime[index] = value.slice(11, 19);
                } else {
                  this.pickTime[index] = `${nowTime - value.slice(8, 10)}天前`;
                }
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.which-person,
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
  text-align: center;
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
}
.isGetted {
  width: 13vw;
  height: 20px;
  background-image: linear-gradient(325deg, #fd9bbf 0%, #fde8b7 100%);
  border-radius: 15px;
  margin-left: 40vw;
  margin-top: 9px;
  color: white;
}
.hasGetted {
  width: 13vw;
  height: 20px;
  background: #ffebeb;
  border-radius: 0;
  margin-left: 40vw;
  margin-top: 9px;
  color: #000000;
}
.isGetted p {
  text-align: center;
  margin-top: 4px;
}
.which-person {
  justify-content: space-around;
  height: 40px;
}
.single-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-top: 15px;
}
.isWho p {
  width: 200px;
  height: 14px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #000000;
  margin-top: 22px;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
  overflow-x: hidden;
}
.pickTime {
  height: 14px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #989898;
  margin-top: 22px;
}
.delete-overplay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2001;
}
.delete-alert {
  position: fixed;
  top: 30%;
  left: 25%;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  z-index: 2002;
}
.delete-icon {
  width: 40px;
  height: 40px;
  background: url("../assets/Remove.png");
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 37px;
}
.delete-word {
  width: 150px;
  height: 14px;
  font-family: Segoe UI;
  font-size: 10px;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #707070;
  margin: 0 auto;
  margin-top: 30px;
}
.delete-sure {
  width: 144px;
  height: 22px;
  background-color: #ffcbcb;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 100px;
  margin: 0 auto;
  margin-top: 25px;
  padding-top: 0.1px;
}
.delete-sure p {
  width: 30px;
  font-family: Segoe UI;
  font-size: 12px;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  margin: 0 auto;
  margin-top: 3px;
}
.delete-cancle {
  position: fixed;
  top: 65%;
  left: 48.5%;
  width: 24px;
  height: 24px;
  background: url("../assets/cancle.png");
  background-size: 100% 100%;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  z-index: 2002;
}
</style>
