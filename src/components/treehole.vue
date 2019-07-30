<template>
  <div class="tree-hole">
      {{msg}}
      <pre id="id">
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
          123
      </pre>
  </div>
</template>

<script>
export default {
  name: 'treehole',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#id{
    background-color: pink;
    height: 200px;
    overflow: scroll;
}
</style>
