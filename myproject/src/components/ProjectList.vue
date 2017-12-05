<template>
  <div>
    <banner>Your Projects</banner>
    <div class='project-list'>
		<card class='project-card' v-for="project in projects" :key='project.id'>
			<h3 @click='navTo("/"+project.authorId+"/projects/"+project.id)' slot='title' class='link'>{{project.name}}</h3>
			<p slot='description'>{{project.description}}</p>
			<p slot='meta'>Team: {{project.author}}</p>
		</card>
    </div>
  </div>
</template>
<script>
  import Banner from './Banner.vue'
	import Card from './ui/card.vue'
	import projectServices from '../services/projectServices'
  export default {
		methods:{
			navTo (route){
				this.$router.push(route);
			}
		},
    components: {
	  Banner,
	  Card
    },
    data() {
      return {
        projects: []
      }
	},
	async mounted(){
		try{
			const projects = await projectServices.index(this.$route.params.userId)
			console.log(projects)
			this.projects = projects.data.projectList;
			// console.log(this.projects)
			// console.log(this.projects.data.projectList)
		}catch(err){
			console.log(err)
		}
	}
  }

</script>
<style>
.project-list{
	width:90%;
	margin:0 auto;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	align-items:center;
	align-content:center;
	justify-content:center;
}
.card.project-card{
	transition:0.25s ease-out;
}
.card.project-card:hover{
	box-shadow: 0px 5px 25px 10px rgba(0, 0, 0, 0.2);
}
</style>
