<template>
	<div class='list'>
		<div class='list-title'>
			<slot name='title'></slot>
		</div>
		<div class='list-description'>
			<slot name='description'></slot>
		</div>
		<div class='list-body'>
			<div class='task' v-for="task in tasks" :key='task.id' v-bind:class="{'is-finished':task.isFinished}" @click='showTask(task.id)'>
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
	props: ['itemId', 'tasksNew'],
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
						{ ...this.newTask, UserId: this.$store.state.user.id },
					);
					this.tasks.push(task.data);
					this.newTask.name = '';
				}
			} catch (error) {
				console.log(error);
			}
		},
		async showTask(id) {
			let taskShow = {};
			this.tasks.forEach(task => {
				if (task.id === id) {
					taskShow = task;
					return;
				}
			});
			this.$emit('show-task', taskShow);
		},
		dragstart: function(ev) {
			console.log(ev);
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
			box-sizing: border-box;
			background-color: $color-background-light;
			box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
			padding: $padding-medium;
			margin: $padding-small;
			transition: box-shadow 0.1s linear;

			p {
				margin: 0;
				height: 1.2em;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&:hover {
				background-color: $color-background-darklight;
				cursor: pointer;
			}
			&:active {
				// border:1px solid $color-background-smokey;
				// border-bottom: 1px solid #eee;
				box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
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

	.editable {
		box-sizing: border-box;
		background-color: transparent;

		transition: 0.2s ease-out;

		&.name {
			font-size: $text-large;
			font-weight: bold;
		}

		&.dark {
			color: $text-alt;
		}

		&:hover {
			cursor: pointer;
		}

		&:focus {
			background-color: $color-background-smokey;

			border-radius: 5px;

			&.dark {
				color: $text-primary;
				background-color: white;
			}

			&:hover {
				cursor: auto;
			}
		}
	}
}
</style>
