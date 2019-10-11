<template>
  <div class="wish-release">
    <div class="top">
      <div class="left">
        <img :src="backImg" alt class="back" @click="back" />
        <span class="title">{{title}}</span>
      </div>
      <div class="release-button" @click="release">{{buttonText}}</div>
    </div>
    <div class="edit-area">
      <div class="wish-area">
        <textarea name id="wish" cols="30" rows="10" :placeholder="wishPHold" v-model="content"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "treehole-release",
  data() {
    return {
      //顶部栏变量
      backImg: require("../assets/back.png"),
      title: "发布树洞", //页面标题
      buttonText: "发布", //发布按钮

      //编辑栏变量
      wishPHold: "快来发布你的树洞吧 ~", //编写心愿处的placeholder
      //要发布的树洞
      content: ""
    };
  },
  methods: {
    release() {
      // 向后台发送数据
      // console.log(localStorage.getItem('token'))
      if (this.content == "") {
        this.$dialog.alert({
          message: "愿望内容不可为空"
        });
      } else {
        console.log("要发请求了");
        this.$axios
          .post("treehole/addTreeHole", {text:this.content})
          .then(res => {
            console.log(res);
            this.$dialog.alert({
              message: "发布成功！"
            });
            this.content = "";
          })
          .catch(err => {
            console.log(err);
            this.$dialog.alert({
              message: "发布失败喔"
            });
            this.content = "";
          });
      }
    },
    back() {
      this.$router.replace("wishwall");
      this.content = "";
    }
  }
};
</script>

 <style scoped>
* {
  font-family: "微软雅黑";
}

/* 顶部栏的样式 */
.top {
  width: 100%;
  height: 12vw;
  position: relative;
}
.left {
  margin-top: 4vw;
  display: inline-block;
}
.left > img {
  width: 5.2vw;
  height: 5.2vw;
  margin-left: 3vw;
  vertical-align: text-bottom;
  display: inline-block;
}
.title {
  display: inline-block;
  margin-left: 2vw;
  font-size: 18px;
  /* padding-top: .5vw; */
}
.release-button {
  display: inline-block;
  position: absolute;
  right: 5vw;
  top: 4.3vw;
}
/* 编辑栏样式 */
.edit-area {
  width: 100vw;
  height: 56vw;
}
.wish-area textarea {
  border: none;
  width: 92vw;
  height: 40vw;
  padding: 5vw 4vw 3vw 4vw;
  outline: none;
}
.wish-area textarea::placeholder {
  color: #b8b8b8;
}
</style>
 