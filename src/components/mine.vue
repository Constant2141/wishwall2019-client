<template>
  <div id="mine">
    <div class="myInfo">
      <div class="Profile-Photo"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.myInfo {
  width: 375px;
  height: 190px;
  background-image: linear-gradient(317deg, #fff8c9 0%, #fd9cbf 100%);
  border-bottom-left-radius: 100% 55%;
  padding-top: 0.1px
}
.Profile-Photo {
  width: 80px;
  height: 80px;
  border: solid 3px #ffffff;
  margin-top: 75px;
  margin-left: 29px;
  border-radius: 50%;
  background: url("../assets/Avatar/BoyAvatar.png");
  background-size: cover;
}
</style>
