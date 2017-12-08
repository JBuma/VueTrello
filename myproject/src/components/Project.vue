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
  #projectInfo {
    background-color: teal;
    color: white;
    padding: 20px;
  }

  #projectInfo h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
  /* TODO: Make itemlist (internally) scrollable */
  /* TODO: Make Lists as long as they are (no lengthening to neighbour length) */
  #itemList {
    display: flex;
    flex-wrap: nowrap;
  }

  #itemList .card .card-body {
    background-color: white;
    /* min-height:200px; */
  }

  .new-item {
    display: flex;
    flex-direction: column;
  }

</style>
