<template>
  <div id="app">
    <navHeader></navHeader>
    
    <h1>{{msg}}</h1>
    <projectItem></projectItem>
  </div>
</template>

<script>
  import navHeader from './components/header.vue'
  import projectItem from './components/projectItem.vue'
  
  export default {
    components: {
      'navHeader': navHeader,
      'projectItem': projectItem
    },
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style>
  
</style>
