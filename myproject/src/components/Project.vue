<template>
  <div id='projectView'>
    <banner>{{projectInfo.name}}
			<p slot='description'>{{projectInfo.description}}<br/>
			<em>Author: {{projectInfo.author}}</em>
			</p>
		</banner>
  </div>
</template>
<script>
	import projectServices from '../services/projectServices'
	import Banner from './Banner.vue'
  export default {
		components:{
			Banner
		},
    data() {
      return {
        id: this.$route.params.id,
        projectInfo: {},
        info: {},
        newItemName: ''
      }
    },
    async mounted() {
      try {
        const response = await projectServices.show(this.$route.params.userId, this.$route.params.projectId)
				// this.projectInfo = projectInfo
				console.log('Project info: ',response.data.projectInfo)
				this.projectInfo = response.data.projectInfo
      } catch (err) {
        console.log(err)
      }

    },
    methods: {
      addItem() {

      },
      plsHelp() {
        console.log(this.info.tasks[0])
      }
    }
  }

</script>
<style>
  #projectInfo {
    background-color: teal;
    color: white;
    padding: 20px;
  }

  #projectInfo h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  #taskList {
    display: flex;
  }

  .task {
    background-color: #eee;
    margin: 10px;
    padding: 10px;
    width: 200px;
    /* border-radius:5px; */
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2)
  }

  .task>h3 {
    margin: 0
  }

  .newItem {
    border: none;
    border-bottom: 1px solid #999;
  }

  .taskItem {
    background-color: white;
    padding: 5px;
    margin-bottom: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    -webkit-transition: 0.2s ease-out;
    -moz-transition: 0.2s ease-out;
    transition: 0.2s ease-out;
  }

  .taskItem:hover {
    position: relative;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    /* transform:translateY(-1px) */
  }

</style>
