<template>
	<section id='projectView'>
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
	</section>
</template>
<script>
import projectServices from '../services/projectServices';
import itemServices from '../services/itemServices';
import list from './list.vue';
import Banner from './Banner.vue';
import Modal from './ui/modal.vue';
export default {
	components: {
		Banner,
		list,
		Modal,
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
				dueDate: 'blah',
			},
			listHeight: 0,
		};
	},
	async mounted() {
		try {
			const response = await projectServices.show(
				this.$store.state.user.id,
				this.$route.params.projectId,
			);
			this.projectInfo = response.data.projectInfo;

			const items = await itemServices.index(
				this.$route.params.projectId,
			);
			this.items = items.data.itemList;
		} catch (err) {
			console.log(err);
		}

		this.listStyle();
		console.log(this.listHeight);
	},
	methods: {
		async createItem() {
			try {
				var newItem = await itemServices.create(
					this.$route.params.projectId,
					this.newItem,
				);
				console.log(newItem);

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
		listStyle() {
			let bannerHeight = document.querySelector('div.banner')
				.clientHeight;
			console.log(bannerHeight);
			let headerHeight = document.getElementById('navHeader')
				.clientHeight;
			console.log(headerHeight);
			let windowHeight = document.scrollingElement.clientHeight;
			this.listHeight = `height:${windowHeight -
				bannerHeight -
				headerHeight}px;`;
		},
	},
	computed: {},
};
</script>
<style lang='scss'>
@import '~vars';
/* TODO: Make styles not terrible */
#projectView {
	display: grid;
	grid-template-rows: minmax(50px, 150px) 1fr;
	// grid-template-columns: 1fr;
}
#itemList {
	max-width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: left;
	align-items: flex-start;
	overflow-x: auto;
}
</style>
