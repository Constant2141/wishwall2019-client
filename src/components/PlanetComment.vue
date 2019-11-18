<template>
  <div class="planet-comment">
    <div class="loading" v-if="show">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
          


    <div class="topic">
      <div class="back" @click="back"></div>
      <div class="content-area">
          <div class="avator">
              <img :src="user.headimgurl" alt="" width="43" height="43" >
          </div>
          
          <div class="content-right">
              <div class="username">{{user.nickname}}</div>
              <img :src="user.sex==2?girlImg:boyImg" alt="" class="sex">
              <div class="date">{{user.date}}</div>
              <div class="time">{{user.time}}</div>
              <div class="content">{{user.comment}}</div>
          </div>
      </div>
      <div class="function-area">
          <div class="likeCount" @click="like(user,$event)">
                <img :src="user.likeOrNot?likedImg:likeImg" alt="">
                <div>{{user.likes}}</div>
          </div>
      </div>
    </div>  
    <div class="comment">
      <div class="comment-top">
        <div class="top-name">评论</div>
        <div class="comment-count">
          <img src="../assets/comment2.png" alt="">
          <div>{{commentCount}}</div>
        </div>
      </div>
      <div class="comment-list">
        <div class="no-comment" v-if="nocomment">暂无评论</div>
        <div class="comment-detail" v-for="(item,index) in comment" :key="index">
          <div class="comment-avator">
            <img :src="item.headimgurl" alt="" width="35" height="35">
          </div>
          <div class="comment-detail-content">
            <div class="detail-top">
              <div class="comment-username">{{item.nickname}}</div>
              <img :src="item.sex==2?girlImg:boyImg" alt="" class="sex2">
              <div class="time-set">
                <div class="comment-date">{{item.date}}</div>
                <div class="comment-time">{{item.time}}</div>
              </div>
            </div>
            <div class="detail-content">{{item.comment}}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="publish">
      <input type="text" name="" id="" placeholder="你想对ta说些什么吗..." v-model="input" @blur="blur">
      <div class="publish-button" @mousedown="release">发表</div>
    </div>

    
  </div>
</template>

<script>

import { debounce } from "@/utils/debounce.js";
export default {
  data(){
    return {
      user:{
      },


      commentCount:115,
      comment:[
        
      ],
      nocomment:true,//是否展示暂无评论信息

      input:"",//发表内容

      likeImg:require("../assets/like.png"),
      likedImg:require("../assets/liked.png"),
      girlImg:require("../assets/girl.png"),
      boyImg:require("../assets/boy.png"),

      banLike:false,

      show : true,//loading界面是否展示
    }
  },

  methods:{
    back(){
      this.$router.go(-1);
    },
    blur(){//文本框失焦后复位
        window.scrollTo(0,0)
    },
    handleTopicData(i){
      //处理日期
      if(i instanceof Array){
        return i.map(item=>{
                return i = {
                    ...item,
                    date:item.createdAt.slice(item.createdAt.indexOf("-")+1,item.createdAt.indexOf(" ")).replace("-","/"),
                    time:item.createdAt.slice(item.createdAt.indexOf(" ")+1)
                }
            })
      }
      else{
        return i = {
            ...i,
            date:i.createdAt.slice(i.createdAt.indexOf("-")+1,i.createdAt.indexOf(" ")).replace("-","/"),
            time:i.createdAt.slice(i.createdAt.indexOf(" ")+1)
        }
      }
        
    },
        async like(item,event){//点赞
            event.stopPropagation();//点赞时不需要路由跳转
            if(item.likeOrNot == 0){
              item.likes++;
              item.likeOrNot = 1;
              // this.likepost(item,1,this)
              this.$axios.post("/star/handleLike",{
                      commentid:item.commentid,
                      upDown:1
                  }).then(async res=>{
                      this.$toast.success('点赞成功');
                      await this.refresh(true);
                  }).catch(err=>{
                      console.log(err)
                      this.$toast.fail('点赞失败');
              })
            }
            else return ;
            
        },

    release(){//发表评论
      console.log(1)
      if(this.input != ""){
        let data = {
          comment:this.input,
          commentid:this.user.commentid,
          openid:JSON.parse(localStorage.comment).openid
        }
        console.log(data)
        this.$axios.post("/star/addComment",data).then(res=>{
          this.$toast.success('发布成功');
          this.input = "";
          this.refresh();
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    refresh(flag = false){
      // 更新数据
      this.show = true;
      if(!flag){
        //重新赋值要评论的评论
        this.user = this.handleTopicData(JSON.parse(localStorage.comment)
        )};
      console.log(this.user)
      this.$axios.get(`/star/showComment?commentid=${JSON.parse(localStorage.comment).commentid}`).then(res=>{
        this.comment = this.handleTopicData(res.data.result);
        this.commentCount = this.comment.length;
        console.log(this.comment)
        console.log(res);
        if(this.commentCount <= 0){
          this.nocomment = true;
        }
        else {
          this.nocomment = false;
        }
        this.show = false;
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted(){
    // console.log(JSON.parse(localStorage.comment))
    this.refresh();

  },
  watch:{
    $route(to,from){
      console.log(to)
      this.comment = [];
      if(to.name == "planetcomment"){
          console.log(1)
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
    .planet-comment{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: #F8F8F8;
    }


    /* loading */
  .loading{
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width:100vw;
      background: #5c5757ba;
      z-index: 100;
    }

    /* 话题 */
    .topic{
      width: 330px;
      min-height: 111px;
      max-height:150px;
      background: #ffffff;
      box-shadow: rgba(0,0,0,0.16) 0 3px 6px;
      border-radius: 7px;
      margin-left: 23px;
      margin-top: 29px;
      position: relative;
        margin-bottom: 10px;
    }
    .back{
      width: 27px;
      height: 27px;
      border-radius: 100%;
      position: absolute;
      background: #FFCBCB no-repeat;
      box-shadow: rgba(0,0,0,0.16) 0 3px 6px;
      left: -13px;
      top: -13px;
      background-image: url(../assets/backWhite.png);
      background-size:20px 20px;
      background-position: center;
    }
    .comment-area{
        width: 100%;
        height: 528px; 
        /* background: blue; */
        position: relative;
        top: -528px;   
        overflow: scroll;
    }
    .sex{
        display: inline-block;
        width: 15px;
        height:15px;
        margin-left: -7px;
        vertical-align: middle;
    }
    .sex2{
        display: inline-block;
        width: 15px;
        height:15px;
        /* margin-left: -7px; */
        vertical-align: bottom;
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
        /* background: blue; */
        margin-left: 25px;
        margin-right:5px;
        margin-top: 15px;
    }
    .avator img{
      border-radius: 100%;
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
    .likeCount,.likeCount img,.likeCount div{
        display: inline-block;
        vertical-align: top;
    }
    .likeCount img{
      width: 15px;
      height: 15px;
    }
    .likeCount{
        position: absolute;
        right: 27px;
    }
    .likeCount div{
        transform: scale(0.9)
    }


    /* 评论 */
    .comment{
      width:330px;
      min-height: 150px;
      margin-left: 22.5px;
      background: #ffffff;
      border-radius: 7px;
      box-shadow: rgba(0,0,0,0.16) 0 3px 6px;
      position: relative;
    }
    .comment-top{
      width:100%;
      margin-bottom:20px;
    }
    .comment-top div{
      display: inline-block;
      margin-top:25px;
    }
    .top-name{
      color: #707070;
      font-size: 12px;
      margin-left:25px;
    }
    .comment-count{
      position: absolute;
      right:27px;
      margin:0 !important;
    }
    .comment-count div{
      font-size: 12px;
      transform: scale(0.9);
      vertical-align: super;
    }
    .comment-list{
      width:84%;
      min-height:20px;
      max-height:320px;
      overflow: scroll;
      margin-left:7%;
      /* background: blue; */
    }
    .no-comment{
      font-size:13px;
      line-height: 70px;
      /* letter-spacing: 1px; */
      text-align: center;
      color: inherit
    }
    .comment-detail:last-child{
      padding-bottom:20px;
      border-bottom:none !important;
    }
    .comment-detail{
      min-height: 45px;
      border-bottom:1px solid #E8E8E8;
      margin-top: 10px;
    }
    .comment-detail > div{
      display: inline-block;
      vertical-align: top;
    }
    .comment-avator{
      width:15%;
      /* min-height: 100%; */
    }
    .comment-avator img{
      border-radius: 50%;
      /* background: blue; */
    }
    .comment-detail-content{
      width:80%;
      position: relative;
      left: -5px;
      /* min-height: 100%; */
      font-size: 12px;
      transform: scale(0.9);
      color:#777777;
    }
    .time-set{
      position: absolute;
      right: -23px;
      top: 1px;
    }
    .detail-top{
      height: 20%;
      margin-bottom: 5px;
      width:100%;
    }
    .detail-top div{
      display: inline-block;
    }
    .detail-content{
      width: 100%;
      /* height: 80%; */
      word-break: break-all;
      margin-bottom:15px; 
    }


    .publish{
      width: 100%;
      height:40px;
      background: #fafafa;
      position:fixed;
      bottom: 0;
    }    
    .publish input{
      width:65%;
      height:22px;
      margin-top: 9px;
      border:none;
      margin-left:22px;
      border-radius:4px;
      padding-left:10px;
      word-break: break-all;
      display: inline-block;
      font-size: 12px;
    }
    .publish input::placeholder{
      font-size: 12px;
      color:#A5A5A5;
    }
    .publish-button{
      width:66px;
      line-height:25px;
      display: inline-block;
      color:white;
      border-radius:15px;
      text-align: center;
      font-size: 12px;
      margin-left: 7px;
      background: linear-gradient(to right bottom,#FD9BBF,#FDE8B7)
    }
</style>