<template>
  <div class="planet-comment">
    <div class="topic">
      <div class="back" @click="back"></div>
      <div class="content-area">
          <div class="avator">
              <img :src="user.image" alt="" width="48" height="48" >
          </div>
          
          <div class="content-right">
              <div class="username">{{user.name}}</div>
              <div class="date">{{user.date}}</div>
              <div class="time">{{user.time}}</div>
              <div class="content">{{user.message}}</div>
          </div>
      </div>
      <div class="function-area">
          <div class="likeCount">
                <img src="../assets/like.png" alt="">
                <div>{{user.likeCount}}</div>
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
        <div class="comment-detail" v-for="(item,index) in comment" :key="index">
          <div class="comment-avator">
            <img :src="item.image" alt="" width="35" height="35">
          </div>
          <div class="comment-detail-content">
            <div class="detail-top">
              <div class="comment-username">{{item.name}}</div>
              <div class="time-set">
                <div class="comment-date">{{item.date}}</div>
                <div class="comment-time">{{item.time}}</div>
              </div>
            </div>
            <div class="detail-content">{{item.message}}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="publish">
      <input type="text" name="" id="" placeholder="你想对ta说些什么吗...">
      <div class="publish-button">发表</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        image:require("../assets/NWlogo.png"),
        name:"jio",
        date:"7/22",
        time:"17:30",
        message:"喜欢巨辣汤呢，你们呢",
        likeCount:115
      },


      commentCount:115,
      comment:[
        {
          image:require("../assets/NWlogo.png"),
          name:"两碗",
          date:"7/22",
          time:"17:30",
          message:"我也喜欢",
        },
        {
          image:require("../assets/NWlogo.png"),
          name:"两碗",
          date:"7/22",
          time:"17:30",
          message:"我也喜欢dsadsadsasssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
        },
        {
          image:require("../assets/NWlogo.png"),
          name:"两碗",
          date:"7/22",
          time:"17:30",
          message:"我也喜欢",
        },
        {
          image:require("../assets/NWlogo.png"),
          name:"两碗",
          date:"7/22",
          time:"17:30",
          message:"我也喜欢",
        },
      ]
    }
  },

  methods:{
    back(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>
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

    /* 话题 */
    .topic{
      width: 330px;
      height: 111px;
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
    .likeCount,.likeCount img,.likeCount div{
        display: inline-block;
        vertical-align: top;
    }
    .likeCount{
        margin-left: 265px;
        margin-right:4px;
        margin-top: 3px;
    }
    .likeCount div{
        transform: scale(0.9)
    }


    /* 评论 */
    .comment{
      width:330px;
      min-height: 200px;
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
      margin-left:7%;
      /* background: blue; */
    }
    .comment-detail:last-child{
      padding-bottom:20px;
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