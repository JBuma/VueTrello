<template>
	<transition name="modal-fade" >
		<div v-if="!closed" :class='position' class='modal modal-back'>
			<div class='modal-content'>
				<header class="modal-header">
					<slot name="header">
						<h1>Default Modal</h1>
					</slot>
					<button class='modal-close cross' @click="closeModal">X</button>
				</header>
					<slot name="body">
						<p>Default Body</p>
					</slot>
				<footer class="modal-footer">
					<slot name="footer">
						<p>Default Footer</p>
						<button class='modal-close' @click="closeModal">Close</button>
					</slot>
				</footer>
			</div>
		</div>
	</transition>
</template>
<script>
export default {
	props: ['name'],
	data() {
		return {
			position: 'center',
			closed: true,
			// name:''
		};
	},
	methods: {
		closeModal(e) {
			e.stopPropagation();
			this.closed = true;
		},
		openModal() {
			this.closed = false;
		},
	},
};
</script>
<style lang='scss'>
@import '~vars';
.modal {
	&.empty {
		padding: 0;
		margin: 0;
	}

	&.modal-back {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
		height: 100vh;
		width: 100vw;
	}

	.modal-content {
		display: grid;
		grid-template-rows: minmax(0px, 50px) 1fr minmax(0px, 50px);
		background-color: $color-background-light;
		min-height: 50vh;
		min-width: 50vw;
		max-height: 100vh;
		max-width: 100vw;
		color: $text-primary;

		.modal-header,
		.modal-footer {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			color: $text-alt;

			h1,
			h2,
			h3,
			h4,
			h5,
			h6,
			p {
				margin: 0;
			}
		}
		& > .modal-header {
			background-color: $color-primary;
			padding: $padding-medium;
		}
		& > .modal-body {
			padding: $padding-medium;
		}
		& > .modal-footer {
			background-color: $color-primary-light;
			padding: $padding-small;
		}
	}

	.modal-close {
		padding: $padding-medium;
		line-height: 1em;

		&:hover {
			cursor: pointer;
		}

		&.cross {
			background-color: transparent;
			font-weight: 700;
			color: $text-alt;
			box-shadow: none;
		}
	}
}
.modal-fade-enter,
.modal-fade-leave-active {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.3s ease;
}
</style>
