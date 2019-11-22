<template>
    <div class="wish-release">
        <div class="wrap">
            <div class="top">
                <div class="left" @click="back">
                    <img :src="backImg" alt="" class="back">
                    <span class="title">{{title}}</span>
                </div>
                <div class="release-button" @click="release">{{buttonText}}</div>
            </div>
            <div class="edit-area">
                <div class="wish-area">
                    <textarea name="" id="wish" cols="30" rows="10" :placeholder="wishPHold" v-model="sendData.wish_content" @blur="blur"></textarea>
                </div>
            </div>
            <div class="more-choose">
                <div class="campus" @click="showCampus">
                    <img :src="icon.campus" alt="">
                    <span>{{chooseText[0]}}</span>
                </div>
                <van-popup v-model="showCampusPicker" position="bottom">
                    <van-picker 
                    show-toolbar
                    :columns="campus" 
                    @change="changeCampus" 
                    style="width:100%"
                    @cancel="CancelPickCampus"
                    @confirm="ConfirmPickCampus"
                    />
                </van-popup>
            
                <div class="wish-type" @click="showType">
                    <img :src="icon.wishType" alt="">
                    <span>{{chooseText[1]}}</span>
                </div>
                <van-popup v-model="showTypePicker" position="bottom">
                    <van-picker 
                    show-toolbar
                    :columns="wishType" 
                    @change="changeType" 
                    style="width:100%"
                    @cancel="CancelPickType"
                    @confirm="ConfirmPickType"
                    />
                </van-popup>
                <div class="anonymous" @click="checkclick">
                    <div class="check-box"  ref="check"></div>
                    <span class="anonymous-text">{{chooseText[2]}}</span>
                </div>
            </div>
            <div class="contact" >
                <div>
                    <textarea type="text" class="contact-edit" @click="editContact" placeholder="填写联系方式（选填）" cols="3" rows="3"  v-model="sendData.contact" @blur="blur"></textarea>
                </div>
                <div class="tips">
                    <p>TIPS: {{contactText[1]}}</p>
                    <p class="p2">{{contactText[2]}}</p>
                    <p class="p3">{{contactText[3]}}</p>
                </div>
            </div>
        </div>
        
        <!-- <van-dialog
        v-model="showContact"
        title="填写联系方式"
        show-cancel-button
        @confirm="confirm"
        >
        <textarea name="" id="" cols="30" rows="10" class="contact-content" placeholder="请填写联系方式~" v-model="sendData.contact"></textarea>
        </van-dialog> -->
    </div>
</template>


<script>
import { debounce } from "@/utils/debounce.js"

export default {
    name: "wish-release",//发布心愿的编辑页
    data(){
        return {
            //顶部栏变量
            backImg: require("../assets/back.png"),//返回键
            title: "发布心愿",//页面标题
            buttonText:'发布',//发布按钮


            //编辑栏变量
            wishPHold:"快来许下你的女生节小心愿吧 ~",//编写心愿处的placeholder

            //选择栏
            icon:{
                campus:require("../assets/release/SchoolSelect.png"),
                wishType:require("../assets/release/WishType.png"),
            },
            chooseText:[
                "选择校区",
                "选择心愿类型",
                "匿名（可选）"
            ],
            checked:false,//判断是否匿名发布  
            showCampusPicker:false,//是否显示校区选项
            campus:["大学城校区","龙洞校区","东风路校区"],//选择校区的选项
            showTypePicker:false,//是否显示心愿类型选项
            wishType:["实物","委托","其他"],//选择心愿类型的选项


            //联系栏
            contactText:[
                "填写联系方式（选填）",
                "1. 正确填写联系方式有利于领取愿望的人找到你哟",
                "2. 只有领取愿望的人才能看到你的联系方式，你的",
                "联系方式并不会出现在首页"

            ],
            showContact:false,

            //要发送的数据
            sendData:{
                wish_content:"",//心愿内容
                wish_where:"",//校区
                wish_type:"",//心愿类型
                anonymous:false,//是否匿名
                contact:"",//地址
            }
        }
    },
    methods:{
        editContact(){
            // 触发联系方式填写框
            // console.log(1)
            // this.showContact = true;
        },
        back(){//退回上一页
            this.$router.go(-1);
        },
        blur(){//文本框失焦后复位
            window.scrollTo(0,0)
        },
        reset(){//将选项复位
            this.sendData.wish_content = "";//心愿内容
            this.sendData.wish_where = "",//校区
            this.sendData.wish_type = "",//心愿类型
            this.$refs.check.classList.remove("checked-box");//匿名选项复位
            this.sendData.anonymous = false,//是否匿名
            this.sendData.contact = "",//地址
            this.chooseText = [//选项复原
                "选择校区",
                "选择心愿类型",
                "匿名（可选）"
            ];

        },
        release:debounce(function(){
            // 向后台发送数据
            // console.log(localStorage.getItem('token'))
            if(this.sendData.wish_content == ''){
                this.$dialog.alert({
                    message:"愿望内容不可为空"
                })
            }
            else if(this.sendData.wish_where == ''){
                this.$dialog.alert({
                    message:"校区不可为空"
                })
            }
            else if(this.sendData.wish_type == ''){
                this.$dialog.alert({
                    message:"心愿类型不可为空"
                })
            }
            else{
                this.$axios.post('wish/create',this.sendData).then(res =>{
                    console.log(res)
                    this.$toast.success('发布成功');
                    this.reset();//将选项等东西复位
                    this.$router.go(-1);
                }).catch(err =>{
                    console.log(err)
                    this.$dialog.alert({
                        message:'发布失败喔'
                    })
                })
            }
            
        },1000),
        confirm(){
            // 确认联系方式
            if(this.sendData.contact != ''){
                this.contactText[0] = "联系方式："+ this.sendData.contact;
            }
            else{
                this.$dialog.alert({
                    message:"联系方式为空！"
                })
            }
        },
        checkclick(){//checkbox切换状态
            this.checked = !this.checked;
            this.sendData.anonymous = this.checked;
            // console.log(1)
        },
        


        showCampus(){//显示校区选项
            this.showCampusPicker = true;
        },
        changeCampus(picker, value, index){//更改校区选项
            this.sendData.wish_where = this.chooseText[0] = value;
        },
        ConfirmPickCampus(val,index){
            this.sendData.wish_where = this.chooseText[0] = val;
            this.showCampusPicker = false;
        },
        CancelPickCampus(){
            this.sendData.wish_where  = '';
            this.chooseText[0] = '选择校区'
            this.showCampusPicker = false;
        },



        showType(){//显示心愿类型选项
            this.showTypePicker = true;
        },
        changeType(picker, value, index){//更改心愿类型选项
            this.sendData.wish_type = this.chooseText[1] = value;
        },
        ConfirmPickType(val,index){
            this.sendData.wish_type = this.chooseText[1] = val;
            this.showTypePicker = false;
        },
        CancelPickType(){
            this.sendData.wish_type = '';
            this.chooseText[1] = '选择心愿类型'
            this.showTypePicker = false;
        }
    },
    watch:{
        checked(val){
            if(val){
                // 选择匿名选项
                this.$refs.check.classList.add("checked-box");
                this.sendData.anonymous = true;
            }
            else{
                // 取消匿名选项
                this.$refs.check.classList.remove("checked-box");
                this.sendData.anonymous = false;
            }
        }
    }
}
</script>

 <style scoped>
    *{
        font-family: "微软雅黑"
    }
    .wish-release{
        height:100vh;
    }
    .wrap{
        background: white;
    }
    /* 顶部栏的样式 */
    .top{
        width:100%;
        height: 12vw;
        position: relative;
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
    .wish-area textarea{
        border:none;
        width:92vw;
        height:40vw;
        padding:5vw 4vw 3vw 4vw;
        outline: none;
    }
    .wish-area textarea::placeholder{
        color:#B8B8B8;
    }


    /* 选择栏样式 */
    .more-choose{
        width:100%;
        height:10vw;
        font-size: 10px;
        position: relative;
    }
    .more-choose div{
        display: inline-block;
    }
    .more-choose > div > img{
        width:19px;
        height:18px;
        margin-left:16px;
        margin-right: 3px;
    }
    .more-choose > div > span{
        vertical-align: super;
    }
    .anonymous{
        float:right;
        position: relative;
        right:15px;
        min-width: 90px;
        min-height: 20px;
        padding-top: 1.4px;
    }
    .check-box{
        width:13px;
        height: 13px;
        border-radius:2px;
        position: absolute;
        top:3px;
        margin-left:2px;
        background: #9BC5FD;
        
    }
    .checked-box::after{
        content: "✔";
        position: absolute;
        left:2px;
    }
    .anonymous-text{
        display: inline-block;
        /* vertical-align: middle !important; */
    }
    .anonymous span{
        /* display: inline-block; */
        margin-left: 18px;
    }


    /* 联系栏 */

    .contact-edit{
        font-size:12px;
        margin-left:15px;
        width: 80vw;
        border:none;
        font-size: 14px;
        word-wrap:break-word;
        /* height: 20px; */
        /* min-height: 20px; */
        overflow: visible;
    }
    .contact-edit::placeholder{
        color:#B8B8B8;
    }
    .contact-content{
        border:none;
        width:80%;
        height:40vw;
        padding:7vw 8vw 3vw 8vw;
        outline: none;
    }
    .contact-content::placeholder{
        font-size: 13px;
    }
    .tips{
        margin-top: 10px;
        font-size:10px;
        color:#B8B8B8;
        margin-left:15px;
    }
    .tips p{
        letter-spacing: 0.5px;
        margin-top:1px;
    }
    .p2{
        margin-left: 29px;
    }
    .p3{
        margin-left:42px;
    }
 </style>
 