<template>
	<div class="side-menu-wrapper">
		<transition name='fade'>
			<div @click='toggleMenu' v-if="isOpen" class="menu-background"></div>
		</transition>
		<transition name='slide'>
			<nav v-if="isOpen" class='side-menu' :class='position'>
				<div class="header">
					<slot name='header'>
					</slot>
				</div>
				<div class="body">
					<slot name='body'>
					</slot>
				</div>
				<div class="footer">
					<slot name='footer'>

					</slot>
				</div>
			</nav>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false,
		};
	},
	props: {
		position: {
			type: String,
			required: true,
		},
	},
	methods: {
		toggleMenu() {
			this.isOpen = !this.isOpen;
		},
	},
};
</script>

<style lang='scss'>
@import '~vars';
.menu-background {
	opacity: 1;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 0;
}

.side-menu {
	height: 100vh;
	min-width: 200px;
	width: 20vw;
	background-color: $color-background-light;
	// color: white;
	max-width: 300px;
	z-index: 2;

	position: fixed;
	top: 0;
	&.right {
		right: 0;
	}
	&.left {
		left: 0;
	}
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
.slide-enter,
.slide-leave-active {
	transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active,
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
}
</style>
