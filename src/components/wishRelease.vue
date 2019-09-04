<template>
    <div class="wish-release">
        <div class="top">
            <div class="left">
                <img :src="backImg" alt="" class="back">
                <span class="title">{{title}}</span>
            </div>
            <div class="release-button" @click="release">{{buttonText}}</div>
        </div>
        <div class="edit-area">
            <div class="wish-area">
                <textarea name="" id="wish" cols="30" rows="10" :placeholder="wishPHold" v-model="sendData.text"></textarea>
            </div>
        </div>
        <div class="more-choose">
            <div class="campus" @click="showCampus">
                <img :src="icon.campus" alt="">
                <span>{{chooseText[0]}}</span>
            </div>
            <van-popup v-model="showCampusPicker" position="bottom">
                 <van-picker 
                 :columns="campus" 
                 @change="changeCampus" 
                 style="width:100%"
                 />
            </van-popup>
           
            <div class="wish-type" @click="showType">
                <img :src="icon.wishType" alt="">
                <span>{{chooseText[1]}}</span>
            </div>
            <van-popup v-model="showTypePicker" position="bottom">
                 <van-picker 
                 :columns="wishType" 
                 @change="changeType" 
                 style="width:100%"
                 />
            </van-popup>
            <div class="anonymous">
                <div class="check-box" @click="checkclick" ref="check"></div>
                <span>{{chooseText[2]}}</span>
            </div>
        </div>
        <div class="contact">
            <div class="contact-edit">{{contactText[0]}}</div>
            <div class="tips">
                <p>TIPS: {{contactText[1]}}</p>
                <p class="p2">{{contactText[2]}}</p>
                <p class="p3">{{contactText[3]}}</p>
            </div>
        </div>
    </div>
</template>

<script>
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
            campus:["大学城","龙洞","东风路"],//选择校区的选项
            showTypePicker:false,//是否显示心愿类型选项
            wishType:["事务","委托","其他"],//选择心愿类型的选项


            //联系栏
            contactText:[
                "填写联系方式（选填）",
                "1. 正确填写联系方式有利于领取愿望的人找到你哟",
                "2. 只有领取愿望的人才能看到你的联系方式，你的",
                "联系方式并不会出现在首页"

            ],
            show:false,

            //要发送的数据
            sendData:{
                text:"",//心愿内容
                campus:"",//校区
                type:"",//心愿内容
                anonymous:false,//是否匿名
                address:"",//地址

            }
        }
    },
    methods:{
        release(){
            
        },
        checkclick(){//checkbox切换状态
            this.checked = !this.checked;
            this.sendData.anonymous = this.checked;
            console.log(1)
        },
        showCampus(){//显示校区选项
            this.showCampusPicker = true;
        },
        changeCampus(picker, value, index){//更改校区选项
            this.sendData.campus = this.chooseText[0] = value;
        },
        showType(){//显示心愿类型选项
            this.showTypePicker = true;
        },
        changeType(picker, value, index){//更改校区选项
            this.sendData.type = this.chooseText[1] = value;
        },
    },
    watch:{
        checked(val){
            if(val){
                this.$refs.check.classList.add("checked-box");
            }
            else{
                this.$refs.check.classList.remove("checked-box");
            }
        }
    }
}
</script>

 <style scoped>
    *{
        font-family: "微软雅黑"
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
        min-width: 80px;
    }
    .check-box{
        width:13px;
        height: 13px;
        border-radius:2px;
        position: absolute;
        top:3px;
        margin-left:2px;
        background: #FFC4C4;
        
    }
    .checked-box::after{
        content: "✔";
        position: absolute;
        left:2px;
    }
    .anonymous span{
        /* display: inline-block; */
        position: absolute;
        top:3px;
        right:0;
    }


    /* 联系栏 */
    .contact-edit{
        font-size:12px;
        color:#B8B8B8;
        margin-left:15px;
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
 