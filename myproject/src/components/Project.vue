<template>
  <div id='projectView'>
    <modal name='new-item' ref='new-item'>
      <h1>New item</h1>
      <form nosubmit class='new-item'>
        <label>Item Name</label>
        <input type='text' v-model="newItem.name">
        <label>Item Description</label>
        <input type='text' v-model="newItem.description">
        <button @click='createItem' type='button'>Submit</button>
      </form>
    </modal>
    <banner>{{projectInfo.name}}
      <p slot='description'>{{projectInfo.description}}
        <br/>
        <em>Author: {{projectInfo.author}}</em>
      </p>
      <div class='banner-controls' slot='controls'>
        <button @click='openModal("new-item")'>New</button>
      </div>
    </banner>
    <div id='thing'>
      <div id='itemList'>
        <list v-for="item in items" :key='item.id' v-bind:item-id='item.id'>
          <h3 slot='title'>{{item.name}}</h3>
          <div class='item-task' v-for="task in item.tasks" slot='body' :key='task.id'>
            {{task}}
          </div>
          <p slot='description'>{{item.description}}</p>
        </list>
      </div>
    </div>
  </div>
</template>
<script>
  import projectServices from '../services/projectServices'
  import itemServices from '../services/itemServices'
  import list from './list.vue'
  import Banner from './Banner.vue'
  import Modal from './ui/modal.vue'
  export default {
    components: {
      Banner,
      list,
      Modal
    },
    data() {
      return {
        id: this.$route.params.projectId,
        projectInfo: {},
        info: {},
        newItemName: '',
        items: [],
        newItem: {
          name: '',
          description: '',
          ProjectId: this.$route.params.projectId,
          authorId: this.$store.state.user.id,
          dueDate: 'blah'
        }
      }
    },
    async mounted() {
      try {
        const response = await projectServices.show(this.$store.state.user.id, this.$route.params.projectId)
        // this.projectInfo = projectInfo
        this.projectInfo = response.data.projectInfo

        const items = await itemServices.index(this.$route.params.projectId)
        this.items = items.data.itemList
      } catch (err) {
        console.log(err)
      }
    },
    methods: {
      async createItem() {
        try {
          var newItem = await itemServices.create(this.$route.params.projectId, this.newItem)
          console.log(newItem)

          this.items.push(newItem.data)
        } catch (err) {
          console.log(err)
        }
      },
      openModal(name) {
        this.$refs[name].openModal()
      },
      closeModal(name) {
        this.$refs[name].closeModal()
      }
    }
  }

</script>
<style>
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    /* display:flex; */
  }

  #app {
    height: 100vh;
  }

  .banner {

    left: 0;
  }

  #projectInfo {
    background-color: teal;
    color: white;
    padding: 20px;
    /* height:100%; */
  }

  #projectInfo h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
  /* TODO: Make styles not terrible */

  #projectView {
    min-height: 85%;
    /* overflow-x:auto; */
  }
  #thing{
    height:78vh;
  }
  #itemList {
    min-height:100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
  }

  .new-item {
    display: flex;
    flex-direction: column;
  }

</style>
