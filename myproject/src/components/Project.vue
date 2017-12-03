<template>
  <div id='projectView'>
    <div id='projectInfo'>
      <h1>{{info.name}}</h1>
      <p>Owner: {{info.author.username}}</p>
	  <button @click='plsHelp' >pls help</button>
    </div>
    <div id='taskList'>
      <div class='task' v-for="item in info.tasks">
        <h3>{{item.name}}</h3>
		<div class='taskItem' >
			<p>Lorem ipsum and some more shit here</p>
			<i>icon</i>
		</div>
		<div class='taskItem' >
			<p>Lorem ipsum and some more shit here</p>
		</div>
		<input class='newItem' type='text' placeholder='New Item...'/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        name: '',
		info: {},
		newItemName: ''
      }
    },
    created() {
      // console.log(currentUser)
      console.log(this.id)
      this.$http.get('http://localhost:3000/projects/' + this.id)
        .then(function (data) {
          console.log(data)
          this.info = data.body
        })
	},
	methods:{
		addItem(){

		},
		plsHelp(){
			console.log(this.info.tasks[0])
		}
	}
  }

</script>
<style>
	#projectInfo{
		background-color:teal;
		color:white;
		padding:20px;
	}
	#projectInfo h1{
		margin-top:0;
		margin-bottom:0;
	}
	#taskList{
		display:flex;
	}
	.task{
		background-color:#eee;
		margin:10px;
		padding:10px;
		width:200px;
		/* border-radius:5px; */
		box-shadow:0 5px 10px 0px rgba(0,0,0,0.2)
	}
	.task > h3{
		margin:0
	}
	.newItem{
		border:none;
		border-bottom:1px solid #999;
	}
	.taskItem{
		background-color:white;
		padding:5px;
		margin-bottom:10px;
		box-shadow:0 2px 10px rgba(0,0,0,0.1);
		-webkit-transition: 0.2s ease-out;
		-moz-transition: 0.2s ease-out;
		transition: 0.2s ease-out;
	}
	.taskItem:hover{
		position:relative;
		box-shadow:0 3px 15px rgba(0,0,0,0.2);
		/* transform:translateY(-1px) */
	}
</style>