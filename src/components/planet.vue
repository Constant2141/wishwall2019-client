<template>
  <div class="planet">
      <div class="background"></div>
      <div class="search">
          <input type="text" class="search-bar" placeholder="点击搜索" @focus="changePage(true)">
      </div>
      <div class="TopicArea" v-show="!showSearch" ref="Topic">
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
            <div class="col" ref="col1">
                <div class="item2" @click="toTopic" v-for="(item,index) in topicLeft" :key="index">
                    <div class="TopicText">{{item.title}}</div>
                    <div class="heat">
                        <img src="../assets/hot.png" alt="" width="20" height="20">
                        <span>{{item.hot}}</span>
                    </div>
                </div>
               
            </div>
            <div class="col" ref="col2">
                <div class="item2"  @click="toTopic" v-for="(item,index) in topicRight" :key="index">
                    <div class="TopicText">{{item.title}}</div>
                    <div class="heat">
                        <img src="../assets/hot.png" alt="" width="20" height="20">
                        <span>{{item.hot}}</span>
                    </div>
                </div>

            </div>
        </div>
      </div>
      
      <div class="SearchArea" v-show="showSearch" ref="Search">
          <p>热门</p>
          <div class="HotSearch">
              <div class="SearchLabel" v-for="(item,index) in searchLabel" :key="index">
                <span>{{item}}</span>
              </div>
          </div>
        <div class="cancelSearch" @click="changePage(false)"></div>
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

            showSearch:false,//是否显示搜索区域
            searchLabel:[
                "#海底捞最喜欢什么火锅底料",
                "#我想要不知火",
                "#云顶之弈全新版本",
                "#庆义肾透支真相",
                "艹骏为何如此之骚"
            ],

            
            testTopic:{//仅测试用
                    topicName:"今天吃什么呀，不如酸菜魚",
                    hot:233
            },
            topic:[],
            topicLeft:[
            ],
            topicRight:[]
        }
    },
    methods:{
        search(){//搜索功能

        },
        toTopic(){
            this.$router.push("/planetTopic")
        },
        changePage(val){
            // if(val){
            //     this.$refs.Topic.style.opacity = 0;
            //     this.$refs.Search.style.opacity = 1;
            // }
            // else{
            //     this.$refs.Topic.style.opacity = 1;
            //     this.$refs.Search.style.opacity = 0;
            // }
            // setTimeout(e=>{
                 
            // },500)
            this.showSearch = val;
            console.log(1);
        },
        insertTopic(allTopic){
            if(allTopic){
                allTopic.map((item,index)=>{
                    if(index % 2 == 0){
                        this.topicLeft.push(item);
                    }
                    else{
                        this.topicRight.push(item);
                    }
                })

            }
        }
    },
    mounted(){
        this.$axios.get("/star/list").then(res=>{
            this.topic = res.data.result;
            console.log(this.topic);
            this.insertTopic(res.data.result);
        }).catch(err=>{
            console.log(err)
        })
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
    .TopicArea{
        opacity: 1;
         transition: opacity 1s;
         overflow: hidden;
    }
    .content{
        width :75%;
        margin-left:12.5%;
        min-height:100px;
        /* background: grey; */
        font-size:0;
        /* display: table; */
    }
    .col > div{
        display: inline-flex;
        width:100%;
        margin-top:7%;
        background:rgb(141, 219, 202);
        border-radius:5px;
        vertical-align: top;
    }
    .col{
        vertical-align: top;
        width:47%;
        margin:1.5%;
        border-radius:5px;
        display: inline-block;
        padding-bottom:80px;
        min-height:100px;
        /* background: red; */
    }
    .item1{
        height: 280px;
    }
    .item2{
        height: 180px;
    }
    .item1,.item2{
        padding:14px;
        box-sizing: border-box;
        position: relative;
    }
    .TopicText{
        width: 100%;
        height:60px;
        font-size: 14px;
        color: white;
    }
    .heat{
        /* background: url(../assets/hot.png) no-repeat; */
        /* width: 100%; */
        position: absolute;
        height: 30px;
        bottom:10px;
        right:20px;
        font-size: 14px;
        color: white;
    }
    .heat span{
        display: inline-block;
    }
    .heat img{
        vertical-align: bottom;
    }

    /* 搜索栏界面 */
    .SearchArea{
        font-size: 14px;
        margin-top:5px;
        color: white;
        padding-left: 8vw; 
        position: relative;
        /* opacity: 0;
        transition: opacity 1s;
        overflow: hidden; */
    }
    .HotSearch{
        margin:5px auto 5px 0;
        width: 84vw;
        height:30vw;
        /* background: blue; */
    }
    .SearchLabel{
        line-height:18px;
        display: inline-block;
        border-radius: 14px;
        background-origin: border-box;
        background : linear-gradient(to left,rgba(255,255,255,0.2),rgba(255,255,255,0.2));
        box-sizing: border-box;
        padding: 3px 5px;
        font-size: 11px;
        margin-right: 6px;
        margin-top: 8px;
    }
    .SearchLabel span{
        display: block;
        margin: 0 8px;
    }
    .cancelSearch{
        height: 65vh;
        width:100vw;
        position: relative;
        left: -8vw;
    }
</style>