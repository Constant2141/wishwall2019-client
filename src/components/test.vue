<template>
  <div class="div1">
    <div class="div2">服务器正在加工。。。</div>
  </div>  
</template>

<script>
export default {
  name:'test',
  data(){
    return {

    }
  }
}
</script>

<style scoped>
.div1{
  width:100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
}
.div2{
  color:white;
}
</style>