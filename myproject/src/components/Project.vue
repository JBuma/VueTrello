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
      <list v-for="item in items" :key='item.id'>
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
  import list from './ui/list.vue'
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
      console.log(this.id)
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
        try{
        var newItem = await itemServices.create(this.$route.params.projectId, this.newItem)
        console.log(newItem)
        
        this.items.push(newItem.data)
        } catch(err){
          alert(err)
        }
      },
      openModal(name) {
        this.$refs[name].openModal();
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
  /* TODO: Maken itemlist (internally) scrollable */
  #itemList {
    display: flex;
    flex-wrap:nowrap;
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

  .item-task {
    background-color: #EEE;
    padding: 5px;
    /* margin-bottom: 10px; */
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
    -webkit-transition: 0.2s ease-out;
    -moz-transition: 0.2s ease-out;
    transition: 0.2s ease-out;
    border: 3px solid #EEE;
  }

  .item-task:hover {
    position: relative;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    /* transform:translateY(-1px) */
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
