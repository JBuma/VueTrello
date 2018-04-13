<template>
	<section id='projectView'>
		<!--Banner with some project info
			TODO: Add The author/Team | Editing info -->
		<banner>
			{{projectInfo.name}}
			<p slot='description'>{{projectInfo.description}}
				<br/>
				<em>Author: {{projectInfo.author}}</em>
			</p>
			<div class='banner-controls' slot='controls'>
				<button @click='openModal("new-item")'>New</button>
			</div>
		</banner>
		<!-- All the items in the project, every item is in a list which will fetch it's own tasks when mounted -->
		<div id='itemList'>
			<list v-for="item in items" :key='item.id' v-bind:item-id='item.id' @show-task='showTask'>
				<h3 slot='title'>{{item.name}}</h3>
				<p slot='description'>{{item.description}}</p>
			</list>
		</div>
		<!-- Modal with the form to create a new item, only needs a name and a description -->
		<modal name='new-item' ref='new-item'>
			<h1 slot="header" >New item</h1>
			<form nosubmit class='new-item modal-body' slot="body" >
				<label for="new-item--name" >Item Name</label>
				<input type='text' id='new-item--name' v-model="newItem.name">
				<label for='new-item--descr'>Item Description</label>
				<input type='text' id='new-item--descr' v-model="newItem.description">
				<button @click='createItem' type='button'>Submit</button>
			</form>
			<div slot="footer" class='modal empty' ></div>
		</modal>
		<!-- TODO: Actually get the data from the database, this is still all hardcoded -->
		<!-- Show The currently selected task, currently only show the name and description -->
		<!-- TODO: Make into its own component -->
		<!-- TODO: Put the currentitem in vuex state -->
		<show-task ref='show-task' />
	</section>

</template>
<script>
import projectServices from '../services/projectServices';
import itemServices from '../services/itemServices';
import list from './list.vue';
import Banner from './Banner.vue';
import Modal from './ui/modal.vue';
import showTask from './ui/showTask.vue';
import taskServices from '../services/taskServices';
export default {
	components: {
		Banner,
		list,
		Modal,
		showTask,
	},
	data() {
		return {
			id: this.$route.params.projectId,
			projectInfo: {},
			// newItemName: '',
			items: [],
			newItem: {
				name: '',
				description: '',
				ProjectId: this.$route.params.projectId,
				authorId: this.$store.state.user.id,
				dueDate: 'blah',
			},
			currentItem: {},
		};
	},
	async mounted() {
		try {
			const response = await projectServices.show(
				this.$store.state.user.id,
				this.$route.params.projectId,
			);
			this.projectInfo = response.data;

			const items = await itemServices.index(
				this.$route.params.projectId,
			);
			this.items = items.data.itemList;
		} catch (err) {
			console.log(err);
			alert(err, 'More info in console');
		}
	},
	methods: {
		async createItem() {
			try {
				var newItem = await itemServices.create(
					this.$route.params.projectId,
					{ ...this.newItem, UserId: this.$store.state.user.id },
				);
				this.items.push(newItem.data);
			} catch (err) {
				console.log(err);
			}
		},
		openModal(name) {
			this.$refs[name].openModal();
		},
		closeModal(name) {
			this.$refs[name].closeModal();
		},
		showTask(task) {
			this.$store.dispatch('setTask', task);
			this.$refs['show-task'].open();
		},
	},
	computed: {},
};
</script>
<style lang='scss'>
@import '~vars';
#projectView {
	display: grid;
	grid-template-rows: minmax(50px, 150px) 1fr; // grid-template-columns: 1fr;
}

#itemList {
	max-width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: left;
	align-items: flex-start;
	overflow-x: auto;
}

form.new-item {
	display: flex;
	flex-flow: column nowrap;
}
</style>
