<template>
  <div>
    <modal name='test' ref='test'>
      <h1>New project</h1>
      <form nosubmit class='new-project'>
        <label>Project Name</label>
        <input type='text' v-model="newProject.name">
        <label>Project Description</label>
        <input type='text' v-model="newProject.description">
        <button @click='createProject' type='button'>Submit</button>
      </form>
    </modal>
    <banner>Your Projects
      <div class='banner-controls' slot='controls'>
        <button @click='openModal("test")'>New</button>
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
  import Banner from './Banner.vue'
  import Card from './ui/card.vue'
  import projectServices from '../services/projectServices'
  import Modal from './ui/modal.vue'
  export default {
    methods: {
      navTo(route) {
        this.$router.push(route);
      },
      createNew(info) {
        alert('clicked');
      },
      openModal(name) {
        this.$refs[name].openModal();
      },
      async createProject() {
        try {
          var newProject = await projectServices.create(this.$store.state.user.id, this.newProject)
          console.log(newProject);
          this.$router.push('/projects/' + newProject.data.id)
        } catch (err) {
          console.log(err)
        }
      }
    },
    components: {
      Banner,
      Card,
      Modal
    },
    data() {
      return {
        projects: [],
        newProject: {
          name: '',
          description: '',
          authorId: this.$store.state.user.id,
          content: 'PLACEHOLDER'
        }
      }
    },
    async mounted() {
      try {
        const projects = await projectServices.index(this.$store.state.user.id)
        // console.log(projects)
        this.projects = projects.data.projectList;
        // console.log(this.projects)
        // console.log(this.projects.data.projectList)
      } catch (err) {
        console.log(err)
      }
    }
  }

</script>
<style>
  .project-list {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 20%);
		grid-gap:10px;
  }

  .project-list .card {
    margin: 20px auto;
  }

  .card.project-card {
    transition: 0.25s ease-out;
  }

  .card.project-card:hover {
		transition:0.15s 0.05s ease-out;
    box-shadow: 0px 5px 25px 10px rgba(0, 0, 0, 0.2);
		transform:translateY(-5px)
  }

  .new-project {
    display: flex;
    flex-direction: column;
  }
	@media screen and (max-width:2500px) {
    .project-list {
      grid-template-columns: repeat(6, 16.6%)
    }
  }
	@media screen and (max-width:2000px) {
    .project-list {
      grid-template-columns: repeat(5, 20%)
    }
  }

  @media screen and (max-width:1700px) {
    .project-list {
      grid-template-columns: repeat(4, 25%)
    }
  }

  @media screen and (max-width:1200px) {
    .project-list {
      grid-template-columns: repeat(3, 33%)
    }
  }

  @media screen and (max-width:900px) {
    .project-list {
      grid-template-columns: repeat(2, 50%)
    }
  }
	@media screen and (max-width:570px){
.project-list {
		grid-template-columns:repeat(1, 100%)
  }
	}

</style>
