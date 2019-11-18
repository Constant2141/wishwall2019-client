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
                <input type="text" placeholder="#发布话题" maxlength="18" v-model="sendData.title" @blur="blur">
            </div>
            <div class="message-area">
                <textarea name="" id="wish" cols="30" rows="10" :placeholder="wishPHold" v-model="sendData.comment" @blur="blur" maxlength="40"></textarea>
            </div>    
        </div>
        <div class="upload">
            <van-uploader 
            v-model="sendData.bgPic"
            :after-read="afterRead" 
            multiple
            preview-size="50px"
            :max-count="1"
            accept="image/*"/>
            <div class="upload-prompt" style="height:50px">添加话题封面</div>
        </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/debounce.js"
import { compress } from "@/utils/compress.js"
export default {
    data(){  
        return {
            //顶部栏变量
            backImg: require("../assets/back.png"),//返回键
            title: "发布话题",//页面标题
            buttonText:'发布',//发布按钮


            //编辑栏变量
            wishPHold:"话题内容(限制为40个字)",//编写话题内容处的placeholder

            //要发送的 数据
            sendData:{
                title:"",
                comment:"",
                bgPic:[]
            }
        }
    },
    methods:{
        back(){//退回上一页
            this.$router.go(-1);
        },
        blur(){//文本框失焦后复位
            window.scrollTo(0,0)
        },
         afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            console.log(this.sendData.bgPic);
        },
        release:debounce(async function(){
            // console.log(this.sendData)
            if(this.sendData.title == ""){
                this.$dialog.alert({
                    message:"话题不可为空"
                })
            }
            else if(this.sendData.comment == ""){
                this.$dialog.alert({
                    message:"话题内容不可为空"
                })
            }
            else{
                let data = new FormData();
                data.append("title",this.sendData.title);
                data.append("comment",this.sendData.comment);
                console.log(this.sendData.bgPic)
                if(this.sendData.bgPic.length != 0){
                    await compress(this.sendData.bgPic[0].file,(file)=>{
                        console.log(file)
                        data.append("bgPic",file)
                        this.$axios.post("/star/create",data).then(res=>{
                        // console.log(1)
                        this.sendData.title = "";
                        this.sendData.comment = "";
                        this.$toast.success('发布成功');
                        this.$router.go(-1);
                        // console.log(res);
                        }).catch(err=>{
                            console.log(err);
                            this.$toast.success('发布失败');
                        })
                    }); 
                    // data.append("bgPic",this.sendData.bgPic[0].file)   

                }
                else{
                     this.$axios.post("/star/create",data).then(res=>{
                        // console.log(1)
                        this.sendData.title = "";
                        this.sendData.comment = "";
                        this.$toast.success('发布成功');
                        this.$router.go(-1);
                        // console.log(res);
                        }).catch(err=>{
                            console.log(err);
                            this.$toast.success('发布失败');
                        })
                }
                
            }
        },1000)
    }
}
</script>

<style scoped>
    *{
        font-family: "微软雅黑"
    }
    .plantRelease{
        background: #F5F5F5;
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
    .topic-area input{
        border:none;
        width: 92vw;
        height: 21px;
        padding:2vw 4vw 1vw 4vw;
    }
    .topic-area input::placeholder{
        color:#B8B8B8;
        letter-spacing: 1px;
    }
    .message-area textarea{
        border:none;
        width:92vw;
        height:40vw;
        padding:5vw 4vw 3vw 4vw;
        outline: none;
    }
    .message-area textarea::placeholder{
        color:#B8B8B8;
    }

    /* 上传封面 */
    .upload{
        box-shadow: rgba(0,0,0,0.16) 0 3px 6px;
        background: #ffffff;
    }
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
        /* min-height:50px; */
        line-height: 50px !important;
        font-size: 14px;
        vertical-align: top;
        color: #B8B8B8;
    }
</style>