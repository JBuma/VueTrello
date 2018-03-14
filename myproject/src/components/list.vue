<template>
	<div class='list'>
		<div class='list-title'>
			<slot name='title'></slot>
		</div>
		<div class='list-description'>
			<slot name='description'></slot>
		</div>
		<div class='list-body'>
			<div class='task' v-for="task in tasks" :key='task.id' v-bind:class="{'is-finished':task.isFinished}" @click='toggleFinished(task.id)'
			    v-bind:id="task.id">
				<p>{{task.name}}</p>
			</div>
		</div>
		<div class='new-task'>
			<input type='text' placeholder='New Task' v-model="newTask.name" @keyup.enter='createTask'>
		</div>
	</div>
</template>
<script>
import taskServices from '../services/taskServices';
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
				ItemId: this.itemId,
			},
			tasks: [],
		};
	},
	methods: {
		async createTask() {
			try {
				if (this.newTask.name !== '') {
					const task = await taskServices.create(
						this.$store.state.user.id,
						this.newTask,
					);
					console.log(task);
					this.tasks.push(task.data);
					this.newTask.name = '';
				}
			} catch (error) {
				console.log(error);
			}
		},
		async toggleFinished(id) {
			try {
				const task = await taskServices.show(this.itemId, id);
				console.table(task.data);
			} catch (error) {
				console.log(error);
			}
		},
	},
	async mounted() {
		try {
			const tasks = await taskServices.index(this.itemId);
			this.tasks = tasks.data.taskList;
		} catch (error) {
			console.log(error);
		}
	},
};
</script>
<style lang='scss'>
@import '~vars';
.list {
	background-color: $color-background-smokey;
	box-shadow: $box-shadow--large rgba(0, 0, 0, 0.2);
	width: 300px;
	margin: $padding-large;
	max-height: 100%;
	flex-shrink: 0;

	.list-title h3 {
		background-color: $color-primary;
		color: white;
		padding: $padding-medium;
		margin: 0;
	}

	.list-description {
		padding: $padding-medium;
		background-color: $color-primary-light;
		color: $text-alt;

		p {
			margin: 0;
		}
	}

	.list-body {
		max-height: 50vh;
		overflow-y: auto;

		.task {
			background-color: $color-background-light;
			box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
			padding: $padding-medium;
			margin: $padding-small;

			p {
				margin: 0;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&:hover {
				background-color: $color-background-smokey;
			}
		}
	}

	.list-meta {
		font-size: 12px;
		font-style: italic;
		background-color: #fcfcfc;
		padding: 1px 10px;
	}

	.new-task input {
		background-color: transparent;
		box-sizing: border-box;
		margin: 0;
		font-size: $text-default;
		width: 100%;
		padding: $padding-medium $padding-small;
		border-top: 2px solid $color-background-smokey;

		&:focus {
			border-bottom: 3px solid $color-primary-light;
		}
	}
}
</style>
