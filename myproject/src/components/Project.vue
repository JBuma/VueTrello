<template>
	<section id='projectView'>
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
			<list v-for="item in items" :key='item.id' v-bind:item-id='item.id' @show-task='showTask'>
				<h3 slot='title'>{{item.name}}</h3>
				<!-- <div class='item-task' v-for="task in item.tasks" slot='body' :key='task.id'>
					{{task}}
				</div> -->
				<p slot='description'>{{item.description}}</p>
			</list>
		</div>
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
		<modal name='test' ref="show-task" id='show-task'>
			<h1 slot="header">{{currentItem.name}} 
			</h1>
			<div slot="body" class='modal-body'>
				<div class="main">
					<div class="description">
						<p>
							{{currentItem.description}}
						</p>
						<input type="text" name="task-name" id="task-name" v-model='currentItem.name' @change='updateTask("name")'>
					</div>
					<div class="comments">
						<div class="new-comment"></div>
						<div class="comment"></div>
						<div class="comment"></div>
						<div class="comment"></div>
					</div>

				</div>
				<div class="info">
					<h3>Categories</h3>
					<div class="categories">
						
						<div class="category purple"></div>
						<div class="category yellow"></div>
						<div class="category green"></div>
						<div class="category green"></div>
						<div class="category green"></div>
						<div class="category green"></div>
						<div class="category green"></div>
					</div>
					<h3>Members</h3>
					<div class="members">
						
						<div class="member">JB</div>
						<div class="member">UD</div>
						<div class="member">YM</div>
					</div>
					<h3>Due Date</h3>
					<div class="due-date">
						31 date at 12:00
					</div>
					<h3>Add</h3>
					<div class="actions">
						<ul>
							<li>
								<button>
									Member
								</button>
							</li>
							<li>
								<button>
									Category
								</button>
							</li>
							<li>
								<button>
									Checklist
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</modal>
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
			// console.log(response);
			this.projectInfo = response.data;
			console.log(this.projectInfo);

			const items = await itemServices.index(
				this.$route.params.projectId,
			);
			this.items = items.data.itemList;
		} catch (err) {
			console.log(err);
		}
	},
	methods: {
		async createItem() {
			try {
				var newItem = await itemServices.create(
					this.$route.params.projectId,
					this.newItem,
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
			this.currentItem = task;
			this.$refs['show-task'].openModal();
		},
		async updateTask(task) {
			try {
				await taskServices.post(this.currentItem);
			} catch (err) {
				alert(err);
			}
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

#show-task {
	.modal-content {
		min-width: 70vw;
		min-height: 70vh;
	}

	.modal-body {
		display: flex;
		flex-flow: row nowrap;

		.info {
			flex-grow: 1;
			// padding: $padding-medium;
			// background-color: teal;
			max-width: 175px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			// align-items: center;

			& > h3 {
				margin-top: $padding-huge;
			}

			& > .categories {
				display: flex;
				flex-flow: row wrap;

				.category {
					width: 50px;
					height: 25px;
					border-radius: 5px;
					margin: $padding-small;

					&.purple {
						background-color: purple;
					}
					&.yellow {
						background-color: yellow;
					}
					&.green {
						background-color: greenyellow;
					}
				}
			}

			& > .members {
				display: flex;
				flex-flow: row wrap;

				.member {
					width: 50px;
					height: 50px;
					// padding: 16px;
					background-color: grey;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			& > .actions {
				// text-align: center;
				display: flex;
				flex-flow: column nowrap;

				& > ul {
					list-style: none;
					padding: 0;
					margin: 0;
					display: flex;
					flex-flow: column nowrap;

					& > li {
						margin-bottom: $padding-small;
					}
				}
			}
		}
		.main {
			flex-grow: 3;
			padding-right: $padding-medium;
		}
	}

	button {
		font-size: 16px;
		padding: 8px;
		background-color: grey;
		border-radius: 0;
	}
}
</style>
