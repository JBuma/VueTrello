<template>
	<div>
		<modal name='task-modal' ref="task-modal" id='show-task'>
			<input type='text' slot="header" class='dark task editable name' v-model='task.name' @change='updateTask("name")'/>
			<div slot="body" class='modal-body'>
				<!-- Main view, contains description and comments by team members -->
				<div class="main">
					<div class="description">
						<!-- TODO: Maybe use markdown? Giving its' own editor with mini-modal -->
						<textarea class='task editable description' v-model="task.description" @change='updateTask("description")'></textarea>
					</div>
					<div class="comments">
						<h1>Comments</h1>
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
	</div>
</template>

<script>
import Modal from './modal.vue';
import taskServices from '../../services/taskServices.js';
export default {
	components: {
		Modal,
	},
	data() {
		return {
			task: {},
		};
	},
	methods: {
		open() {
			this.task = this.$store.state.task;
			this.$refs['task-modal'].openModal();
		},
		async updateTask(task) {
			this.$store.dispatch('setTask', this.task);
			try {
				await taskServices.update(this.$store.state.task);
			} catch (err) {
				alert(err);
			}
		},
	},
};
</script>

<style lang='scss'>
@import '~vars';
#show-task {
	.modal-content {
		min-width: 70vw;
		min-height: 70vh;
	}

	.modal-body {
		display: flex;
		flex-flow: row nowrap;

		.info {
			flex-grow: 1; // padding: $padding-medium;
			// background-color: teal;
			max-width: 175px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start; // align-items: center;
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
					height: 50px; // padding: 16px;
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

	input.editable {
		border: none;
	}
	textarea.editable {
		border: none;
		padding: $padding-small;
		resize: none;

		&.description {
			width: 100%;
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
