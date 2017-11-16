<template>
	<div id='projectView'>
		<h1>Hello i am project: {{info.name}}</h1>
		<p>My id is: {{id}}</p>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				id: this.$route.params.id,
				name:'',
				info: {}
			}
		},
		created(){
			console.log(this.id)
			this.$http.get('http://localhost:3000/projects/'+this.id)
		.then(function(data){
			console.log(data)
			this.info = data.body
		})
		}
	}
</script>