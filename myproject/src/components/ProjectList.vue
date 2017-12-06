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
          var newProject = await projectServices.create(this.$route.params.userId, this.newProject)
          console.log(newProject);
          this.$router.push('/1/projects/' + newProject.data.id)
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
          userId: 1,
          content: 'PLACEHOLDER'
        }
      }
    },
    async mounted() {
      try {
        const projects = await projectServices.index(this.$route.params.userId)
        console.log(projects)
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
  }

  .card.project-card {
    transition: 0.25s ease-out;
  }

  .card.project-card:hover {
    box-shadow: 0px 5px 25px 10px rgba(0, 0, 0, 0.2);
  }

  .new-project {
    display: flex;
    flex-direction: column;
  }

</style>
