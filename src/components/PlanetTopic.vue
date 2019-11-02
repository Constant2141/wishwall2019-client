<template>
  <div class="topic">
      <div class="topicBackground">
          <div class="back" @click="back"></div>
          <div class="topicName">{{topicName}}</div>
      </div>
      <div class="bottom-background"></div>
      <div class="comment-area">
          <div class="comment" v-for="(item,index) in comment" :key="index" @click="toComment">
              <div class="content-area">
                  <div class="avator">
                      <img :src="item.headimgurl" alt="" width="43" height="43" >
                  </div>
                  
                  <div class="content-right">
                      <div class="username">{{item.nickname}}</div>
                      <div class="date">{{item.date}}</div>
                      <div class="time">{{item.time}}</div>
                      <div class="content">{{item.comment}}</div>
                  </div>
              </div>
              <div class="function-area">
                  <div class="likeCount">
                        <img src="../assets/like.png" alt="">
                        <div>{{item.likes}}</div>
                  </div>
                  <div class="commentCount">
                        <img src="../assets/comment2.png" alt="">
                        <div>{{item.many}}</div>
                  </div>
              </div>
          </div>
      </div>
      <div class="release" @click="release"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            topicName:"#海底捞最喜欢什么火锅底料",

            comment:[{
                image: require("../assets/NWlogo.png"),
                userName: "jio",
                date:"7/22",
                time:"17:30",
                content:"想要一只dior99",
                goodCount:115,
                commentCount:115
            }
 
            ]

        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        release(){
            this.$router.push("/pCommentRelease");
        },
        toComment(){
            this.$router.push("/planetComment")
        },
        handleTopicData(arr){
            return arr.map(item=>{
                return item = {
                    ...item,
                    date:item.createdAt.slice(item.createdAt.indexOf("-")+1,item.createdAt.indexOf(" ")).replace("-","/"),
                    time:item.createdAt.slice(item.createdAt.indexOf(" ")+1)
                }
            })
        }
        
    },
     mounted(){
         console.log(this.$route)
            this.$axios.get(`star/showStar?uuid=${localStorage.planetUid}`).then(res=>{
                console.log(res)
                this.comment = this.handleTopicData(res.data.result);
                console.log(this.comment)
            }).catch(err=>{
                console.log(err)
            })
    },
    watch:{
        $route(to,from){
            console.log(to.params)
            this.$axios.get(`star/showStar?uuid=${localStorage.planetUid}`).then(res=>{
                console.log(res)
                this.comment = this.handleTopicData(res.data.result);
                console.log(this.comment)
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .topic{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .topicBackground{
        width: 100%;
        height: 189px;
        background: url(../assets/background.png);
        background-size: 110%;
        background-position: 22% 20%;
        position: relative;
    }
    .back{
        background: url(../assets/backWhite.png) no-repeat;
        width:15px;
        height: 15px;
        position: absolute;
        top: 20px;
        left: 17px;
    }
    .topicName{
        color: white;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 30%;
    }

    /* 评论区样式 */
    .bottom-background{
        height: 478px;
        width: 100%;
        position: relative;
        background: #F2F2F2;

    }
    .comment-area{
        width: 100%;
        height: 528px; 
        /* background: blue; */
        position: relative;
        top: -528px;   
        overflow: scroll;
    }
    .comment{
        width: 346px;
        min-height: 111px;
        margin-left: 14.5px;
        margin-bottom: 10px;
        background: #ffffff;
        border-radius:7px;
        box-shadow: rgba(0,0,0,0.16) 0 3px 6px;
    }
    .content-area{
        min-height: 75px;
        width: 100%;
    }
    .avator{
        border-radius: 100%;  
        overflow: hidden;
        width: 14%;
        height: 100%;
        display: inline-block;
        /* background: blue; */
        margin-left: 25px;
        margin-top: 15px;
    }
    .content-area > img{
        border-radius: 100%;
    }
    .content-right{
        display: inline-block;
        width: 70%;
        height: 100%;
        vertical-align: top;
    }
    .username,.date,.time{
        display: inline-block;
        color:#707070;
        padding-top: 22px;
        font-size: 10px;
        margin-bottom: 4px;
    }
    .date,.time{
        transform: scale(0.8);
        vertical-align: sub;
    }
    .username{
        font-size: 12px;
        margin-right: 5px;
    }
    .content{
        color: #707070;
        font-size: 14px;
    }

    .function-area{
        width: 100%;
        height: 36px;
        font-size: 12px;
    }
    .likeCount,.commentCount,.likeCount img,.likeCount div,.commentCount img,.commentCount div{
        display: inline-block;
        vertical-align: top;
    }
    .likeCount{
        margin-left: 243px;
        margin-right:4px;
    }
    .likeCount,.commentCount{
        margin-top: 3px;
    }


    /* 发布按钮 */
    .release{
        width: 45px;
        height: 45px;
        position: fixed;
        bottom: 35px;
        right: 45px;
        border-radius: 100%;
        background: #FFCBCB;
        color: white;
        font-size: 50px;
        font-weight: 100;
    }
    .release::before{
        content: "";
        width:20px;
        height: 2px;
        background: #ffffff;
        position: absolute;
        left: 13px;
        top: 21px;
        border-radius: 3px;
    }
    .release::after{
        content: "";
        width:2px;
        height: 20px;
        background: #ffffff;
        position: absolute;
        left: 22px;
        top: 12px;
        border-radius: 3px;
    }
</style>