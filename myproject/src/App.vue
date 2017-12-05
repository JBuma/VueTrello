<template>
  <div id="app">
    <navHeader></navHeader>
    <router-view></router-view>
  </div>
</template>

<script>
  import navHeader from './components/header.vue'
  import projectItem from './components/projectItem.vue'
  // import Hello from './components/Hello.vue'
  
  export default {
    components: {
      'navHeader': navHeader,
      // 'projectItem': projectItem,
      // 'Hello':Hello
    },
    name: 'app',
    data() {
      return {
      }
    }
  }
</script>

<style>
  body{
    margin:0;
    font-family: 'Raleway', sans-serif;
    /* background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    color:white; */
    background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  }
</style>
