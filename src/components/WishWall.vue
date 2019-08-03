<template>
  <div class="wish-wall">
    <div class="header">
      <p>许愿墙</p>
      <ul>
        <li>全部</li>
        <li>大学城</li>
        <li>龙洞</li>
        <li>东风路</li>
      </ul> 
    </div>
    <div class="banner">
      <swiper :options="swiperOption">
        <swiper-slide><img src="../assets/banner/wishwall.jpg" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/banner/reverse.jpg" alt=""></swiper-slide>
        <swiper-slide><img src="../assets/banner/wishwall.jpg" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    
    <div class="wish">

    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      swiperOption:{
        autoplay:3000,
        speed:1000,
        loop:true,
        pagination:'.swiper-pagination'
      }
    }
  },
  methods:{
   
  },
  mounted(){
   
   
    }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
.header{
  position: relative;
  height:30vh;
  width:100vw;
  background:linear-gradient(#fd9cbf,#fff8c9);
  border-radius: 0 0 28px 28px;
}
.header p{
  font-size: 1.125rem;
  position: relative;
  top:2vh;
  color: #fff;
  text-align: center;
}
ul{
  position: relative;
  display: flex;
  color: #fff;
  justify-content: space-around;
  top: 6vh;
}
li{
  list-style-type: none;
}
.banner{
  position:absolute;
  width:86vw;
  height:20vh;
  border-radius:10px;
  top:16vh;
  left:0;
  right: 0;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 4px 10px #e1e1e1;
}
.banner img{
  width: 100%;
}
.banner >>> .swiper-pagination-bullet-active{
  background: #ffffff
  }

</style>
