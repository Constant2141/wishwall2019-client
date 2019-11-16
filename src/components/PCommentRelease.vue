<template>
  <div class="plantRelease">
      <div class="top">
            <div class="left" @click="back">
                <img :src="backImg" alt="" class="back">
                <span class="title">{{title}}</span>
            </div>
            <div class="release-button" @click="release">{{buttonText}}</div>
        </div>
        <div class="edit-area">
            <div class="topic-area">
                <div class="topic"># {{topic}}</div>
            </div>
            <div class="message-area">
                <textarea name="" id="wish" cols="30" rows="10" :placeholder="wishPHold" v-model="sendData.comment"></textarea>
            </div>    
        </div>
  </div>
</template>

<script>

import { debounce } from "@/utils/debounce.js"
export default {
    data(){  
        return {
            //顶部栏变量
            backImg: require("../assets/back.png"),//返回键
            title: "参与讨论",//页面标题
            buttonText:'发布',//发布按钮

            // 话题名
            topic:"#海底捞最喜欢什么火锅底料",


            //编辑栏变量
            wishPHold:"话题内容",//编写话题内容处的placeholder


            //要发送的数据
            sendData:{
                conmment:"",//发布的评论内容
                uuid:"",//星球话题的uuid
            }
        }
    },
    methods:{
        back(){//退回上一页
            this.$router.go(-1);
        },
         afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        },
        release:debounce(function(){
            this.sendData.uuid = localStorage.planetUid;
            this.$axios.post("/star/addComment",this.sendData).then(res=>{
                console.log(res);
                this.sendData.comment = "";
                this.$toast.success('发布成功');
                this.$router.go(-1);
            }).catch(err=>{
                console.log(err)
                this.$toast.success('发布失败');
            })
        },1000),
        refreshTopic(){
            console.log(JSON.parse(localStorage.planet))
            this.topic = JSON.parse(localStorage.planet).title
        }
    },
    mounted(){
        this.refreshTopic();
    },
    watch:{
        $route(to,from){
            // console.log(1)
            this.refreshTopic();
        }
    }

}
</script>

<style scoped>
    *{
        font-family: "微软雅黑"
    }
    .plantRelease{
        background: #F5F5F5;
        height: 100vh;
        width: 100vw;
        overflow-x: hidden;
    }



    /* 顶部栏的样式 */
    .top{
        width:100%;
        height: 12vw;
        position: relative;
        background: #ffffff;
    }
    .left{
        margin-top: 4vw;
        display: inline-block;
    }
    .left > img{
        width:5.2vw;
        height:5.2vw;
        margin-left:3vw;
        vertical-align: text-bottom;
        display: inline-block;
    }
    .title{
        display: inline-block;
        margin-left: 2vw;
        font-size: 18px;
        /* padding-top: .5vw; */
    }
    .release-button{
        display: inline-block;
        position: absolute;
        right:5vw;
        top:4.3vw;
    }



    /* 编辑栏样式 */
    .edit-area{
        width: 100vw;
        height:56vw;
       
    }
    .topic-area{
        background: #ffffff;
    }
    .topic{
        color:#B8B8B8;
        letter-spacing: 1px;
        width: 100%;
        line-height: 52px;
        font-size: 12px;
        padding-left: 4vw;

    }
    .message-area textarea{
        border:none;
        width:92vw;
        height:40vw;
        padding:5vw 4vw 3vw 4vw;
        outline: none;
        box-shadow: rgba(0,0,0,0.16) 0 3px 6px;
    }
    .message-area textarea::placeholder{
        color:#B8B8B8;
        font-size:12px;
    }

    /* 上传封面 */
    .van-uploader{
        margin-left: 10px;
    }
    .van-uploader >>> .van-uploader__upload{
        width:40px;
        height:40px;
        border: none;
    }
    .van-uploader >>> .van-uploader__upload-icon{
        color: #FFC4C4;
    }
    .upload-prompt{
        display: inline-block;
        width:50vw;
        line-height: 40px;
        font-size: 14px;
        vertical-align: top;
        color: #B8B8B8;
    }
</style>