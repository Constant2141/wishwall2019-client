<template>
  <div class="planet">
        <!-- loading -->
        <div class="loading" v-if="show">
                <van-loading size="24px" vertical>加载中...</van-loading>
        </div>


      <div class="background"></div>
      <div class="search">
              <input type="text" class="search-bar" placeholder="点击搜索" @focus="changePage(true)" v-model="searchText" @keypress="search($event)">
      </div>
      <div class="TopicArea" v-show="!showSearch" ref="Topic">
          <div class="message-bar">
            <!-- <div class="message">
                10条更新！
            </div> -->
            <div class="changeSort">
                    <van-dropdown-menu >
                        <van-dropdown-item v-model="value1" :options="option1" />
                    </van-dropdown-menu>
            </div>
        </div>
        <div class="sceoll-wrap">
        <van-pull-refresh
            v-model="isDownLoading"
            @refresh="onRefresh"
            ref="refreshWrap">
                <div class="content">
                    <div class="col" ref="col1">
                        <div 
                        :style="{backgroundImage: item.bgPic}"
                        v-for="(item,index) in topicLeft" 
                        :key="index" 
                        ref="colLeft"
                        @click="toTopic(item,$event)" >
                            <div  class="blur" ref="blurLeft"></div>
                            <!-- <div  class="pic" :style="{backgroundImage: 'url(' + item.bgPic + ')'}"></div> -->
                            <!-- <img :src="item.bgPic" alt=""> -->
                            <div class="TopicText" ref="titleLeft"># {{item.title}}</div>
                            <div class="heat">
                                <img src="../assets/hot.png" alt="" width="20" height="20">
                                <span ref="hotLeft">{{item.hot}}</span>
                            </div>
                        </div>
                    
                    </div>
                    <div class="col" ref="col2">
                        <div 
                        :style="{backgroundImage: item.bgPic}"
                        v-for="(item,index) in topicRight" 
                        :key="index" 
                        @click="toTopic(item,$event)" 
                        ref="colRight">
                            <div  class="blur" ref="blurRight"></div>
                            <!-- <img :src="item.bgPic" alt=""> -->
                            <div class="TopicText" ref="titleRight"># {{item.title}}</div>
                            <div class="heat">
                                <img src="../assets/hot.png" alt="" width="20" height="20">
                                <span ref="hotRight">{{item.hot}}</span>
                            </div>
                        </div>

                    </div>
                </div>
        </van-pull-refresh>
        </div>
        
      </div>
      
      <div class="SearchArea" v-show="showSearch" ref="Search" >
          <p>热门</p>
          <div class="HotSearch">
              <div class="SearchLabel" v-for="(item,index) in searchLabel" :key="index" @click="toTopic(item,$event)">
                <span># {{item.title}}</span>
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
            value1:"最新",
            page:1,
            option1: [
                { text: '最新', value: "最新" },
                { text: '最热', value: "最热" }
                
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
            topicRight:[],
            pic:"",

            isDownLoading:false,
            isBottom:false, //是否是页面最底端
            loadState: 0,//定义0是不加载(浏览)状态，1为正在加载，2全部数据加载完,3加载失败
            finished: false, //全部数据是否加载完
            readTips:false,
            searchText:"",


            show:true,
            

        }
    },
    methods:{
        onRefresh(){
            console.log("refresh")
                this.page = 1;
                setTimeout(async()=>{
                    await this.getData()
                    this.isDownLoading = false; 
                },500)
    
            
        },
        //判断滚动条是否在底部
        checkBottom(){
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;// 获取滚动条的高度
            const winHeight = document.documentElement.clientHeight || document.body.clientHeight; // 一屏的高度
            const scrollHeight = (()=>{
                let bodyScrollHeight = 0
                let documentScrollHeight = 0
                if (document.body) {
                bodyScrollHeight = document.body.scrollHeight
                }
                if (document.documentElement) {
                documentScrollHeight = document.documentElement.scrollHeight
                }
                // 当页面内容超出浏览器可视窗口大小时，Html的高度包含body高度+margin+padding+border所以html高度可能会大于body高度
                return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
            })()
            // console.log(scrollTop)
            // console.log(parseInt(scrollHeight)-winHeight)
            this.isBottom = scrollTop >=parseInt(scrollHeight)-winHeight-1;
        },
        
        onLoadList(){
        //滚动条是否到达底部
            this.checkBottom();
            // console.log(this.isBottom)
            if(this.isBottom){
                this.getData(true)
            }
            // if(this.isBottom && !this.finished){
            // this.loadState = 1;
            // setTimeout(async ()=>{
            //     let tempList = this.wishes;
            //     this.page++;
            //     let temp = await this.getData();
            //     this.wishes =  [...tempList,...temp];
            // },1500)
            // }
            // if(this.wishes.length == this.wishTotal){
            //     this.finished = true;
            //     this.loadState = 2;
            // } 
        },
        async search(event){//搜索功能
            console.log(event)
            if(event.keyCode == "13"){
                this.$axios.post("/star/search",{
                    title:this.searchText
                }).then(res=>{
                    this.topic = res.data.result;
                    // console.log(res);
                    this.topicLeft = [];
                    this.topicRight = [];
                    this.insertTopic(res.data.result);
                    this.showSearch = !this.showSearch;
                    console.log(this.topic)
                }).catch(err=>{
                    console.log("搜索失败")
                })
            }
        },
        toTopic(item,event){
            console.log(item)
            localStorage.setItem("planetUid",item.uuid)
            localStorage.setItem("planet",JSON.stringify(item))
            this.$router.push({
                name:"planetTopic",
            })
        },
        getData(load = false){
            if(!load){
                this.page = 1;
                this.show = true;//下拉加载不loading，刷新时loading
            }
            else this.page++;
            this.$axios.get(`/star/list?flag=${this.value1=="最热"?0:1}&curPage=${this.page}`).then(res=>{
                this.topic = res.data.result;
                if(!load){
                    this.topicLeft = [],this.topicRight = [];
                }
                // console.log(res);
                this.insertTopic(res.data.result);
                this.show = false;//加载完成
            }).catch(err=>{
                console.log(err)
            })
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
            // console.log(this.$refs.col1);
            this.showSearch = val;
        },
        insertTopic(allTopic){
            // console.log(this.topicLeft);
            if(allTopic){
                allTopic.map((item,index)=>{
                    if(item.bgPic){
                        item.bgPic = `url("http:/${item.bgPic.substring(13)}")` ;
                        // console.log(item.bgPic)
                    }
                    else{
                        item.bgPic = "linear-gradient(to bottom right,#ffd9d9,#FDFFC4)";
                    }
                    // console.log(item.bgPic)
                    if(index % 2 == 0){
                        this.topicLeft.push(item);
                    }
                    else{
                        this.topicRight.push(item);
                    }
                })
            }
            
            this.topicLeft.map((item,index)=>{
                this.$nextTick(()=>{
                    if(index % 2 == 0){
                        this.$refs.colLeft[index].classList.add("item2"); 
                    }
                    else{
                        this.$refs.colLeft[index].classList.add("item1");
                    }
                    console.log(this.$refs.colLeft[index].style.backgroundImage.slice(0,2))
                    if(this.$refs.colLeft[index].style.backgroundImage.slice(0,3) != "url"){//修改默认样式
                        this.$refs.blurLeft[index].style.background = "none";
                        this.$refs.titleLeft[index].style.color = "black";
                        this.$refs.hotLeft[index].style.color = "black";
                    }
                    else{
                        this.$refs.blurLeft[index].style.background = "#00000033";
                        this.$refs.titleLeft[index].style.color = "white";
                        this.$refs.hotLeft[index].style.color = "white";
                    }
                })
            })
            this.topicRight.map((item,index)=>{
                this.$nextTick(()=>{
                    if(index % 2 == 0){
                        this.$refs.colRight[index].classList.add("item1"); 
                    }
                    else{
                        this.$refs.colRight[index].classList.add("item2");
                    }
                    if(this.$refs.colRight[index].style.backgroundImage.slice(0,3) != "url"){//修改默认样式
                        this.$refs.blurRight[index].style.background = "none";
                        this.$refs.titleRight[index].style.color = "black";
                        this.$refs.hotRight[index].style.color = "black";
                    }
                    else{
                        this.$refs.blurRight[index].style.background = "#00000033";
                        this.$refs.titleRight[index].style.color = "white";
                        this.$refs.hotRight[index].style.color = "white";
                    }
                })
            })

            
        }
    },
    mounted(){
        this.getData();
        console.log(1212)
        window.addEventListener("scroll", this.onLoadList,false)
        this.$axios.get("/star/topChart").then(res=>{
            console.log(res)
            this.searchLabel = res.data.result;
            this.searchLabel.map(item=>{
                if(item.bgPic){
                        item.bgPic = "http:/" + item.bgPic.substring(13);
                        console.log(item.bgPic)
                } 
            })
        }).catch(err=>{
            console.log(err)
        })
    },
    beforeDestroy(){
        window.removeEventListener("scroll", this.onLoadList,false)
    },
    created(){
        
    },
    watch:{
        $route(to,from){
            if(from.path == "/planetTopic"){
                window.removeEventListener("scroll", this.onLoadList,false)
            }
            if(to.path == "/planet"){
                window.addEventListener("scroll", this.onLoadList,false)
            }
        },
        value1(val){
            this.getData();
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
        width:100vw;
        /* height: 90vh; */
        overflow: hidden;
        /* background:linear-gradient(to bottom right,#FD9CBF,#FFF8C9); */
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
    
    .background{
        width:100%;
        height:95vh;
        position: fixed;
        z-index:-100;
        background:#ffc4c4;
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
        overflow: scroll;
        /* background: grey; */
        font-size:0;
        /* display: table; */
    }
    .col > div{
        display: inline-flex;
        width:100%;
        margin-top:7%;
        /* background:linear-gradient(to bottom,#ffdb9c,#ff9797) ; */
        border-radius:5px;
        vertical-align: top;
        overflow: hidden;
        background-size:auto 100%;
        background-position:center;
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
        /* background:url("http://wishwall.1bin.top/public/upload//b2a6ec36-a1bb-456f-9f03-4b40ce1f81b2.png"); */
    }
    .item1,.item2{
        padding:14px;
        box-sizing: border-box;
        position: relative;
    }
    .blur{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #00000033;
        top: 0;
        left:0;
    }
    .TopicText{
        width: 100%;
        height:60px;
        font-size: 14px;
        color: white;
        position: relative;
        z-index: 5;
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
        z-index: 5;
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