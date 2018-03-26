<template>
	<modal name='test' ref="show-task" class='show-task'>
		<h1 slot="header">{{task.name}} <input type="text" name="task-name" id="task-name" :value='task.name'>
		</h1>
		<div slot="body" class='modal-body'>
			<div class="main">
				<div class="description">
					<p>
						{{task.description}}
					</p>
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
</template>

<script>
import Modal from '../ui/modal.vue';
export default {
	components: {
		Modal,
	},
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	methods: {
		open() {
			console.log(this.task);
			this.$refs['show-task'].openModal();
		},
	},
};
</script>

<style lang='scss'>
@import '~vars';
.show-task {
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
