<template>
	<div>
		<modal name='project-new' ref='project-new'>
			<h1 slot="header">New project</h1>
			<form nosubmit class='new-project' slot="body">
				<label>Project Name</label>
				<input type='text' v-model="newProject.name">
				<label>Project Description</label>
				<input type='text' v-model="newProject.description">
				<button @click='createProject' type='button'>Submit</button>
			</form>
		</modal>

		<banner>Your Projects
			<div class='banner-controls' slot='controls'>
				<button @click='openModal("project-new")'>New</button>
				<button>Select</button>
			</div>
			<p slot='description'>Hello i am test</p>
		</banner>
		<div class='project-list'>
			<card class='project-card' v-for="project in projects" :key='project.id'>
				<h3 @click='navTo("/projects/"+project.id)' slot='title' class='link'>{{project.name}}</h3>
				<p slot='description'>{{project.description}}</p>
				<p slot='meta'>Team: {{project.author}}</p>
			</card>
		</div>
	</div>
</template>
<script>
import Banner from './Banner.vue';
import Card from './ui/card.vue';
import projectServices from '../services/projectServices';
import Modal from './ui/modal.vue';
export default {
	methods: {
		navTo(route) {
			this.$router.push(route);
		},
		openModal(name) {
			this.$refs[name].openModal();
		},
		async createProject() {
			try {
				var newProject = await projectServices.create(
					this.$store.state.user.id,
					{ ...this.newProject, UserId: this.$store.state.user.id },
				);
				console.log(newProject);
				this.$router.push('/projects/' + newProject.data.id);
			} catch (err) {
				console.log(err);
			}
		},
	},
	components: {
		Banner,
		Card,
		Modal,
	},
	data() {
		return {
			projects: [],
			newProject: {
				name: '',
				description: '',
				authorId: this.$store.state.user.id,
				content: 'PLACEHOLDER',
			},
		};
	},
	async mounted() {
		try {
			const projects = await projectServices.index(
				this.$store.state.user.id,
			);
			this.projects = projects.data.projectList;
		} catch (err) {
			console.log(err);
		}
	},
};
</script>
<style lang='scss'>
@import '~vars';
.project-list {
	padding: $padding-huge;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 300px));
	grid-gap: 10px;
}

.card.project-card {
	transition: 0.25s ease-out;

	&:hover {
		transition: 0.15s 0.05s ease-out;
		box-shadow: 0px 5px 25px 10px rgba(0, 0, 0, 0.2);
		transform: translateY(-5px);
	}
}

.new-project {
	display: flex;
	flex-direction: column;
}
</style>
