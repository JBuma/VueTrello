<template>
  <div class='card'>
	  <div class='card-title'><slot name='title'></slot></div>
    <div class='card-body'></div>
    <div class='card-description'>
      <slot name='description'></slot>
    </div>
    <div class='card-meta'>
      <slot name='meta'></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    }
  }

</script>
<style>
.card{
  background-color:white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  /* height:400px; */
  width:250px;
  margin:25px;
}
.card .card-body{
  height:200px;
  background-color:teal;
}
.card .card-description{
  padding:10px;
}
.card .card-title h3{
  background-color:#018E4C;
  color:white;
  padding:10px 10px;
  margin:0;
}
.card-title .link:hover{
  text-decoration:underline;
}
.card .card-meta{
  font-size:12px;
  font-style:italic;
  background-color:#fcfcfc;
  padding:1px 10px;
}

</style>
