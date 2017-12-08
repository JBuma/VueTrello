<template>
  <div class='list'>
	  <div class='list-title'><slot name='title'></slot></div>
    <div class='list-description'>
      <slot name='description'></slot>
    </div>
	<div class='list-body'>
      <slot name='body'></slot>
    </div>
    <div class='list-meta'>
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
.list{
  background-color:white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  /* height:400px; */
  width:250px;
  margin:25px;
}
.list .list-body{
  /* height:200px; */
  background-color:teal;
}
.list .list-description{
  padding:10px;
}
.list .list-title h3{
  background-color:#018E4C;
  color:white;
  padding:10px 10px;
  margin:0;
}
.list-title .link:hover,
.list-title .link:focus
{
  text-decoration:underline;
}
.list .list-meta{
  font-size:12px;
  font-style:italic;
  background-color:#fcfcfc;
  padding:1px 10px;
}

</style>
