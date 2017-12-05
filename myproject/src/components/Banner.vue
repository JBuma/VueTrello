<template>
  <div class='banner'>
	  <h1><slot>
		
	</slot></h1>
  <slot name='description'></slot>
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
  }

  .banner h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

</style>
