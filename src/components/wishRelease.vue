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
                <textarea name="" id="wish" cols="30" rows="10" :placeholder="wishPHold"></textarea>
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
            wishPHold:"快来许下你的女生节小心愿吧 ~"//编写心愿处的placeholder
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
        padding:6vw 4vw 3vw 4vw;
    }
    .wish-area textarea::placeholder{
        color:#B8B8B8;
    }
 </style>
 