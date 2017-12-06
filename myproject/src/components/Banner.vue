<template>
  <div class='banner'>
    <div class='banner-text'>
	  <h1><slot></slot></h1>
  <slot name='description'></slot>
  </div>
  <slot  name='controls'></slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: 'hello world!'
      }
    }
  }

</script>
<style>
  .banner {
    background-color: teal;
    color: white;
    padding: 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }

  .banner h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .banner-controls{
    
  }
  .banner-controls button{
    border-style:none;
    background-color:#018E4C;
    color:white;
    padding:1em 2em;
    font-family:'Raleway';
    font-size:1em;
    /* font-weight:bold; */
    letter-spacing:1px;
    border-radius:25px;
  }
</style>
