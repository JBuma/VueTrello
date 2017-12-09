<template>
  <div class='list'>
    <div class='list-title'>
      <slot name='title'></slot>
    </div>
    <div class='list-description'>
      <slot name='description'></slot>
    </div>
    <div class='list-body'>
      <div class='task' v-for="task in tasks" :key='task.id'>
        <p>{{task.name}}</p>
      </div>
    </div>
    <div class='new-task'>
      <input type='text' placeholder='New Task' v-model="newTask.name" @keyup.enter='createTask'>
    </div>
  </div>
</template>
<script>
  import taskServices from '../services/taskServices'
  export default {
    props: ['itemId'],
    data() {
      return {
        info: {},
        newTask: {
          name: '',
          authorId: this.$store.state.user.id,
          description: 'PLACEHOLDER',
          dueDate: 'PLACEHOLDER',
          isFinished: false,
          ItemId: this.itemId
        },
        tasks: []
      }
    },
    methods: {
      async createTask() {
        try {
          if (this.newTask.name !== '') {
            const task = await taskServices.create(this.$store.state.user.id, this.newTask)
            console.log(task)
            this.tasks.push(task.data)
            this.newTask.name = ''
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async mounted() {
      try {
        const tasks = await taskServices.index(this.itemId)
        this.tasks = tasks.data.taskList
      } catch (error) {
        console.log(error)
      }
    }
  }

</script>
<style>
  .list {
    background-color: white;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    width: 250px;
    margin: 25px;
    height:100%;
    flex-shrink:0;
    max-height:100%;
    /* overflow-y:auto; */
  }
  .list-body{
    max-height:30vh;
    overflow-y:auto;
  }
  .task {
    padding: 5px 10px;
  }
  .task:hover {
    background-color: #eee;
  }

  .list .list-description {
    padding: 10px;
    background-color:#FAFAFA;
  }
  .list .list-title h3 {
    background-color: #018E4C;
    color: white;
    padding: 10px 10px;
    margin: 0;
  }

  .list .list-meta {
    font-size: 12px;
    font-style: italic;
    background-color: #fcfcfc;
    padding: 1px 10px;
  }

  .new-task input {
    border-style: none;
    background: none;
    font-size: 16px;
    width: 96%;
    padding: 5px;
  }
  .new-task input:focus {
    border-bottom: 2px solid #018E4C;
  }
</style>
