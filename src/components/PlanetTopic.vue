<template>
  <div class="topic">
      <div class="topicBackground" ref="background">
          <div class="blur"></div>
          <div class="back" @click="back"></div>
          <div class="topicName"># {{topic.title}}</div>
      </div>
      <div class="bottom-background"></div>
      <div class="comment-area">
          <div class="comment" v-for="(item,index) in comment" :key="index" @click="toComment(item,$event)">
              <div class="content-area">
                  <div class="avator">
                      <img :src="item.headimgurl" alt="" width="43" height="43" >
                  </div>
                  
                  <div class="content-right">
                      <div class="username">{{item.nickname}}</div>
                      <img :src="item.sex==2?girlImg:boyImg" alt="" class="sex">
                      <div class="date">{{item.date}}</div>
                      <div class="time">{{item.time}}</div>
                      <div class="content">{{item.comment}}</div>
                  </div>
              </div>
              <div class="function-area">
                  <div class="likeCount" @click="like(item,$event)">
                        <img :src="item.likeOrNot?likedImg:likeImg" alt="">
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
import { debounce } from "@/utils/debounce.js";
  
var commentid = "";
export default {
    data(){
        return {
            topic:{},
            topicName:"#海底捞最喜欢什么火锅底料",

            comment:[//评论表

            ],

            likeImg:require("../assets/like.png"),
            likedImg:require("../assets/liked.png"),
            girlImg:require("../assets/girl.png"),
            boyImg:require("../assets/boy.png"),
            
            banLike:false
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        release(){
            this.$router.push("/pCommentRelease");
        },
        toComment(item,event){
            console.log(item)
            localStorage.setItem("comment",JSON.stringify(item));
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
        },
        like(item,event){
            event.stopPropagation();
            if(item.likeOrNot == 0){
                item.likes++;
                item.likeOrNot = 1;
                // this.likepost(item,1,this)
                this.$axios.post("/star/handleLike",{
                        commentid:item.commentid,
                        upDown:1
                    }).then(async res=>{
                        this.$toast.success('点赞成功');
                        await this.refresh();
                    }).catch(err=>{
                        console.log(err)
                        this.$toast.fail('点赞失败');
                })
            }
            else return ;

        },
        // likepost:debounce((item,flag,th)=>{
        //     console.log(2222)
        //     if(flag){
        //         th.$axios.post("/star/handleLike",{
        //                 commentid:item.commentid,
        //                 upDown:1
        //             }).then(async res=>{
        //                 console.log("+")
        //                 item.likes++;
        //                 item.likeOrNot = 1;
        //                 // this.cancelLike();
        //                 await th.refresh();
        //             }).catch(err=>{
        //                 console.log(err)
        //         })
               
        //     }
        //     else{
        //         th.$axios.post("/star/handleLike",{
        //                 commentid:item.commentid,
        //                 upDown:0
        //             }).then(async res=>{
        //                 item.likes--; 
        //                 item.likeOrNot = 0;
        //                 // this.cancelLike();
        //                 await th.refresh();
        //             }).catch(err=>{
        //                 console.log(err)
        //             }) 
        //     }
            
        // },400),
        refresh(){
            this.topic = JSON.parse(localStorage.planet);
            // console.log(this.topic.bgPic.slice(0,3))
            // console.log(this.topic.bgPic)
             
            if(this.topic.bgPic.slice(0,3) == "url"){
                this.$refs.background.style.backgroundImage = `${this.topic.bgPic}` 
            }
            else{
                this.$refs.background.style.backgroundImage = `url(${this.topic.bgPic})`
            }
            // console.log(this.$refs.background.style.backgroundImage)
            this.$axios.get(`star/showStar?uuid=${localStorage.planetUid}`).then(res=>{
                console.log(res)
                this.comment = this.handleTopicData(res.data.result);
                console.log(this.comment)
            }).catch(err=>{
                console.log(err)
            })
        }
        
    },
     mounted(){
        //  console.log(bounce)\
        // window.addEventListener("click",bounce(this.like(),500))
        this.refresh();
    },
    watch:{
        $route(to,from){
            if(to.name == "planetTopic"){
                this.refresh();
            }
            
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
    .blur{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #00000024;
        top: 0;
        left:0;
    }
    .topicBackground{
        width: 100%;
        height: 28vh;
        background: url(../assets/background.png);
        background-size:  100% auto;
        background-repeat: no-repeat;
        background-position: 22% 20%;
        position: relative;
    }
    .back{
        width:30px;
        height: 30px;
        position: absolute;
        top: 20px; 
        background: url(../assets/backWhite.png) no-repeat;
        background-size:30px 30px;
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
        height: 72vh;
        width: 100%;
        position: relative;
        background: #F2F2F2;

    }
    .comment-area{
        width: 100%;
        height:80vh; 
        /* background: blue; */
        position: relative;
        top: -80vh;   
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
        /* overflow: hidden; */
        width: 14%;
        height: 100%;
        display: inline-block;
        border-radius:50%;
        /* background: blue; */
        margin-left: 25px;
        margin-top: 15px;
    }
    .avator img{
        border-radius:50%;
    }
    .sex{
        display: inline-block;
        width: 15px;
        height:15px;
        margin-left: -7px;
        vertical-align: middle;
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
    .likeCount img{
        width:15px;
        height: 15px;
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