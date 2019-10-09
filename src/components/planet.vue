<template>
  <div class="planet">
      <div class="background"></div>
      <div class="search">
          <input type="text" class="search-bar" placeholder="点击搜索" @focus="changePage">
      </div>
      <div class="TopicArea" v-show="!showSearch">
          <div class="message-bar">
            <div class="message">
                10条更新！
            </div>
            <div class="changeSort">
                <!-- <van-dropdown-item v-model="value1" :options="" /> -->
                    <van-dropdown-menu >
                        <van-dropdown-item v-model="value1" :options="option1" />
                    </van-dropdown-menu>
            </div>
        </div>
        <div class="content">
            <div class="col">
                <div class="item2"></div>
                <div class="item1"></div>
                <div class="item1"></div>
            </div>
            <div class="col">
                <div class="item1"></div>
                <div class="item2"></div>
                <div class="item2"></div>
            </div>
        </div>
      </div>
      
      <div class="SearchArea" v-show="showSearch">
          <p>热门</p>
          <div class="HotSearch">
              <div class="SearchLabel" v-for="(item,index) in searchLabel" :key="index">
                <span>{{item}}</span>
              </div>
          </div>

      </div>

  </div>
</template>

<script>
export default {
    data(){
        return {
            // 通知栏
            msgCount:0,
            msgAfter:"条更新！",
            value1:0,
            option1: [
                { text: '最新', value: 0 },
                { text: '最热', value: 1 }
            ],

            showSearch:true,//是否显示搜索区域
            searchLabel:[
                "#海底捞最喜欢什么火锅底料",
                "#我想要不知火",
                "#云顶之弈全新版本",
                "#庆义肾透支真相",
                "艹骏为何如此之骚"
            ]
        }
    },
    methods:{
        search(){//搜索功能

        },

        changePage(){
            this.showSearch = true;
        }
    }
}
</script>

<style scoped>
    *{
        margin:0;
        padding:0;
    }
    .planet{
        width:100%;
        /* background:linear-gradient(to bottom right,#FD9CBF,#FFF8C9); */
    }
    .background{
        width:100%;
        height:95vh;
        position: fixed;
        z-index:-100;
        background:linear-gradient(to bottom right,#FD9CBF,#FFF8C9);
    }


    /* 搜索栏 */
    .search{
        width:100%;
        height:46px;
        /* background:blue; */
    }
    .search-bar{
        width:252px;
        height: 24px;
        margin-left:61.5px;
        position: relative;
        top:11px;
        border-radius:15px;
        outline: none;
        border:none;
        padding-left: 26px;
        font-size: 12px;
        box-sizing: border-box;
        background: url(../assets/search.png) no-repeat #ffffff;
        background-position: 9px 5.5px;
    }
    .search-bar::placeholder{
        position: relative;
        left: 80px;
    }

    /* 通知栏 */
    .message-bar{
        width:100%;
        height: 30px;
        position: relative;
        /* background:blue; */
    }
    .message{
        margin-left: 31px;
        width:80px;
        height:20px;
        background:url(../assets/notice.png) no-repeat;
        font-size: 12px;
        color:#ffffff;
        padding-left: 25px;
        line-height: 24px;   
        display: inline-block;
    }
    .van-dropdown-menu >>> .van-dropdown-menu__title{
        /* color:red !important; */
        color:#ffffff !important;
        font-size:12px;
    }
    

    .van-dropdown-menu{
        background: #ffffff00 ;
        display: inline-block;
        position: absolute;
        width:100px;
        right:15px;
        height:30px;
        top: 3px;
    }
    /* .van-dropdown-menu > div > div{
        color: #ffffff;

    } */
    [class*=van-hairline]:after{
        border:none;
    }
    

    /* 话题区 */
    .content{
        width :75%;
        margin-left:12.5%;
        min-height:100px;
        /* background: grey; */
        font-size:0;
        /* display: table; */
    }
    .col div{
        display: inline-flex;
        width:100%;
        margin-top:7%;
        background:blue;
        border-radius:5px;
        vertical-align: top;
    }
    .col{
        vertical-align: top;
        width:47%;
        margin:1.5%;
        border-radius:5px;
        display: inline-block;
        min-height:100px;
        /* background: red; */
    }
    .item1{
        height: 280px;
    }
    .item2{
        height: 180px;
    }

    /* 搜索栏界面 */
    .SearchArea{
        font-size: 14px;
        margin-top:5px;
        color: white;
        padding-left: 10vw; 
    }
    .HotSearch{
        margin:5px auto 5px 0;
        width: 80vw;
        height:30vw;
        /* background: blue; */
    }
    .SearchLabel{
        line-height:20px;
        display: inline-block;
        border-radius: 14px;
        background-origin: border-box;
        background : linear-gradient(to left,rgba(255,255,255,0.2),rgba(255,255,255,0.2));
        box-sizing: border-box;
        padding: 3px 5px;
        font-size: 12px;
        margin-right: 6px;
        margin-top: 8px;
    }
    .SearchLabel span{
        display: block;
        margin: 0 8px;
    }
</style>