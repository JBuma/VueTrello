<template>
	<div>
		<modal name='task-modal' ref="task-modal" id='show-task'>
			<div slot="header" class="editable-wrapper dark task text">
				<input type='text' class=' editable name' v-model='task.name' @change='updateTask("name")' />
			</div>
			<div slot="body" class='modal-body'>
				<!-- Main view, contains description and comments by team members -->
				<div class="main">
					<div class="description">
						<!-- TODO: Maybe use markdown? Giving its' own editor with mini-modal -->
						<div class="editable-wrapper task editable  area">
							<textarea class='description' v-model="task.description" @change='updateTask("description")' oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
							<small>Edit</small>
						</div>
					</div>
					<div class="comments">
						<h1>Comments</h1>
						<div class="new-comment">
							<div class="editable-wrapper task editable  area">
								<textarea class='description' v-model='newComment.comment' oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
								<button class='green' @click='postComment()'>Save</button>
							</div>
						</div>
						<div v-for="comment in this.comments" :key="comment.id" class="comment">
							<h3>{{comment.authorId}}</h3>
							<p>{{comment.comment}}</p>
						</div>
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
							<!-- TODO: Get confirmation for deletion,Popup or undo message????? -->
							<li>
								<button class='red' @click='deleteTask'>
									Delete
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
import commentServices from '../../services/commentServices.js';
export default {
	components: {
		Modal,
	},
	data() {
		return {
			task: {},
			comments: [],
			newComment: {
				TaskId: '',
				comment: '',
				authorId: this.$store.state.user.id,
			},
		};
	},
	methods: {
		async open() {
			try {
				this.task = {
					...this.$store.state.task,
				};
				this.newComment.TaskId = this.task.id;
				const comments = await commentServices
					.index(this.task.id)
					.then(comments => {
						this.comments = comments.data.commentList;
					});
				this.$refs['task-modal'].openModal();
			} catch (err) {
				alert(err);
			}
		},
		async updateTask(task) {
			this.$store.dispatch('setTask', this.task);
			try {
				await taskServices.update(this.$store.state.task);
			} catch (err) {
				alert(err);
			}
		},
		async deleteTask() {
			try {
				const message = await taskServices
					.delete(this.task)
					.then(message => {
						console.log(message);
					});
			} catch (err) {
				alert(err);
			}
		},
		async postComment() {
			try {
				console.log('posting...');
				if (this.newComment.comment !== '') {
					console.log('posting...');
					const response = await commentServices
						.create(this.task.id, this.newComment)
						.then(response => {
							this.comments.push(response.data);
							console.log(response);
						});
				}
			} catch (err) {
				console.log(err);
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
		min-height: 90vh; // width: 50%;
		max-width: 400px;
	}

	.modal-body {
		display: flex;
		flex-flow: row nowrap;
		padding: 0;
		max-height: 100%;

		.info {
			flex-grow: 1;
			max-width: 300px;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			overflow-y: auto;
			padding: $padding-small;
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
			padding: $padding-small;
			overflow-y: auto;
			height: 99%;
			max-height: 100%;
		}
	}

	button {
		font-size: 16px;
		padding: 8px; // background-color: grey;
		border-radius: 0;
	}

	.editable-wrapper {
		position: relative; // display: inline-block;
		& > input,
		& > textarea {
			border: none;
			box-sizing: border-box;
			background-color: transparent;
			border-radius: 5px;

			transition: 0.2s ease-out;
			margin: 0;

			&.name {
				font-size: $text-large;
				font-weight: bold;
			}
			&.description {
				width: 100%;
				min-height: 100px; // &:focus {
				// 	width: 100%;
				// }
			}

			&:hover {
				cursor: pointer;
			}
		}
		& > textarea {
			border: none;
			padding: $padding-small;
			resize: none;
		}

		&.dark > input,
		&.dark > textarea {
			color: $text-alt;

			&:focus {
				color: $text-primary;
				background-color: white;
			}
		}
		& > input:focus,
		& > textarea:focus {
			background-color: $color-background-smokey;

			&:hover {
				cursor: auto;
			}
		}

		&:after {
			font-family: 'Font Awesome 5 Free';
			content: '\f044';
			position: absolute;
			top: 0;
			right: 0;
			z-index: 0;
			opacity: 0.8;
		}
		&.text:after {
			top: 25%;
		}
	}
}
</style>
